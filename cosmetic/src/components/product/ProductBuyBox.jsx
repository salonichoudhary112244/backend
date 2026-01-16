

import { useNavigate } from "react-router-dom";
import { addToCartApi } from "../../api/cartApi";
//import { getStoredUser } from "../../utils/auth";

export default function ProductBuyBox({ variant ,productId}) {
    const navigate = useNavigate();

//   //add to cart ke liye
const handleAddToCart = async () => {

if (!productId || !variant?.id) {
  alert("Invalid variant");
  return;
}

    try {
   await addToCartApi({
  productId,
  variantId: variant.id,    
  quantity: 1
});
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error(err);
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
