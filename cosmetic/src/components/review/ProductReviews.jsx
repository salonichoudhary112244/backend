// import { useEffect, useState } from "react";
// import { getProductReviews, addReview } from "../../api/reviewApi";
// import StarRating from "./StarRating";
// import { getStoredUser } from "../../utils/auth";

// export default function ProductReviews({ productId }) {
//   const user = getStoredUser();

//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [text, setText] = useState("");
//   const [editing, setEditing] = useState(false);

//   useEffect(() => {
//     loadReviews();
//   }, [productId]);

//   const loadReviews = async () => {
//     const res = await getProductReviews(productId);
//     setReviews(res.data || []);

//     if (user) {
//       const myReview = res.data.find(r => r.userId === user.id);
//       if (myReview) {
//         setRating(myReview.rating);
//         setText(myReview.review);
//         setEditing(true);
//       }
//     }
//   };

//   const submitReview = async () => {
//     if (!user) return alert("Login first");
//     if (!rating) return alert("Select rating");

//     await addReview(productId, user.id, {
//       rating,
//       review: text,
//     });

//     loadReviews();
//   };

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

//       <button onClick={submitReview}>
//         {editing ? "Update Review" : "Submit Review"}
//       </button>

//       <hr />

//       {/* 🔽 Reviews List */}
//       {reviews.map((r) => (
//         <div key={r.id} style={{ marginBottom: 15 }}>
//           <StarRating value={r.rating} />
//           <p>{r.review}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
























import { useEffect, useState } from "react";
import {
  getProductReviews,
  addReview,
  updateReview,
  deleteReview
} from "../../api/reviewApi";
import StarRating from "./StarRating";
import { getStoredUser } from "../../utils/auth";

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

    // if (user) {
    //   const myReview = res.data.find(r => r.userId === user.id);
    //   if (myReview) {
    //     setRating(myReview.rating);
    //     setText(myReview.review);
    //     setEditingId(myReview.id);
    //   }
    // }
  };

  // const submitReview = async () => {
  //   if (!user) return alert("Login first");
  //   if (!rating) return alert("Select rating");

  //   if (editingId) {
  //     // ✏️ UPDATE
  //     await updateReview(productId, editingId, user.id, {
  //       rating,
  //       review: text,
  //     });
  //   } else {
  //     // ➕ ADD
  //     await addReview(productId, user.id, {
  //       rating,
  //       review: text,
  //     });
  //   }

  //   loadReviews();
  // };



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

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Customer Reviews</h3>

      {/* ⭐ Review Form */}
      <StarRating value={rating} onChange={setRating} />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review..."
        style={{ width: "100%", marginTop: 10 }}
      />

      <button onClick={submitReview} style={{ marginTop: 8 }}>
        {editingId ? "Update Review" : "Submit Review"}
      </button>

      <hr />

      {/* 🔽 Reviews List */}
      {reviews.map((r) => (
        <div key={r.id} style={{ marginBottom: 16 }}>
          <StarRating value={r.rating} />
          <p>{r.review}</p>

          {/* ✏️🗑️ Buttons — sirf apna review */}
          {user?.id === r.userId && (
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => handleEdit(r)}>Edit</button>
              <button
                onClick={() => handleDelete(r.id)}
                style={{ color: "red" }}
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
