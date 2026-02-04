
//old css

// import { useEffect, useState } from "react";
// import { getRatingSummary } from "../../api/reviewApi";

// export default function ProductHeader({ product }) {

  
//   // ⭐ rating state
//   const [rating, setRating] = useState(0);
//   const [totalReviews, setTotalReviews] = useState(0);

//   // ⭐ load rating
//   useEffect(() => {
//     const loadRating = async () => {
//       try {
//         const res = await getRatingSummary(product.productId);
//         setRating(res.data.averageRating || 0);
//         setTotalReviews(res.data.totalReviews || 0);
//       } catch (err) {
//         setRating(0);
//         setTotalReviews(0);
//       }
//     };

//     if (product?.productId) {
//       loadRating();
//     }
//   }, [product?.productId]);

//   // ⭐ star UI
//   const renderStars = (value) => {
//     const fullStars = Math.floor(value);
//     return (
//       <span style={{ color: "#f5a623", fontSize: "16px" }}>
//         {"★".repeat(fullStars)}
//         {"☆".repeat(5 - fullStars)}
//       </span>
//     );
//   };


//   return (
//     <div className="product-header">
//       <h1 className="product-title">{product.name}</h1>
//       <p className="product-brand">Brand: {product.brandName}</p>
// {/* 
//       <div className="product-rating">
//         ⭐⭐⭐⭐☆ <span>(123 ratings)</span>
//       </div> */}

//             {/* ⭐ Rating just below brand */}
//       {totalReviews > 0 && (
//         <div className="product-rating" style={{ marginTop: 6 }}>
//           {renderStars(rating)}
//           <span style={{ marginLeft: 8, fontSize: 14, color: "#555" }}>
//             {rating.toFixed(1)} ({totalReviews} ratings)
//           </span>
//         </div>
//       )}

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { getRatingSummary } from "../../api/reviewApi";

export default function ProductHeader({ product }) {

  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const loadRating = async () => {
      try {
        const res = await getRatingSummary(product.productId);
        setRating(res.data.averageRating || 0);
        setTotalReviews(res.data.totalReviews || 0);
      } catch {
        setRating(0);
        setTotalReviews(0);
      }
    };

    if (product?.productId) {
      loadRating();
    }
  }, [product?.productId]);

  const renderStars = (value) => {
    const fullStars = Math.floor(value);
    return (
      <span className="stars">
        {"★".repeat(fullStars)}
        {"☆".repeat(5 - fullStars)}
      </span>
    );
  };

  return (
    <div className="product-header-nykaa">
      <div className="title-row">
        <h1>{product.name}</h1>
      </div>

      <p className="brand-line">Brand: {product.brandName}</p>

      {totalReviews > 0 && (
        <div className="rating-line">
          {renderStars(rating)}
          <span> {rating.toFixed(1)} ({totalReviews} ratings)</span>
        </div>
      )}
    </div>
  );
}
