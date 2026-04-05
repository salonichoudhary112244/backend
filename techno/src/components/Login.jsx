import React, { useState } from "react";
import "./Login.css";

export default function Login({ switchForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email.includes("@")) {
      setError("Enter valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be 6 characters");
      return;
    }
    setError("Login Successful");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p className="error">{error}</p>
        <p onClick={switchForm}>Create Account</p>
      </div>
    </div>
  );
}