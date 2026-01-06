export default function ProductCard({ image, name }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <button className="add-btn">Add to Bag</button>
    </div>
  );
}
