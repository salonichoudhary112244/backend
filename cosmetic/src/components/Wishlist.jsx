import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWishlistApi, removeWishlistApi } from "../api/wishlistApi";
import { addToCartApi } from "../api/cartApi";
import { getStoredUser } from "../utils/auth";
import { MdShoppingCart, MdDelete } from "react-icons/md";
import "../styles/wishlist.css";

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

//   const addToCart = async (item) => {
//     await addToCartApi({
//       productId: item.productId,
//       variantId: item.variantId,
//       quantity: 1
//     });
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

const addToCart = async (item) => {
  const variantId =
    item.variantId ||
    item.variant?.id;

  if (!variantId) {
    alert("Variant not found");
    return;
  }

  await addToCartApi({
    productId: item.productId,
    variantId,
    quantity: 1
  });

  window.dispatchEvent(new Event("cartUpdated"));
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
