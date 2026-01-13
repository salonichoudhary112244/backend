import "../styles/auth.css";


import { useEffect } from "react";
import { googleLogin } from "../api/authApi";

export default function GoogleLoginButton(){
  const handleGoogleResponse = async (response) => {
    try {
      const idToken = response.credential;
      const res = await googleLogin(idToken);
      localStorage.setItem("token", res.data);
      setPopup({ msg: "Google login successful ✨", type: "success" });
    } catch {
      setPopup({ msg: "Google login failed ❌", type: "error" });
    }
  };

  useEffect(() => {
      console.log("Google object:", window.google);

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "628025068852-cjernvki3n4jb7v52fdagb4m1jdrrv4d.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large", width: 300 }
      );
    }
  }, []);

    return (
    <div
      id="google-login-btn"
      style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}
    ></div>
  );
}