import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const RegisterAuth = () => {
  const [user, setUser] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT
    setError("");
    setMsg("");

    try {
      await api.post("/auth/register", user);
      setMsg("Registered successfully 🎉 Redirecting to login...");
      
      setTimeout(() => {
        navigate("/loginauth"); // 👉 NEXT PAGE
      }, 1500);
    } catch (err) {
  if (err.response?.status === 403) {
    setError("Access denied by server (Security issue)");
  } else {
    setError("Registration failed");
  }
}
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={register}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl mb-4">Register</h2>

        {msg && <p className="text-green-600">{msg}</p>}
        {error && <p className="text-red-600">{error}</p>}

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
          required
        />

        <input
          placeholder="Phone"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setUser({ ...user, phone: e.target.value })
          }
          required
        />

        <input
          placeholder="Username"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setUser({ ...user, username: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterAuth;
