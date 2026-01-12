export default function ProductHeader({ product }) {
  return (
    <div className="product-header">
      <h1 className="product-title">{product.name}</h1>
      <p className="product-brand">Brand: {product.brandName}</p>

      <div className="product-rating">
        ⭐⭐⭐⭐☆ <span>(123 ratings)</span>
      </div>
    </div>
  );
}