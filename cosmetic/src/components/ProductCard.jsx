import { useNavigate } from "react-router-dom";
import { addToCartApi } from "../api/cartApi";
import { getStoredUser } from "../utils/auth";
import axiosInstance from "../api/axiosInstance";

import { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder, MdShoppingCart } from "react-icons/md";
import { addToWishlistApi, removeWishlistApi, getWishlistApi } from "../api/wishlistApi";
import { getRatingSummary } from "../api/reviewApi";

export default function ProductCard({ product }) {

  const navigate = useNavigate();

//wishlist
  const [wishlisted, setWishlisted] = useState(false);
const user = getStoredUser();

// ⭐ rating
const [rating, setRating] = useState(0);
const [totalReviews, setTotalReviews] = useState(0);

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
    setWishlisted(exists);
  };

  checkWishlist();
}, []);

useEffect(() => {
  const loadRating = async () => {
    try {
      const res = await getRatingSummary(product.productId);
      setRating(res.data.averageRating || 0);
      setTotalReviews(res.data.totalReviews || 0);
    } catch (err) {
      setRating(0);
      setTotalReviews(0);
    }
  };

  loadRating();
}, [product.productId]);


const toggleWishlist = async (e) => {
  e.stopPropagation();

  if (!user?.id) {
    navigate("/login");
    return;
  }

  if (wishlisted) {
    await removeWishlistApi(user.id, product.productId);
    setWishlisted(false);
  } else {
    await addToWishlistApi({
      userId: user.id,
      productId: product.productId,
    });
    setWishlisted(true);
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

  const renderStars = (value) => {
  const fullStars = Math.floor(value);
  return (
    <span style={{ color: "#f5a623", fontSize: "14px" }}>
      {"★".repeat(fullStars)}
      {"☆".repeat(5 - fullStars)}
    </span>
  );
};

  return (
    <div
      className="product-card"
       onClick={() => navigate
        (`/products/${product.productId}`)}
    >
      {/* <img
         src={imageSrc }
        alt={product.name}
        className="product-image"
      /> */}

<div className="product-image-wrapper">
  <img
    src={imageSrc}
    alt={product.name}
    className="product-image"
  />
</div>

      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-brand">{product.brandName}</p>

        <div className="product-price">
          ₹{product.price}
        </div>

{/* ⭐ RATING */}
{totalReviews > 0 && (
  <div className="product-rating">
    {renderStars(rating)}
    <span style={{ marginLeft: 6, fontSize: 13, color: "#555" }}>
      {rating.toFixed(1)} ({totalReviews})
    </span>
  </div>
)}


      <button className="addToCartBtn"  onClick={handleAddToCart}>
        Add to Cart
      </button>
      </div>
{/* 
//wishlist */}
 <div className="card-actions">
  {wishlisted ? (
    <MdFavorite color="#e91e63" onClick={toggleWishlist} />
  ) : (
    <MdFavoriteBorder onClick={toggleWishlist} />
  )}

  <MdShoppingCart onClick={addCart} />
</div>


    </div>
  );
}