// export default function AdminSidebar() {
//   return (
//     <div className="admin-sidebar">
//       <h2>SALONI</h2>
//       <ul>
//         <li>Dashboard</li>
//         <li>Products</li>
//         <li>Categories</li>
//         <li>Orders</li>
//         <li>Customers</li>
//         <li>Analytics</li>
//         <li>Settings</li>
//       </ul>
//     </div>
//   );
// }

























import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function AdminSidebar() {
  return (
    <Drawer variant="permanent" sx={{
      width: 240,
      "& .MuiDrawer-paper": {
        width: 240,
        bgcolor: "#ffe4ec",
        padding: 2
      }
    }}>
      <Typography variant="h6" sx={{ color: "#ff4d88", mb: 2 }}>
        SALONI
      </Typography>

      <List>
        {["Dashboard", "Products", "Categories", "Orders", "Customers", "Analytics", "Settings"].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

