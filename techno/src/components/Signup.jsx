import React, { useState } from "react";
import "./Signup.css";

export default function Signup({ switchForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (name === "") {
      setError("Enter name");
      return;
    }
    if (!email.includes("@")) {
      setError("Enter valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be 6 characters");
      return;
    }
    setError("Signup Successful");
    
  switchForm();

  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={handleSignup}>Signup</button>
        <p className="error">{error}</p>
        <p onClick={switchForm}>Already have account?</p>
      </div>
    </div>
  );
}