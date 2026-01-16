import { useEffect, useState } from "react";
import {
  getCartApi,
  increaseQtyApi,
  decreaseQtyApi,
  removeCartItemApi
} from "../api/cartApi";

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
  console.log("INCREASE CART ITEM ID:", id);
  await increaseQtyApi(id);
  loadCart();
  window.dispatchEvent(new Event("cartUpdated"));
};


  const dec = async (id) => {
    await decreaseQtyApi(id);
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const remove = async (id) => {
    await removeCartItemApi(id);
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {items.map(item => (
        <div key={item.id} className="cart-row">
          {/* pehle */}
          {/* <img src={item.imageUrl} /> */} 

  <img
  src={item.imageUrl ? item.imageUrl : "/no-image.png"}
  alt={item.productName}
/>

          <div>
            <h4>{item.productName}</h4>
            <p>₹{item.price}</p>

            <button onClick={() => dec(item.cartItemId)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => inc(item.cartItemId)}>+</button>

            <button onClick={() => remove(item.cartItemId)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
