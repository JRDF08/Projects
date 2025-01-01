/* eslint-disable */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const logoutUser = async () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await fetch(
            `${API_URL}/SoundScape/api/auth/logout`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refreshToken }),
            }
          );

          const result = await response.json();

          if (response.ok) {
            logout();
            navigate("/");
          } else {
            alert(result.message || "Error logging out.");
          }
        } catch (error) {
          alert("Error communicating with the server. Please try again.");
          console.error("Logout Error:", error);
        }
      } else {
        navigate("/");
      }
    };

    logoutUser();
  }, [navigate]);

  return null;
}

export default Logout;
