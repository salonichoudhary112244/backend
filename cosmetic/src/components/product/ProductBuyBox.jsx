

import { useNavigate } from "react-router-dom";
import { addToCartApi } from "../../api/cartApi";
//import { getStoredUser } from "../../utils/auth";

export default function ProductBuyBox({ variant }) {
    const navigate = useNavigate();
  if (!variant) return null;//only product detail page ke liye


//   //add to cart ke liye
 const handleAddToCart = async () => {
    try {
      await addToCartApi({
        productId: variant.productId,
        variantId: variant.id,
        quantity: 1
      });

      window.dispatchEvent(new Event("cartUpdated"));
      navigate("/cart");
    } catch {
      navigate("/login");
    }
  };
  return (
    <div className="product-buy-box">
      <button className="add-cart"onClick={handleAddToCart}>Add to Cart</button>
      <button className="buy-now">Buy Now</button>
    </div>
  );
}
