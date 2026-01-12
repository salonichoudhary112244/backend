export default function ProductBuyBox({ variant }) {
  if (!variant) return null;

  return (
    <div className="product-buy-box">
      <button className="add-cart">Add to Cart</button>
      <button className="buy-now">Buy Now</button>
    </div>
  );
}
