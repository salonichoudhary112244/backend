
import { useEffect, useState } from "react";
import {
  getProductReviews,
  addReview,
  updateReview,
  deleteReview
} from "../../api/reviewApi";
import StarRating from "./StarRating";
import { getStoredUser } from "../../utils/auth";
import "../../styles/reviews/reviews.css";


export default function ProductReviews({ productId }) {
  const user = getStoredUser();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔁 load reviews on product change
  useEffect(() => {
    loadReviews();
  }, [productId]);

  // ✅ FINAL loadReviews (NO auto edit logic here)
  const loadReviews = async () => {
    const res = await getProductReviews(productId);
    setReviews(res.data || []);
  };

const submitReview = async () => {
  if (!user) return alert("Login first");
  if (!rating) return alert("Select rating");

  if (editingId) {
    await updateReview(productId, editingId, user.id, {
      rating,
      review: text,
    });
  } else {
    await addReview(productId, user.id, {
      rating,
      review: text,
    });
  }
    // 🔥 reset form after submit
  setRating(0);
  setText("");
  setEditingId(null);
  loadReviews();
};

  const handleEdit = (review) => {
    setRating(review.rating);
    setText(review.review);
    setEditingId(review.id);
  };
  
 // 🗑️ Delete
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete your review?")) return;
    await deleteReview(productId, reviewId, user.id);

    // reset form if same review deleted
    if (editingId === reviewId) {
      setRating(0);
      setText("");
      setEditingId(null);
    }
    loadReviews();
  };

  // old css
//   return (
//     <div style={{ marginTop: 40 }}>
//       <h3>Customer Reviews</h3>

//       {/* ⭐ Review Form */}
//       <StarRating value={rating} onChange={setRating} />
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Write your review..."
//         style={{ width: "100%", marginTop: 10 }}
//       />

//       <button onClick={submitReview} style={{ marginTop: 8 }}>
//         {editingId ? "Update Review" : "Submit Review"}
//       </button>

//       <hr />

//       {/* 🔽 Reviews List */}
//       {reviews.map((r) => (
//         <div key={r.id} style={{ marginBottom: 16 }}>
//           <StarRating value={r.rating} />
//           <p>{r.review}</p>

//           {/* ✏️🗑️ Buttons — sirf apna review */}
//           {user?.id === r.userId && (
//             <div style={{ display: "flex", gap: 10 }}>
//               <button onClick={() => handleEdit(r)}>Edit</button>
//               <button
//                 onClick={() => handleDelete(r.id)}
//                 style={{ color: "red" }}
//               >
//                 Delete
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

return (
  <div className="reviews-wrapper">

    <h3 className="reviews-title">Customer Reviews</h3>

    {/* REVIEW FORM CARD */}
    <div className="review-form-card">

      <div className="rating-row">
        <StarRating value={rating} onChange={setRating} />
      </div>

      <textarea
        className="review-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review..."
      />

      <button
        className="submit-review-btn"
        onClick={submitReview}
      >
        {editingId ? "Update Review" : "Submit Review"}
      </button>

    </div>

    <hr className="reviews-divider" />

    {/* REVIEWS LIST */}
    {reviews.map((r) => (
      <div key={r.id} className="single-review-card">

        <div className="review-header">
          <div className="review-avatar">
            {r.userName?.charAt(0) || "U"}
          </div>

          <div>
            <StarRating value={r.rating} />
            <p className="review-text">{r.review}</p>
          </div>
        </div>

        {user?.id === r.userId && (
          <div className="review-actions">
            <button
              className="edit-btn"
              onClick={() => handleEdit(r)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(r.id)}
            >
              Delete
            </button>
          </div>
        )}

      </div>
    ))}

  </div>
);
}