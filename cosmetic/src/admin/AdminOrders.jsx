import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    axiosInstance.get("/auth/orders/admin/all")
      .then(res => setOrders(res.data))
      .catch(err => console.log("Load orders error", err));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = (id, status) => {
    axiosInstance.put(`/auth/orders/${id}/status`, {
      status: status
    }).then(() => {
      alert("Status Updated");
      loadOrders();
    }).catch(err => console.log("Update status error", err));
  };

  return (
    <div style={{padding:"20px"}}>
      <h2>Admin Orders Panel</h2>

      {orders.map(order => (
        <div key={order.id} style={{border:"1px solid #ccc", padding:"10px", marginBottom:"10px"}}>
          <h4>Order No: {order.orderNumber}</h4>
          <p>User ID: {order.userId}</p>
          <p>Status: {order.orderStatus}</p>

          <button onClick={() => updateStatus(order.id, "PACKED")}>Pack</button>
          <button onClick={() => updateStatus(order.id, "SHIPPED")}>Ship</button>
          <button onClick={() => updateStatus(order.id, "DELIVERED")}>Deliver</button>
        </div>
      ))}
    </div>
  );
}
