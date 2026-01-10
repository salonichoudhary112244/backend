import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {

  const navigate = useNavigate();

  // const imageUrl =
  //   product.images?.find(img => img.isPrimary)?.imageUrl ||
  //   product.images?.[0]?.imageUrl;

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product.productId}`)}
    >
      <img
         src={product.image || "/no-image.png"}
        // src={
        //   imageUrl
        //     ? `http://localhost:8080/${imageUrl}`
        //     : "/no-image.png"
        // }
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-brand">{product.brandName}</p>

        <div className="product-price">
          ₹{product.price}
        </div>
      </div>
    </div>
  );
}