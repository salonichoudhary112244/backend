// // import { useEffect, useState } from "react";
// // import {
// //   getCartApi,
// //   increaseQtyApi,
// //   decreaseQtyApi,
// //   removeCartItemApi
// // } from "../api/cartApi";

// // import "../styles/AddToCartPage.css";
// // export default function CartPage() {
// //   const [items, setItems] = useState([]);

// // const loadCart = async () => {
// //   try {
// //     const res = await getCartApi();
// //     setItems(res.data);
// //   } catch (err) {
// //     console.error("Cart load failed", err);
// //   }
// // };

// //   useEffect(() => {
// //     loadCart();
// //   }, []);

// // const inc = async (id) => {
// //   console.log("INCREASE CART ITEM ID:", id);
// //   await increaseQtyApi(id);
// //   loadCart();
// //   window.dispatchEvent(new Event("cartUpdated"));
// // };


// //   const dec = async (id) => {
// //     await decreaseQtyApi(id);
// //     loadCart();
// //     window.dispatchEvent(new Event("cartUpdated"));
// //   };

// //   const remove = async (id) => {
// //     await removeCartItemApi(id);
// //     loadCart();
// //     window.dispatchEvent(new Event("cartUpdated"));
// //   };

// //   //sum total 
// //   const totalPrice = items.reduce((sum, item) => {
// //   return sum + item.price * item.quantity;
// // }, 0);

// //   return (
// //     <div className="cart-page">
// //       <h2>Your Cart</h2>

// //       {items.map(item => (
// //         <div key={item.id} className="cart-row">
// //   <img
// //   src={item.imageUrl ? item.imageUrl : "/no-image.png"}
// //   alt={item.productName}
// // />

// //           <div>
// //             <h4>{item.productName}</h4>
// //             <p>₹{item.price}</p>

// //             <button onClick={() => dec(item.cartItemId)}>-</button>
// //             <span>{item.quantity}</span>
// //             <button onClick={() => inc(item.cartItemId)}>+</button>

// //             <button onClick={() => remove(item.cartItemId)}>Remove</button>
// //           </div>
// //         </div>
// //       ))}
// //          {/* ✅ TOTAL PRICE */}
// //       <div className="cart-summary">
// //         <h3>Total: ₹{totalPrice}</h3>
// //       </div>
// //     </div>
// //   );
// // }





















// import { useEffect, useState } from "react";
// import {
//   getCartApi,
//   increaseQtyApi,
//   decreaseQtyApi,
//   removeCartItemApi
// } from "../api/cartApi";
// import { useNavigate } from "react-router-dom";

// import "../styles/AddToCartPage.css";

// export default function CartPage() {
//   const [items, setItems] = useState([]);
// const navigate = useNavigate();

//   const loadCart = async () => {
//     try {
//       const res = await getCartApi();
//       setItems(res.data);
//     } catch (err) {
//       console.error("Cart load failed", err);
//     }
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   const inc = async (id) => {
//     await increaseQtyApi(id);
//     loadCart();
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//  const dec = async (item) => {
//   if (item.quantity <= 1) {
//     return; // ❌ 1 se neeche nahi jaane dena
//   }

//   await decreaseQtyApi(item.cartItemId);
//   loadCart();
//   window.dispatchEvent(new Event("cartUpdated"));
// };

//   const remove = async (id) => {
//     await removeCartItemApi(id);
//     loadCart();
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   const totalPrice = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="cart-container">
//       {/* ================= LEFT ================= */}
//       <div className="cart-left">
//         <h2>Cart</h2>

//         {/* TABLE HEADER */}
//         <div className="cart-header">
//           <span>Product</span>
//           <span>Price</span>
//           <span>Quantity</span>
//           <span>Subtotal</span>
//         </div>

//         {/* ITEMS */}
//         {items.map((item) => (
//           <div key={item.cartItemId} className="cart-row">
//             {/* PRODUCT */}
//             <div className="cart-product">
//               <img
//                 src={item.imageUrl || "/no-image.png"}
//                 alt={item.productName}
//               />
//               <div>
//                 <h4>{item.productName}</h4>
//                 <span>Variant</span>
//               </div>
//             </div>

//             {/* PRICE */}
//             <div className="cart-price">₹{item.price}</div>

//             {/* QTY */}
//             <div className="cart-qty">
// <button
//   onClick={() => dec(item)}
//   disabled={item.quantity === 1}
// >
//   −
// </button>
//               <span>{item.quantity}</span>
//               <button onClick={() => inc(item.cartItemId)}>+</button>
//             </div>

//             {/* SUBTOTAL */}
//             <div className="cart-subtotal">
//               ₹{item.price * item.quantity}
//             </div>
//             <button
//   className="remove-btn"
//   onClick={() => remove(item.cartItemId)}
// >
//   Remove
// </button>
//           </div>
//         ))}
//       </div>

//       {/* ================= RIGHT ================= */}
//       <div className="cart-right">
//         <h3>Order Summary</h3>

//         <div className="summary-row">
//           <span>Subtotal</span>
//           <span>₹{totalPrice}</span>
//         </div>

//         <div className="summary-row">
//           <span>Shipping</span>
//           <span>Free</span>
//         </div>

//         <div className="summary-row total">
//           <span>Total</span>
//           <span>₹{totalPrice}</span>
//         </div>

//         <button
//           className="checkout-btn"
//           onClick={() => navigate("/checkout")}
//         >
//          Proceed to Checkout
//          </button>

//       </div>
//     </div>
//   );
// }

















import { useEffect, useState } from "react";
import {
  getCartApi,
  increaseQtyApi,
  decreaseQtyApi,
  removeCartItemApi
} from "../api/cartApi";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

import "../styles/AddToCartPage.css";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // ================= LOAD CART =================
  const loadCart = async () => {
    try {
      const res = await getCartApi();
      setItems(res.data);
    } catch (err) {
      console.error("Cart load failed", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ================= QTY CONTROL =================
  const inc = async (id) => {
    await increaseQtyApi(id);
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const dec = async (item) => {
    if (item.quantity <= 1) return;
    await decreaseQtyApi(item.cartItemId);
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const remove = async (id) => {
    await removeCartItemApi(id);
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ================= TOTAL PRICE =================
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  //clear cart button
  const clearCart = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!window.confirm("Are you sure you want to clear cart?")) return;

  try {
    await axiosInstance.delete(`/auth/cart/clear/${user.id}`);

    setItems([]); // frontend empty
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Cart Cleared Successfully");
  } catch (err) {
    console.error("Clear cart failed", err);
    alert("Clear cart failed ❌");
  }
};


  // ================= RAZORPAY PAYMENT =================
  const handleCheckout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || 1;

      // 1️⃣ Create order in backend
      const res = await axiosInstance.post("/auth/payment/create-order", {
        amount: totalPrice * 100, // ₹ to paise
        userId
      });

      const { orderId, key } = res.data;

      // 2️⃣ Razorpay popup config
      const options = {
        key: key,
        amount: totalPrice * 100,
        currency: "INR",
        name: "SALONI Beauty",
        description: "Order Payment",
        order_id: orderId,

// handler: async function (response) {
//   console.log("PAYMENT SUCCESS:", response);
//   alert("Payment Successful 🎉 Order Confirmed");

//   navigate("/orders-success");
// },

handler: async function (response) {
  console.log("PAYMENT SUCCESS:", response);
  alert("Payment Successful 🎉 Order Confirmed");

  const user = JSON.parse(localStorage.getItem("user"));

  try {
    // ✅ Correct API path
    await axiosInstance.delete(`/auth/cart/clear/${user.id}`);
  } catch (e) {
    console.error("Cart clear failed", e);
  }

  // ✅ Clear frontend state
  setItems([]);
  window.dispatchEvent(new Event("cartUpdated"));

  // ✅ Redirect
  window.location.href = "/orders-success";
},

        prefill: {
          name: user?.name || "Saloni",
          email: user?.email || "test@email.com",
          contact: "9999999999"
        },

        theme: {
          color: "#e91e63"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error("PAYMENT ERROR", err);
      alert("Payment Failed ❌");
    }
  };

//    // Create subscription

const handleSubscription = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id || 1;

    // Create subscription
    const res = await axiosInstance.post("/auth/payment/create-subscription", {
      userId
    });

    const { subscriptionId, key } = res.data;

    const options = {
      key: key,
      subscription_id: subscriptionId,
      name: "SALONI Beauty Subscription",
      description: "Monthly Beauty Box",

      handler: function (response) {
        console.log("SUBSCRIPTION SUCCESS", response);
        alert("Subscription Started 🎉");

        window.location.href = "/subscription-success";
      },

      prefill: {
        name: user?.name,
        email: user?.email,
        contact: "9999999999"
      },
      theme: { color: "#673ab7" }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (err) {
    console.error("Subscription error", err);
    alert("Subscription Failed ❌");
  }
};


  // ================= UI =================
  return (
    <div className="cart-container">

      {/* LEFT CART */}
      <div className="cart-left">
        <h2>Cart</h2>

        <div className="cart-header">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Subtotal</span>
        </div>

        {items.map(item => (
          <div key={item.cartItemId} className="cart-row">

            <div className="cart-product">
              <img src={item.imageUrl || "/no-image.png"} alt={item.productName} />
              <div>
                <h4>{item.productName}</h4>
                <span>Variant</span>
              </div>
            </div>

            <div className="cart-price">₹{item.price}</div>

            <div className="cart-qty">
              <button onClick={() => dec(item)} disabled={item.quantity === 1}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => inc(item.cartItemId)}>+</button>
            </div>

            <div className="cart-subtotal">
              ₹{item.price * item.quantity}
            </div>

            <button className="remove-btn" onClick={() => remove(item.cartItemId)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* RIGHT SUMMARY */}
      <div className="cart-right">
        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className="summary-row total">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

{/* clear button */}
<button className="clear-cart-btn" onClick={clearCart}>
  Clear Cart 🗑️
</button>

        {/* 🔥 PAYMENT BUTTON */}
        <button className="checkout-btn" onClick={handleCheckout}>
          Pay ₹{totalPrice}
        </button>
        
      {/* 🔔 SUBSCRIPTION BUTTON */}
<button 
  className="subscription-btn" 
  onClick={handleSubscription}
>
  Subscribe Monthly ₹100
</button>


      </div>
    </div>
  );
}

