import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWishlistApi, removeWishlistApi } from "../api/wishlistApi";
import { addToCartApi } from "../api/cartApi";
import { getStoredUser } from "../utils/auth";
import { MdShoppingCart, MdDelete } from "react-icons/md";
import "../styles/wishlist.css";
import axiosInstance from "../api/axiosInstance";

export default function Wishlist() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [items, setItems] = useState([]);

  const loadWishlist = async () => {
    if (!user?.id) return;
    const res = await getWishlistApi(user.id);
    setItems(res.data);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const removeItem = async (productId) => {
    await removeWishlistApi(user.id, productId);
    loadWishlist();
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

const addToCart = async (item) => {
  try {
    // 🔥 STEP 1: product detail se variants lao
    const res = await axiosInstance.get(
      `/auth/products/${item.productId}/page`
    );

    const variants = res.data?.variants;

    if (!variants || variants.length === 0) {
      alert("Variant not found");
      return;
    }

    const variantId = variants[0].id; // ✅ FIRST VARIANT

    // 🔥 STEP 2: add to cart
    await addToCartApi({
      productId: item.productId,
      variantId,
      quantity: 1
    });

    // 🔥 STEP 3: wishlist se hatao
    await removeWishlistApi(user.id, item.productId);

    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("wishlistUpdated"));

    loadWishlist(); // UI refresh
  } catch (err) {
    console.error(err);
    alert("Failed to add to cart");
  }
};

  if (items.length === 0) {
    return <h3 className="empty-text">Your wishlist is empty 💔</h3>;
  }

  return (
    <div className="wishlist-page">
      <h2>My Wishlist</h2>

      <div className="wishlist-grid">
        {items.map(item => (
             console.log("WISHLIST ITEM:", item),
          <div key={item.productId} className="wishlist-card">

            <img
              src={item.imageUrl || "/no-image.png"}
              alt={item.productName}
              onClick={() => navigate(`/products/${item.productId}`)}
            />

            <h4>{item.productName}</h4>

<p>
  ₹{
    item?.sellingPrice ??
    item?.price ??
    item?.variant?.sellingPrice ??
    item?.variant?.price ??
    item?.variant?.prices?.sellingPrice ??
    "—"
  }
</p>


            <div className="wishlist-actions">
              <button onClick={() => addToCart(item)}>
                <MdShoppingCart /> Add to Cart
              </button>

              <button
                className="remove"
                onClick={() => removeItem(item.productId)}
              >
                <MdDelete /> Remove
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
