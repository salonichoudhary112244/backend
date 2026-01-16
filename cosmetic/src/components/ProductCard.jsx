import { useNavigate } from "react-router-dom";
import { addToCartApi } from "../api/cartApi";
export default function ProductCard({ product }) {

  const navigate = useNavigate();
  //pehle
  const imageSrc = product.imageUrl
    ? product.imageUrl   // Cloudinary URL already full
    : "/no-image.png";
// add to cart ke liye 
const handleAddToCart = async (e) => {
  e.stopPropagation();

  
  // ⚠️ VARIANT SAFETY CHECK — YAHI ADD KARNA HAI
  if (!product.defaultVariantId) {
    alert("Please select a variant");
    return;
  }
  
  
  try {
    await addToCartApi({
      productId: product.id,              // ✅ CORRECT
      variantId: product.defaultVariantId, // ✅ (must exist)
      quantity: 1
    });

    window.dispatchEvent(new Event("cartUpdated"));
  } catch {
    navigate("/login");
  }
};

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product.productId}`)}
    >
      <img
         src={imageSrc }
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-brand">{product.brandName}</p>

        <div className="product-price">
          ₹{product.price}
        </div>
      <button onClick={handleAddToCart}>Add to Cart</button>

      </div>
    </div>
  );
}