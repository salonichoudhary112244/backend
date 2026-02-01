// export default function AdminNavbar() {
//   return (
//     <div className="admin-navbar">
//       <h3>Admin Panel</h3>
//       <input placeholder="Search..." />
//       <div className="admin-icons">
//         ❤️ 🛒 👤
//       </div>
//     </div>
//   );
// }

















import { AppBar, Toolbar, Typography, TextField, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";

export default function AdminNavbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "white", color: "black", borderRadius: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Admin Panel</Typography>

        <TextField size="small" placeholder="Search..." />

        <Box>
          <FavoriteIcon sx={{ mr: 1 }} />
          <ShoppingCartIcon sx={{ mr: 1 }} />
          <PersonIcon />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
