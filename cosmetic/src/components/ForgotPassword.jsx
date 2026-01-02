import { useState } from "react";
import { forgotPassword } from "../api/authApi";
import "../styles/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async () => {
    try {
      await forgotPassword(email);
      setSent(true);
    } catch {
      alert("Email not found");
    }
  };

  return (
    <div className="auth-card">
      <h2>Forgot Password</h2>

      {sent ? (
        <p style={{ color: "green", textAlign: "center" }}>
          Reset link sent to your email ✔
        </p>
      ) : (
        <>
          <input
            type="email"
            placeholder="Enter registered email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={submit}>Send Reset Link</button>
        </>
      )}
    </div>
  );
}
