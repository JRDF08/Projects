import "./About.css";

function About() {
  const videoBgTwo =
    "https://videos.pexels.com/video-files/2306150/2306150-hd_1920_1080_30fps.mp4";

  return (
    <div className="about-video">
      <video src={videoBgTwo} autoPlay loop muted />

      <div>
        <div className="about-content">
          <h1>SoundScape</h1>
          <br />
          <p>
            Soundscape is a cutting-edge music app designed to enhance your
            listening journey. Transform the way you listen with
            Soundscape—where music meets innovation.
          </p>
          <br />
          <p>Go to Music Player to listen to music.</p>
          <p>
            You can change background of music player depending on what you
            want.
          </p>
          <br />
          <p>
            You can choose dark or light mode if you want, just press icon after
            the logo, top upper left of the page.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
