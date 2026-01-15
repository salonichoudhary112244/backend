

import { useNavigate } from "react-router-dom";
import { addToCartApi } from "../../api/cartApi";
//import { getStoredUser } from "../../utils/auth";

export default function ProductBuyBox({ variant ,productId}) {
    const navigate = useNavigate();
    console.log("BUY BOX PROPS:", { variant, productId });

  //  // ❌ variant null ho to bhi button dikhao (disabled)
  // if (!variant) {
  //   return (
  //     <div className="buy-box">
  //       <button disabled>Please select a variant</button>
  //     </div>
  //   );
  // }
//temp check
  console.log("BUY BOX DEBUG:", {
  variant,
  variantId: variant?.id,
  productId
});

if (!variant?.id || !productId) {
  alert("Invalid variant");
  return;
}
//   //add to cart ke liye
const handleAddToCart = async () => {

  console.log("ADD TO CART PAYLOAD:", {
    productId,
    variantId: variant?.id
  });

  if (!variant?.id || !productId) {
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
