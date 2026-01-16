import { useNavigate } from "react-router-dom";
import { addToCartApi } from "../api/cartApi";
import { addToWishlistApi } from "../api/wishlistApi";
import { getStoredUser } from "../utils/auth";
import axiosInstance from "../api/axiosInstance";
import { MdFavoriteBorder, MdFavorite, MdShoppingCart } from "react-icons/md";
import { getWishlistApi } from "../api/wishlistApi";

import { useState, useEffect } from "react";

export default function ProductCard({ product }) {

  const navigate = useNavigate();

//wishlist
    const user = getStoredUser();
const [isWishlisted, setIsWishlisted] = useState(false);

  const addWishlist = async (e) => {
    e.stopPropagation();
    await addToWishlistApi({
      userId: user.id,
      productId: product.productId
    });
    window.dispatchEvent(new Event("wishlistUpdated"));
  };
    const addCart = async (e) => {
    e.stopPropagation();
    await addToCartApi({
      productId: product.productId,
      variantId: product.defaultVariantId,
      quantity: 1
    });
    window.dispatchEvent(new Event("cartUpdated"));
  };

useEffect(() => {
  const checkWishlist = async () => {
    if (!user?.id) return;

    const res = await getWishlistApi(user.id);
    const exists = res.data.some(
      (item) => item.productId === product.productId
    );
    setIsWishlisted(exists);
  };

  checkWishlist();
}, []);

const toggleWishlist = async (e) => {
  e.stopPropagation();

  if (!user) {
    navigate("/login");
    return;
  }

  if (isWishlisted) {
    await removeWishlistApi(user.id, product.productId);
    setIsWishlisted(false);
  } else {
    await addToWishlistApi({
      userId: user.id,
      productId: product.productId
    });
    setIsWishlisted(true);
  }

  window.dispatchEvent(new Event("wishlistUpdated"));
};


  //pehle
  const imageSrc = product.imageUrl
    ? product.imageUrl   // Cloudinary URL already full
    : "/no-image.png";
// add to cart ke liye 
const handleAddToCart = async (e) => {
  e.stopPropagation();
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
       onClick={() => navigate
        (`/products/${product.productId}`)}
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
{/* 
//wishlist */}
      <div className="card-actions">
  <span onClick={toggleWishlist}>
    {isWishlisted ? (
      <MdFavorite color="#e91e63" />
    ) : (
      <MdFavoriteBorder />
    )}
  </span>

  <MdShoppingCart onClick={addCart} />
</div>

    </div>
  );
}