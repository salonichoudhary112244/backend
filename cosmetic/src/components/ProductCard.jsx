import { useNavigate } from "react-router-dom";
import { addToCartApi } from "../api/cartApi";
import axiosInstance from "../api/axiosInstance";

export default function ProductCard({ product }) {

  const navigate = useNavigate();
  //pehle
  const imageSrc = product.imageUrl
    ? product.imageUrl   // Cloudinary URL already full
    : "/no-image.png";
// add to cart ke liye 
const handleAddToCart = async (e) => {
  e.stopPropagation();
  
  // // ⚠️ VARIANT SAFETY CHECK — YAHI ADD KARNA HAI
  // if (!product.defaultVariantId) {
  //   alert("Please select a variant");
  //   return;
  // }

  // ✅ ALWAYS PICK FIRST VARIANT
  //   const variantId = product.variants?.[0]?.id;
  //  const productId = product.productId; // 🔥 IMPORTANT FIX

  


    try {
      // 🔥 STEP 1: Product detail API call
      const res = await axiosInstance.get(
        `/auth/products/${product.productId}/page`
      );

          // 🔥 YAHIN ADD KARO (IMPORTANT)
    console.log("VARIANTS FROM DETAIL API:", res.data.variants);

      const variants = res.data?.variants;

      // 🔥 STEP 2: Pick first variant
      if (!variants || variants.length === 0) {
        alert("No variant available");
        return;
      }

      const variantId = variants[0].id;

      // 🔥 STEP 3: Add to cart
      await addToCartApi({
        productId: product.productId,
        variantId: variantId,
        quantity: 1
      });

      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      console.error(err);
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
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>

      </div>
    </div>
  );
}