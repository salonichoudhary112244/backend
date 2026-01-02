import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verifyEmailOtp, verifyPhoneOtp } from "../api/authApi";
import "../styles/auth.css";
import logo from "../assets/saloni-logo.png";

export default function VerifyOtp() {
  const navigate = useNavigate();

  const [email] = useState(localStorage.getItem("verifyEmail") || "");
  const [phone] = useState(localStorage.getItem("verifyPhone") || "");

  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  const [emailDone, setEmailDone] = useState(false);
  const [phoneDone, setPhoneDone] = useState(false);

  const verifyEmail = async () => {
    try {
      const res = await verifyEmailOtp(email, emailOtp);
      alert(res.data);
      if (res.data === "Email verified") setEmailDone(true);
    } catch {
      alert("Invalid Email OTP");
    }
  };

  const verifyPhone = async () => {
    try {
      const res = await verifyPhoneOtp(phone, phoneOtp);
      alert(res.data);
      if (res.data === "Phone verified") setPhoneDone(true);
    } catch {
      alert("Invalid Phone OTP");
    }
  };

  if (emailDone && phoneDone) {
    localStorage.removeItem("verifyEmail");
    localStorage.removeItem("verifyPhone");
    navigate("/login");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* 🔥 LOGO CLICK → HOME */}
        <Link to="/">
          <img
            src={logo}
            alt="Saloni Logo"
            className="auth-logo clickable-logo"
          />
        </Link>

        <h2>Verify OTP</h2>

        <input value={email} disabled />
        <input
          placeholder="Email OTP"
          onChange={(e) => setEmailOtp(e.target.value)}
        />
        <button onClick={verifyEmail}>Verify Email</button>

        <hr />

        <input value={phone} disabled />
        <input
          placeholder="Phone OTP"
          onChange={(e) => setPhoneOtp(e.target.value)}
        />
        <button onClick={verifyPhone}>Verify Phone</button>
      </div>
    </div>
  );
}
