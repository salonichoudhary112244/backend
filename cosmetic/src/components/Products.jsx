import "../styles/products.css";
import ProductCard from "./ProductCard";

export default function Products() {
  return (
    <section className="products-section">
      <h2 className="products-title">All Products</h2>

      <div className="products-grid">
        <ProductCard
          name="Glow Serum"
          image="https://res.cloudinary.com/dbbqumrry/image/upload/v1767532001/glow_serum.png"
        />

        <ProductCard
          name="Rose Cream"
          image="https://res.cloudinary.com/dbbqumrry/image/upload/v1767532001/rose_cream.png"
        />

        <ProductCard
          name="Luxury Lipstick"
          image="https://res.cloudinary.com/dbbqumrry/image/upload/v1767532001/lipstick.png"
        />

        <ProductCard
          name="Hair Care"
          image="https://res.cloudinary.com/dbbqumrry/image/upload/v1767532001/hair_care.png"
        />
      </div>
    </section>
  );
}
