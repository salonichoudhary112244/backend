// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     axiosInstance.get(`/auth/orders/user/${user.id}`)
//       .then(res => setOrders(res.data))
//       .catch(err => console.error("Orders load error", err));
//   }, []);

//   return (
//     <div style={{padding:"20px"}}>
//       <h2>My Orders</h2>

//       {orders.map(order => (
//         <div key={order.id} style={{border:"1px solid #ddd", padding:"10px", marginBottom:"10px"}}>
//           <h4>Order Number: {order.orderNumber}</h4>
//           <p>Status: {order.orderStatus}</p>
//           <p>Payment ID: {order.paymentId}</p>
//           <p>Total Items: {JSON.parse(order.itemsJson).length}</p>
//         </div>
//       ))}
//     </div>
//   );
// }









// track order button 
// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     axiosInstance
//       .get(`/auth/orders/user/${user.id}`)
//       .then(res => setOrders(res.data));
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>My Orders</h2>

//       {orders.map(o => (
//         <div
//           key={o.id}
//           style={{
//             border: "1px solid #ddd",
//             padding: 15,
//             marginBottom: 15,
//             borderRadius: 8
//           }}
//         >
//           <h4>Order #{o.orderNumber}</h4>
//           <p>Status: <b>{o.orderStatus}</b></p>
//           <p>Payment ID: {o.paymentId}</p>

//           <button
//             onClick={() =>
//               navigate(`/track-order/${o.orderNumber}`)
//             }
//           >
//             Track Order
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


// image 
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    axiosInstance
      .get(`/auth/orders/user/${user.id}`)
      .then((res) => {
         console.log("ORDERS API RESPONSE 👉", res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Orders load error", err);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 20,
            padding: 15
          }}
        >
          <h4>Order #{order.orderNumber}</h4>
          <p>
            Status: <b>{order.orderStatus}</b>
          </p>

          {/* PRODUCTS */}
  {order.items?.map((item, i) => (
  <div
    key={i}
    style={{
      display: "flex",
      gap: 15,
      marginTop: 10,
      borderTop: "1px solid #eee",
      paddingTop: 10
    }}
  >
    <img
      src={item.productImage}
      alt={item.productName}
      style={{
        width: 80,
        height: 80,
        objectFit: "cover",
        borderRadius: 6
      }}
    />

    <div>
      <h5>{item.productName}</h5>
      <p>Qty: {item.quantity}</p>
      <p>₹{item.price}</p>
    </div>
  </div>
))}

          <button
            style={{ marginTop: 10 }}
            onClick={() => navigate(`/track-order/${order.orderNumber}`)}
          >
            Track Order
          </button>
        </div>
      ))}
    </div>
  );
}



