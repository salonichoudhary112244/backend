export default function ProductPricing({ variant }) {
  if (!variant) return null;

  return (
    <div className="product-pricing">
      <h2 className="price">₹{variant.price}</h2>
      <p className="stock">
        {variant.stock > 0 ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
}