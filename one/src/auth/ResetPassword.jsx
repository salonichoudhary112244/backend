import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post(
        `/auth/reset-password?token=${token}&newPassword=${password}`
      );
      setMessage("Password reset successful 🎉 Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Invalid or expired reset link");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form
        onSubmit={handleReset}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

        {message && <p className="text-green-600 mb-2">{message}</p>}
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="border p-2 w-full mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
