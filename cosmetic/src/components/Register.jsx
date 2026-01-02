import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/authApi";
import "../styles/auth.css";
import logo from "../assets/saloni-logo.png";
import Popup from "./Popup";

export default function Register() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      localStorage.setItem("verifyEmail", user.email.toLowerCase().trim());
      localStorage.setItem("verifyPhone", user.phone);

      setPopup({ msg: "Registered! Verify OTP ✨", type: "success" });

      setTimeout(() => navigate("/verify-otp"), 1200);
    } catch {
      setPopup({ msg: "Registration failed ❌", type: "error" });
    }
  };

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

        <h2>Register</h2>

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Phone"
            required
            onChange={(e) =>
              setUser({ ...user, phone: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
          <button type="submit">Register</button>
        </form>

        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}
