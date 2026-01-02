import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleLoginBtn from "./GoogleLoginBtn";

const LoginAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form className="card w-80" onSubmit={handleLogin}>
  <h2 className="heading mb-4">Beauty Login ✨</h2>

  {error && <p className="text-error">{error}</p>}

  <input className="input mb-3" placeholder="Email / Username" />
  <input className="input mb-4" type="password" placeholder="Password" />

  <button className="btn-primary">Login</button>

  <div className="google-btn">
    <GoogleLoginBtn />
  </div>
</form>

    </div>
  );
};

export default LoginAuth;
