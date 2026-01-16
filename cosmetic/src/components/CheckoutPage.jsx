import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { getStoredUser } from "../utils/auth";
import "../styles/checkout.css";

export default function CheckoutPage() {
  const user = getStoredUser();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await axiosInstance.get(`/auth/cart/${user.id}`);
      setCartItems(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      await axiosInstance.post(`/auth/checkout/${user.id}`);
      alert("Order placed successfully ✅");
      window.dispatchEvent(new Event("cartUpdated"));
      navigate("/");
    } catch (e) {
      alert("Failed to place order");
    }
  };

  if (loading) return <p>Loading checkout...</p>;

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-layout">

        {/* LEFT */}
        <div className="checkout-left">
          <h3>Shipping Address</h3>

          <input placeholder="Full Name" defaultValue={user?.name || ""} />
          <input placeholder="Phone" />
          <input placeholder="Address" />
          <input placeholder="City" />
          <input placeholder="Pincode" />

          <h3 className="mt">Payment Method</h3>
          <label className="radio">
            <input type="radio" checked readOnly />
            Cash on Delivery
          </label>
          <p className="muted">Online payment coming soon</p>
        </div>

        {/* RIGHT */}
        <div className="checkout-right">
          <h3>Order Summary</h3>

          {cartItems.map(item => (
            <div key={item.cartItemId} className="summary-row">
              <span>{item.productName}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <div className="summary-row bold">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button className="place-order" onClick={placeOrder}>
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}
