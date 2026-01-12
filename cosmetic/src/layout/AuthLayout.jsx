
import { Outlet } from "react-router-dom";
import "../styles/authLayout.css";

export default function AuthLayout() {
  return (
    <div className="auth-page">
      <div className="auth-card animate-card">
        <Outlet />
      </div>
    </div>
  );
}
