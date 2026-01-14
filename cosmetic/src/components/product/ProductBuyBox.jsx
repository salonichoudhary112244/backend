

import { useNavigate } from "react-router-dom";
import { addToCartApi } from "../../api/cartApi";

export default function ProductBuyBox({ variant }) {
    const navigate = useNavigate();
  if (!variant) return null;//only product detail page ke liye


  //add to cart ke liye
  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // if (!user) {
    //   navigate("/login");
    //   return;
    // }
    
     console.log("ADD CART USER", user);

    try {
      // await addToCartApi({
      //   userId: user.id,
      //   productId: variant.productId,
      //   variantId: variant.id,
      //   quantity: 1,
      // });

      // navigate("/cart");

      await addToCartApi({
  userId: user.id,
  productId: variant.productId,
  variantId: variant.id,
  quantity: 1,
});

// 🔥 SIGNAL FOR NAVBAR & CART
localStorage.setItem("cartUpdated", Date.now());

navigate("/cart");
    } catch (err) {
      console.error(err);
      alert("Add to cart failed");
    }
  }
  return (
    <div className="product-buy-box">
      <button className="add-cart"onClick={handleAddToCart}>Add to Cart</button>
      <button className="buy-now">Buy Now</button>
    </div>
  );
}
