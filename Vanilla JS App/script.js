const clientId = "8f51b06e6e7e44f7b9f57c3536c9d9e4";
const scopes = "user-read-private user-read-email";
const clientSecret = "359ae78ffc444527bd123fdc36d1dbf3";
const environment = "production";
const redirectUri =
  environment === "development"
    ? "http://127.0.0.1:5500/index.html"
    : "https://soundscape-86ox.onrender.com";
const titleIcon = document.getElementById("icon-header");

// (START) LOGIN TO APP (PROVIDED ON SPOTIFY DEVELOPER)
const loginButton = () => {
  const state = generateRandomString(16);
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(
    scopes
  )}&state=${encodeURIComponent(state)}`;

  window.location.href = authUrl;
};
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// ABOUT-BUTTON
const showAbout = () => {
  const contentDiv = document.getElementById("content");
  contentDiv.replaceChildren();
  const aboutDiv = document.getElementById("about-sec");
  aboutDiv.style.display = "inline";

  const header = document.getElementById("title-header");
  header.innerText = "";

  const search = document.getElementById("search-btn");
  search.value = "";
};
//ABOUT & START CLICK EVENT
document.getElementById("about-btn").addEventListener("click", showAbout);
document.getElementById("login-app").addEventListener("click", loginButton);

window.addEventListener("load", async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get("code");
  const access_token = localStorage.getItem("access_token");

  if (access_token) {
    fetchPlaylists();
  } else if (code) {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        fetchPlaylists();
      }
    } catch (error) {
      console.error("Error fetching the access token:", error);
    }
  } else {
    showAbout();
  }
});

//SEARCH-BTN KEYDOWN EVENT(ENTER)
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const query = searchBtn.value;
    const token = localStorage.getItem("access_token");
    if (token) {
      searchSpotify(query, token);
    } else {
      console.log("User is not authenticated.");
    }
  }
});

async function searchSpotify(query, token) {
  const endpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    query
  )}&type=track`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    displayResults(data, query);
  } catch (error) {
    console.error("Error searching Spotify:", error);
  }
}

function displayResults(data, search) {
  const resultsDiv = document.getElementById("content");
  const header = document.getElementById("title-header");
  header.innerText = search;
  if (data.tracks) {
    resultsDiv.replaceChildren();
    data.tracks.items.forEach((track) => {
      const searchSong = document.createElement("div");
      searchSong.className = "search-song";

      const img = document.createElement("img");
      img.src = track.album.images[0].url;
      img.alt = track.album.name;

      const playButton = document.createElement("button");
      playButton.innerText = "▶";

      const title = document.createElement("h3");
      title.textContent = track.name;

      const artist = document.createElement("h5");
      artist.textContent = track.artists[0].name;

      searchSong.appendChild(img);
      searchSong.appendChild(playButton);
      searchSong.appendChild(title);
      searchSong.appendChild(artist);
      resultsDiv.appendChild(searchSong);

      searchSong.addEventListener("click", function () {
        window.open(`${track.external_urls.spotify}`, "_blank");
      });
    });
  }
}

async function fetchPlaylists() {
  const endpoint = "https://api.spotify.com/v1/browse/featured-playlists";
  const playlistsContainer = document.getElementById("content");
  const loadingIndicator = document.getElementById("loading");
  const feedbackContainer = document.getElementById("feedback");
  const accessToken = localStorage.getItem("access_token");

  playlistsContainer.innerHTML = "";
  loadingIndicator.style.display = "block";
  feedbackContainer.innerHTML = "";

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.replace(location.pathname);
    }
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    displayPlaylists(data);
    const aboutApp = document.getElementById("about-sec");
    aboutApp.style.display = "none";
    // console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    feedbackContainer.innerText = "An error occurred while fetching playlists.";
  } finally {
    loadingIndicator.style.display = "none";
  }
}

titleIcon.addEventListener("click", function () {
  const search = document.getElementById("search-btn");
  search.value = "";
  const titleHeader = document.getElementById("title-header");
  titleHeader.innerText = "";

  fetchPlaylists();
});

function displayPlaylists(data) {
  const playlistsContainer = document.getElementById("content");
  const titleHeader = document.getElementById("title-header");
  titleHeader.innerText = data.message;

  if (data && data.playlists.items.length > 0) {
    data.playlists.items.forEach((playlist) => {
      const featuredPlaylist = document.createElement("div");
      featuredPlaylist.className = "featured-playlist";

      const img = document.createElement("img");
      img.src = playlist.images[0].url;
      img.alt = playlist.name;

      const playButton = document.createElement("button");
      playButton.innerText = "▶";

      const title = document.createElement("h3");
      title.innerText = playlist.name;

      const description = document.createElement("p");
      description.innerText =
        playlist.description || "No description available";

      featuredPlaylist.addEventListener("click", async () => {
        await fetchPlaylistTracks(playlist.id);
      });

      featuredPlaylist.appendChild(img);
      featuredPlaylist.appendChild(playButton);
      featuredPlaylist.appendChild(title);
      featuredPlaylist.appendChild(description);
      playlistsContainer.appendChild(featuredPlaylist);
    });
  } else {
    playlistsContainer.innerText = "No playlists found.";
  }
}

async function fetchPlaylistTracks(id) {
  const endpoint = `https://api.spotify.com/v1/playlists/${id}`;
  const accessToken = localStorage.getItem("access_token");
  const feedbackContainer = document.getElementById("feedback");

  if (!accessToken) {
    console.error("Access token is missing.");
    feedbackContainer.innerText = "Access token is missing.";
    return;
  }

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    displayPlaylistTracks(data);
    // console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    feedbackContainer.innerText = "An error occurred while fetching playlists.";
  }
}

function displayPlaylistTracks(data) {
  const tracksContainer = document.getElementById("content");
  tracksContainer.replaceChildren();
  const titleHeader = document.getElementById("title-header");
  titleHeader.innerText = data.name;

  if (data && data.tracks.items.length > 0) {
    data.tracks.items.forEach((track) => {
      const playlistSong = document.createElement("div");
      playlistSong.className = "playlist-song";

      const img = document.createElement("img");
      img.src = track.track.album.images[0].url;
      img.alt = track.track.name;

      const playButton = document.createElement("button");
      playButton.innerText = "▶";

      const title = document.createElement("h3");
      title.textContent = track.track.name;

      const artist = document.createElement("h4");
      artist.textContent = track.track.artists[0].name;

      playlistSong.addEventListener("click", function () {
        window.open(`${track.track.external_urls.spotify}`, "_blank");
      });

      playlistSong.appendChild(img);
      playlistSong.appendChild(playButton);
      playlistSong.appendChild(title);
      playlistSong.appendChild(artist);
      tracksContainer.appendChild(playlistSong);
    });
  } else {
    tracksContainer.innerText = "No tracks found.";
  }
}
