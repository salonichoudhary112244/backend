import { Navigate } from "react-router-dom";
import { isLoggedIn, hasRole } from "../utils/roleGuard";

export default function RoleRoute({ children, role }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  if (!hasRole(role)) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>
      🚫 Access Denied — You are not authorized
    </h2>;
  }

  return children;
}
