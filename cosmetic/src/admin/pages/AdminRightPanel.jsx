// export default function AdminRightPanel() {
//   return (
//     <div className="admin-right-panel">

//       {/* ORDER SUMMARY */}
//       <div className="order-summary">
//         <h4>Order Summary</h4>

//         <div className="order-item">
//           <p>Glow Radiance Serum</p>
//           <span>₹1,099</span>
//         </div>

//         <div className="order-item">
//           <p>Renewal Skin Cream</p>
//           <span>₹900</span>
//         </div>

//         <div className="order-item">
//           <p>Purifying Shampoo</p>
//           <span>₹750</span>
//         </div>

//         <hr />

//         <div className="order-total">
//           <p>Subtotal</p>
//           <span>₹2,848</span>
//         </div>

//         <button className="place-order-btn">Place Order</button>
//       </div>

//       {/* PRODUCT CARDS */}
//       <div className="right-products">
//         <h4>Trending Products</h4>

//         <div className="right-product-card">
//           <img src="https://i.imgur.com/0y8Ftya.png" alt="" />
//           <p>Brightening Glow Serum</p>
//           <span>₹1,099</span>
//         </div>

//         <div className="right-product-card">
//           <img src="https://i.imgur.com/Lq8Qv4X.png" alt="" />
//           <p>Silk Treatment Oil</p>
//           <span>₹1,490</span>
//         </div>
//       </div>

//     </div>
//   );
// }












































import { Card, CardContent, Typography, Box, Button } from "@mui/material";

export default function AdminRightPanel() {
  return (
    <Box sx={{ flex: 1, ml: 2 }}>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Order Summary</Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <p>Glow Serum</p> <p>₹1,099</p>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <p>Skin Cream</p> <p>₹900</p>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <p>Shampoo</p> <p>₹750</p>
          </Box>

          <hr />

          <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
            <p>Total</p> <p>₹2,848</p>
          </Box>

          <Button fullWidth variant="contained" sx={{ bgcolor: "#ff4d88", mt: 1 }}>
            Place Order
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Trending Products</Typography>

          <Box sx={{ textAlign: "center", mt: 1 }}>
            <img width="80" src="https://i.imgur.com/0y8Ftya.png" />
            <p>Glow Serum</p>
            <b>₹1,099</b>
          </Box>

          <Box sx={{ textAlign: "center", mt: 1 }}>
            <img width="80" src="https://i.imgur.com/Lq8Qv4X.png" />
            <p>Silk Oil</p>
            <b>₹1,490</b>
          </Box>
        </CardContent>
      </Card>

    </Box>
  );
}
