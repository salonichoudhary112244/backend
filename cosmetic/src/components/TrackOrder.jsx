// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useParams } from "react-router-dom";

// const steps = ["CONFIRMED", "PACKED", "SHIPPED", "DELIVERED"];

// export default function TrackOrder() {
//   const { orderNumber } = useParams();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     axiosInstance
//       .get(`/auth/orders/track/${orderNumber}`)
//       .then(res => setOrder(res.data));
//   }, [orderNumber]);

//   if (!order) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: 30 }}>
//       <h2>Track Order</h2>
//       <h4>Order #{order.orderNumber}</h4>

//       <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
//         {steps.map(step => (
//           <div
//             key={step}
//             style={{
//               padding: 10,
//               borderRadius: 6,
//               background:
//                 steps.indexOf(step) <=
//                 steps.indexOf(order.orderStatus)
//                   ? "#4caf50"
//                   : "#ccc",
//               color: "white"
//             }}
//           >
//             {step}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





// bad me add kiya cancleed button ke liye
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
const steps = ["CONFIRMED", "PACKED", "SHIPPED", "DELIVERED"];

export default function TrackOrder() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/auth/orders/track/${orderNumber}`)
      .then(res => setOrder(res.data));
  }, [orderNumber]);

const handleCancel = () => {
  if (!window.confirm("Are you sure you want to cancel this order?")) return;

  axios
    .put(`http://localhost:8080/auth/orders/cancel/${orderNumber}`)
    .then(() => {
      alert("Order cancelled successfully");
      setOrder({ ...order, orderStatus: "CANCELLED" });
    })
    .catch(err => {
      console.error(err);
      alert("Order cannot be cancelled");
    });
};


  if (!order) return <p>Loading...</p>;

  const canCancel =
    order.orderStatus === "CONFIRMED" ||
    order.orderStatus === "PACKED";

  return (
    <div style={{ padding: 30 }}>
      <h2>Track Order</h2>
      <h4>Order #{order.orderNumber}</h4>

      {/* STATUS STEPS */}
      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        {steps.map(step => (
          <div
            key={step}
            style={{
              padding: 10,
              borderRadius: 6,
              background:
                steps.indexOf(step) <=
                steps.indexOf(order.orderStatus)
                  ? "#4caf50"
                  : "#ccc",
              color: "white"
            }}
          >
            {step}
          </div>
        ))}
      </div>

      {/* ❌ CANCEL BUTTON */}
      {canCancel && (
        <button
          onClick={handleCancel}
          style={{
            marginTop: 30,
            background: "#f44336",
            color: "white",
            padding: "10px 16px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Cancel Order
        </button>
      )}

      {/* MESSAGE IF NOT ALLOWED */}
      {!canCancel && order.orderStatus !== "CANCELLED" && (
        <p style={{ marginTop: 20, color: "#999" }}>
          Order can no longer be cancelled.
        </p>
      )}

      {order.orderStatus === "CANCELLED" && (
        <p style={{ marginTop: 20, color: "red", fontWeight: "bold" }}>
          Order Cancelled
        </p>
      )}
    </div>
  );
}
