import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleLoginBtn from "./GoogleLoginBtn";

const Login = () => {
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
      <form className="bg-white p-6 rounded shadow w-80" onSubmit={handleLogin}>
        <h2 className="text-xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="border p-2 w-full mb-3"
          placeholder="Email / Phone / Username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white w-full p-2 rounded">
          Login
        </button>
        <GoogleLoginBtn />
      </form>
    </div>
  );
};

export default Login;
