import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { login} from "../api/authApi";
import "../styles/auth.css";
import logo from "../assets/saloni-logo.png";
import Popup from "./Popup";
import GoogleLoginButton from "./GoogleLoginButton";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data);
      setPopup({ msg: "Login successful 🎉", type: "success" });
    } catch {
      setPopup({ msg: "Invalid credentials ❌", type: "error" });
    }
  };

  // const handleGoogleResponse = async (response) => {
  //   try {
  //     const idToken = response.credential;
  //     const res = await googleLogin(idToken);
  //     localStorage.setItem("token", res.data);
  //     setPopup({ msg: "Google login successful ✨", type: "success" });
  //   } catch {
  //     setPopup({ msg: "Google login failed ❌", type: "error" });
  //   }
  // };

  // useEffect(() => {
  //     console.log("Google object:", window.google);

  //   if (window.google) {
  //     window.google.accounts.id.initialize({
  //       client_id:
  //         "628025068852-cjernvki3n4jb7v52fdagb4m1jdrrv4d.apps.googleusercontent.com",
  //       callback: handleGoogleResponse,
  //     });

  //     window.google.accounts.id.renderButton(
  //       document.getElementById("google-login-btn"),
  //       { theme: "outline", size: "large", width: 300 }
  //     );
  //   }
  // }, []);

  return (
    <div className="auth-page">
      {popup && (
        <Popup
          message={popup.msg}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}

      <div className="auth-card">
        <Link to="/">
          <img src={logo} alt="Saloni Logo" className="auth-logo clickable-logo" />
        </Link>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Email / Phone / Username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>

        {/* <div
          id="google-login-btn"
          style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}
        ></div> */}


        {/* ✅ SEPARATE GOOGLE LOGIN */}
        <GoogleLoginButton
          onSuccess={(msg) => setPopup({ msg, type: "success" })}
          onError={(msg) => setPopup({ msg, type: "error" })}
        />
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <Link to="/register">Create Account</Link>
          <br />
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}
