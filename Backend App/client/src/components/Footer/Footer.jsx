import { FiFacebook } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import { IoLogoGitlab } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";

function Footer() {
  const currentYear = new Date().getFullYear();

  const goToMyFB = () => {
    window.open("https://www.facebook.com/fernandez.johnrey08/", "_blank");
  };

  const goToMyEmail = () => {
    window.open("mailto:john.rey.d.fernandez08@gmail.com", "_blank");
  };

  const goToMyLinkedIn = () => {
    window.open("https://www.linkedin.com/in/jrdf/", "_blank");
  };

  const goToMyGitLab = () => {
    window.open("https://gitlab.com/JRDF", "_blank");
  };

  return (
    <div className="footer-container">
      <div className="footer-logo">
        <FiFacebook className="fb-logo" onClick={goToMyFB} />
        <MdAlternateEmail className="email-logo" onClick={goToMyEmail} />
        <CiLinkedin className="linkedin-logo" onClick={goToMyLinkedIn} />
        <IoLogoGitlab className="gitlab-logo" onClick={goToMyGitLab} />
      </div>
      <div>
        <p>&copy; JRDF {currentYear}. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
