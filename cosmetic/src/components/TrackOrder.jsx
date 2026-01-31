import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useParams } from "react-router-dom";

const steps = ["CONFIRMED", "PACKED", "SHIPPED", "DELIVERED"];

export default function TrackOrder() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/auth/orders/track/${orderNumber}`)
      .then(res => setOrder(res.data));
  }, [orderNumber]);

  if (!order) return <p>Loading...</p>;

  return (
    <div style={{ padding: 30 }}>
      <h2>Track Order</h2>
      <h4>Order #{order.orderNumber}</h4>

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
    </div>
  );
}
