/* eslint-disable */
import "./List.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function List() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const [songs, setSongs] = useState([]);
  const [editingSong, setEditingSong] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const videoBgOne =
    "https://res.cloudinary.com/dz9idilfa/video/upload/v1731655560/home-background_ainbfr.mp4";

  const handleListAll = async () => {
    try {
      const response = await fetch(
        `${API_URL}/SoundScape/api/musicplayer/list`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `${API_URL}/SoundScape/api/musicplayer/listAll?includeDeleted=${includeDeleted}`
        );
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [includeDeleted]);

  const goToUploadPage = () => {
    navigate("/upload");
  };

  const handleDelete = async (title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/SoundScape/api/track/delete/${title}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert(`Song "${title}" deleted successfully`);
        setSongs(songs.filter((song) => song.title !== title));
      } else {
        const result = await response.json();
        alert(result.error || "Failed to delete the song.");
      }
    } catch (error) {
      console.error("Error deleting song:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleSoftDelete = async (title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to soft delete "${title}"?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/SoundScape/api/track/soft-delete/${title}`,
        { method: "PATCH" }
      );

      if (response.ok) {
        alert(`Song "${title}" soft deleted successfully.`);
        setSongs(songs.filter((song) => song.title !== title));
      } else {
        const result = await response.json();
        alert(result.error || "Failed to soft delete the song.");
      }
    } catch (error) {
      console.error("Error soft deleting song:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleUpdate = async () => {
    if (!newTitle || !newArtist) {
      alert("Both title and artist are required.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/SoundScape/api/track/update/${editingSong.title}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newTitle,
            newArtist,
          }),
        }
      );
      if (response.ok) {
        const updatedSong = await response.json();
        alert(`Song "${updatedSong.updatedSong.title}" updated successfully`);

        setSongs((prevSongs) =>
          prevSongs.map((song) =>
            song._id === editingSong._id
              ? { ...song, title: newTitle, artist: newArtist }
              : song
          )
        );

        setEditingSong(null);
        setNewTitle("");
        setNewArtist("");
      } else {
        const result = await response.json();
        alert(result.error || "Failed to update the song.");
      }
    } catch (error) {
      console.error("Error updating song:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="background-video">
      <video src={videoBgOne} autoPlay loop muted />

      <div className="content">
        <h1>
          List of Songs{" "}
          <button className="buttons" onClick={handleListAll}>
            List All Songs
          </button>
          <button className="buttons" onClick={goToUploadPage}>
            Add New Song
          </button>
        </h1>

        <div>
          {songs.map((song, index) => (
            <div className="data" key={song._id}>
              <div>#{index + 1}</div>
              <div>{song.title}</div>
              <div>{song.artist}</div>

              <button
                className="buttons"
                onClick={() => {
                  setEditingSong(song);
                  setNewTitle(song.title);
                  setNewArtist(song.artist);
                }}
              >
                Edit
              </button>
              <button
                className="buttons"
                onClick={() => handleDelete(song.title)}
              >
                Delete
              </button>
              <button
                className="buttons"
                onClick={() => handleSoftDelete(song.title)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {editingSong && (
          <div className="edit-form">
            <h2>Update Song</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter new title"
            />
            <input
              type="text"
              value={newArtist}
              onChange={(e) => setNewArtist(e.target.value)}
              placeholder="Enter new artist"
            />
            <br />
            <button className="buttons" onClick={handleUpdate}>
              Save
            </button>
            <button className="buttons" onClick={() => setEditingSong(null)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default List;
