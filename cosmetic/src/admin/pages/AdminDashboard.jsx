// import AdminRightPanel from "./AdminRightPanel";

// export default function AdminDashboard() {
//   return (
//     <div className="admin-dashboard-grid">

//       {/* LEFT MAIN DASHBOARD */}
//       <div className="admin-left">

//         <div className="admin-cards">
//           <div className="admin-card">💰 Total Sales <br /> ₹1,24,890</div>
//           <div className="admin-card">📦 Orders <br /> 320</div>
//           <div className="admin-card">🎁 Products <br /> 48</div>
//         </div>

//         <div className="admin-graph">
//           <h4>Sales Overview</h4>
//           <div className="fake-graph"></div>
//         </div>

//         <div className="admin-orders">
//           <h4>Recent Orders</h4>
//           <table>
//             <tr>
//               <th>Order</th>
//               <th>Customer</th>
//               <th>Status</th>
//               <th>Total</th>
//             </tr>
//             <tr>
//               <td>#00258</td>
//               <td>Shruti</td>
//               <td className="shipped">Shipped</td>
//               <td>₹2,848</td>
//             </tr>
//             <tr>
//               <td>#00257</td>
//               <td>Aman</td>
//               <td className="pending">Pending</td>
//               <td>₹1,230</td>
//             </tr>
//           </table>
//         </div>

//       </div>

//       {/* RIGHT PANEL */}
//       <AdminRightPanel />

//     </div>
//   );
// }






























import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AdminRightPanel from "./AdminRightPanel";

export default function AdminDashboard() {

    const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0
  });

  useEffect(() => {
    axiosInstance.get("/admin/dashboard")
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 4, mt: 3 }}>

      {/* LEFT DASHBOARD */}
      <Box sx={{ flex: 2.5 }}>

        {/* CARDS */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography>Total Sales</Typography>
                <Typography variant="h5">₹1,24,890</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography>Orders</Typography>
                <Typography variant="h5">320</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography>Products</Typography>
                <Typography variant="h5">48</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* GRAPH */}
        <Card sx={{ mt: 3, p: 3, minHeight: 220, borderRadius: 3 }}>
          <Typography>Sales Overview</Typography>
          <Box sx={{ height: 140, bgcolor: "#ffe4ec", borderRadius: 2, mt: 2 }} />
        </Card>

      </Box>

      {/* RIGHT PANEL */}
      <Box sx={{ flex: 1, ml: 2 }}>
        <AdminRightPanel />
      </Box>

    </Box>
  );
}
