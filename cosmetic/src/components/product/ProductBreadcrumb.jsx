import { Link } from "react-router-dom";

export default function ProductBreadcrumb({ product }) {
  if (!product) return null;

  return (
    <div className="product-breadcrumb">
      <Link to="/">Home</Link>
      <span> / </span>

      {product.categoryName && (
        <>
          <Link to={`/category/${product.categorySlug || "#"}`}>
            {product.categoryName}
          </Link>
          <span> / </span>
        </>
      )}

      <span className="current">{product.name}</span>
    </div>
  );
}
