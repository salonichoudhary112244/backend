// import { useEffect, useState } from "react";
// import { getCartApi, addToCartApi, decreaseQtyApi } from "../api/cartApi";
// import "../styles/cart.css";

// export default function CartPage() {
//   const [items, setItems] = useState([]);

//   const loadCart = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user?.id) return;

//     const res = await getCartApi(user.id);
//     setItems(res.data);
//   };

// //   useEffect(() => {
// //     loadCart();
// //   }, []);
// useEffect(() => {
//   loadCart();

//   const onStorageChange = () => loadCart();
//   window.addEventListener("storage", onStorageChange);

//   return () => window.removeEventListener("storage", onStorageChange);
// }, []);

//   const increaseQty = async (item) => {
//     await addToCartApi({
//       userId: JSON.parse(localStorage.getItem("user")).id,
//       productId: item.productId,
//       variantId: item.variantId,
//       quantity: 1,
//     });
//     loadCart();
//   };

//   const decreaseQty = async (item) => {
//     await decreaseQtyApi(item.cartItemId);
//     loadCart();
//   };

//   return (
//     <div className="cart-page">
//       <h2>My Cart</h2>

//       {items.map(item => (
//         <div className="cart-item" key={item.cartItemId}>
//           <img src={item.image || "/no-image.png"} />

//           <div className="cart-info">
//             <h4>{item.productName}</h4>
//             <p>₹{item.price}</p>

//             <div className="qty-box">
//               <button onClick={() => decreaseQty(item)}>-</button>
//               <span>{item.quantity}</span>
//               <button onClick={() => increaseQty(item)}>+</button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }











import { useEffect, useState } from "react";
import { getCartApi } from "../api/cartApi";

export default function CartPage() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) return;

      const res = await getCartApi(user.id);
      setItems(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-page">
      <h2>My Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        items.map(item => (
          <div key={item.id} className="cart-row">
            <p>{item.productName}</p>
            <p>Qty: {item.quantity}</p>
            <p>₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
}
