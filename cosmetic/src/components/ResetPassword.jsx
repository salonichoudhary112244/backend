import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import "../styles/auth.css";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const submit = async () => {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password);
      alert("Password reset successful");
      navigate("/login"); // 🔥 BACK TO LOGIN
    } catch {
      alert("Invalid or expired link");
    }
  };

  return (
<div className="auth-page">
    <div className="auth-card">
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirm(e.target.value)}
      />

      <button onClick={submit}>Reset Password</button>
    </div>
  </div>
  );
}
