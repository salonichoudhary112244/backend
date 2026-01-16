// import { useEffect, useState } from "react";
// import {
//   getCartApi,
//   increaseQtyApi,
//   decreaseQtyApi,
//   removeCartItemApi
// } from "../api/cartApi";

// import "../styles/AddToCartPage.css";
// export default function CartPage() {
//   const [items, setItems] = useState([]);

// const loadCart = async () => {
//   try {
//     const res = await getCartApi();
//     setItems(res.data);
//   } catch (err) {
//     console.error("Cart load failed", err);
//   }
// };

//   useEffect(() => {
//     loadCart();
//   }, []);

// const inc = async (id) => {
//   console.log("INCREASE CART ITEM ID:", id);
//   await increaseQtyApi(id);
//   loadCart();
//   window.dispatchEvent(new Event("cartUpdated"));
// };


//   const dec = async (id) => {
//     await decreaseQtyApi(id);
//     loadCart();
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   const remove = async (id) => {
//     await removeCartItemApi(id);
//     loadCart();
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   //sum total 
//   const totalPrice = items.reduce((sum, item) => {
//   return sum + item.price * item.quantity;
// }, 0);

//   return (
//     <div className="cart-page">
//       <h2>Your Cart</h2>

//       {items.map(item => (
//         <div key={item.id} className="cart-row">
//   <img
//   src={item.imageUrl ? item.imageUrl : "/no-image.png"}
//   alt={item.productName}
// />

//           <div>
//             <h4>{item.productName}</h4>
//             <p>₹{item.price}</p>

//             <button onClick={() => dec(item.cartItemId)}>-</button>
//             <span>{item.quantity}</span>
//             <button onClick={() => inc(item.cartItemId)}>+</button>

//             <button onClick={() => remove(item.cartItemId)}>Remove</button>
//           </div>
//         </div>
//       ))}
//          {/* ✅ TOTAL PRICE */}
//       <div className="cart-summary">
//         <h3>Total: ₹{totalPrice}</h3>
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

import "../styles/AddToCartPage.css";

export default function CartPage() {
  const [items, setItems] = useState([]);

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

  const inc = async (id) => {
    await increaseQtyApi(id);
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

 const dec = async (item) => {
  if (item.quantity <= 1) {
    return; // ❌ 1 se neeche nahi jaane dena
  }

  await decreaseQtyApi(item.cartItemId);
  loadCart();
  window.dispatchEvent(new Event("cartUpdated"));
};

  const remove = async (id) => {
    await removeCartItemApi(id);
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      {/* ================= LEFT ================= */}
      <div className="cart-left">
        <h2>Cart</h2>

        {/* TABLE HEADER */}
        <div className="cart-header">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Subtotal</span>
        </div>

        {/* ITEMS */}
        {items.map((item) => (
          <div key={item.cartItemId} className="cart-row">
            {/* PRODUCT */}
            <div className="cart-product">
              <img
                src={item.imageUrl || "/no-image.png"}
                alt={item.productName}
              />
              <div>
                <h4>{item.productName}</h4>
                <span>Variant</span>
              </div>
            </div>

            {/* PRICE */}
            <div className="cart-price">₹{item.price}</div>

            {/* QTY */}
            <div className="cart-qty">
<button
  onClick={() => dec(item)}
  disabled={item.quantity === 1}
>
  −
</button>
              <span>{item.quantity}</span>
              <button onClick={() => inc(item.cartItemId)}>+</button>
            </div>

            {/* SUBTOTAL */}
            <div className="cart-subtotal">
              ₹{item.price * item.quantity}
            </div>
            <button
  className="remove-btn"
  onClick={() => remove(item.cartItemId)}
>
  Remove
</button>
          </div>
        ))}
      </div>

      {/* ================= RIGHT ================= */}
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

        <button className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
