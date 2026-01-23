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












import { Box } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminDashboard from "./AdminDashboard";

export default function AdminPanel() {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#fdf2f5" }}>
      <AdminSidebar />

      <Box sx={{ flex: 1, p: 3}}>
        <AdminNavbar />
        <AdminDashboard />
      </Box>
    </Box>
  );
}

