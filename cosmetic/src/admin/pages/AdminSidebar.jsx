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
import { NavLink } from "react-router-dom";

const menu = [
  { text: "Dashboard", path: "/admin/dashboard" },
  { text: "Products", path: "/admin/products" },
  { text: "Categories", path: "/admin/categories" },
  { text: "Orders", path: "/admin/orders" },
  { text: "Customers", path: "/admin/customers" },
  { text: "Analytics", path: "/admin/analytics" },
  { text: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          bgcolor: "#ffe4ec",
          padding: 2
        }
      }}
    >
      <Typography variant="h6" sx={{ color: "#ff4d88", mb: 2 }}>
        SALONI
      </Typography>

      <List>
        {menu.map((item) => (
          <ListItem
            button
            key={item.text}
            component={NavLink}
            to={item.path}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}


