import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    axiosInstance.get(`/auth/orders/user/${user.id}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error("Orders load error", err));
  }, []);

  return (
    <div style={{padding:"20px"}}>
      <h2>My Orders</h2>

      {orders.map(order => (
        <div key={order.id} style={{border:"1px solid #ddd", padding:"10px", marginBottom:"10px"}}>
          <h4>Order Number: {order.orderNumber}</h4>
          <p>Status: {order.orderStatus}</p>
          <p>Payment ID: {order.paymentId}</p>
          <p>Total Items: {JSON.parse(order.itemsJson).length}</p>
        </div>
      ))}
    </div>
  );
}
