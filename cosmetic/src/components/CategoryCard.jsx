import "../styles/saloni.css";

export default function Category({ title, img }) {
  return (
    <div className="category-card">
      <img src={img} alt={title} />
      <h3>{title}</h3>
    </div>
  );
}
