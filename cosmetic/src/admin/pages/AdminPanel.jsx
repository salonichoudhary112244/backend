// import AdminSidebar from "./AdminSidebar";
// import AdminNavbar from "./AdminNavbar";
// import AdminDashboard from "./AdminDashboard";
// import "./admin.css";

// export default function AdminPanel() {
//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <div className="admin-main">
//         <AdminNavbar />
//         <AdminDashboard />
//       </div>
//     </div>
//   );
// }










import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Box } from "@mui/material";

export default function AdminPanel() {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Outlet />   {/* ❗ ye missing hua to blank page */}
      </Box>
    </Box>
  );
}

