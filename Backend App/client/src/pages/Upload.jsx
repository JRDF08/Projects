/* eslint-disable */
import "./Upload.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

function Upload() {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_APP_API_URL;

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState(null);
  const [track, setTrack] = useState(null);
  const [upload, setUpload] = useState(false);
  const [error, setError] = useState("");

  const imageInputRef = useRef(null);
  const trackInputRef = useRef(null);

  const videoBgOne =
    "https://res.cloudinary.com/dz9idilfa/video/upload/v1731655560/home-background_ainbfr.mp4";

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleArtistChange = (event) => setArtist(event.target.value);
  const handleImageChange = (event) => setImage(event.target.files[0]);
  const handleTrackChange = (event) => setTrack(event.target.files[0]);

  const handleUpload = async (event) => {
    event.preventDefault();

    setUpload(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("track", document.getElementById("track").files[0]);
      formData.append("image", document.getElementById("avatar").files[0]);

      const response = await fetch(`${API_URL}/SoundScape/api/track/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Upload Successful.");

        setTitle("");
        setArtist("");
        setImage(null);
        setTrack(null);
        imageInputRef.current.value = "";
        trackInputRef.current.value = "";

        navigate("/song");
      } else {
        console.error("Upload failed:", result);
        setUpload(false);
        setError(result.message || "Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setUpload(false);
    }
  };

  return (
    <div className="background-video">
      <video src={videoBgOne} autoPlay loop muted />

      <div className="content">
        <h1>Upload</h1>

        <form onSubmit={handleUpload}>
          <div>
            <input
              type="text"
              placeholder="Enter Song Title"
              value={title}
              onChange={handleTitleChange}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Song Artist"
              value={artist}
              onChange={handleArtistChange}
            ></input>
          </div>

          <div>
            <input
              type="file"
              id="avatar"
              name="image"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              ref={imageInputRef}
            />
          </div>

          <div>
            <input
              type="file"
              id="track"
              name="track"
              accept=".mp3,audio/*"
              onChange={handleTrackChange}
              ref={trackInputRef}
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          <button
            className="upload-button"
            onClick={handleUpload}
            disabled={upload}
          >
            {upload ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
