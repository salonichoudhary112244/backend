import { Link } from "react-router-dom";
import "../styles/saloni.css";
import Navbar from "./Navbar";
import heroImage from "../assets/saloni-hero.png";


export default function SaloniHome() {
  return (
    <div className="saloni-container">

      {/* NAVBAR */}
        <Navbar />

      {/* HERO */}
<section className="hero-banner">
  {/* BACKGROUND IMAGE */}
 <img
  src={heroImage}
  alt="Saloni Beauty"
  className="hero-bg"
/>


  {/* TEXT OVERLAY */}
  <div className="hero-overlay">
    <h1 className="hero-title">SALONI</h1>
    <p className="hero-subtitle">Crafted Beauty</p>
    <Link to="/register" className="shop-btn hero-btn">
      Shop Now
    </Link>
  </div>
</section>



      {/* RADIANT ESSENTIALS */}
      <section className="section">
        <h2>Radiant Essentials</h2>
        <p className="sub-text">Crafted Beauty for Modern Women</p>

        <div className="category-grid">
          <Category
            title="Skincare"
            img="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd"
          />
          <Category
            title="Hair Care"
            img="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
          />
          <Category
            title="Makeup"
            img="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
          />
        </div>
      </section>

      {/* DISCOVER */}
      <section className="discover">
        <div className="discover-text">
          <h2>Discover Your Glow</h2>
          <p>
            Luxurious skincare crafted to enhance your natural beauty
          </p>
          <button className="shop-btn">Shop Skincare</button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1585232351009-aa87416fca90"
          alt="Product"
        />
      </section>

      {/* ✅ BRAND STORY — YAHAN ADD KARNA THA */}
      <section className="brand-story">
        <h2>Why SALONI?</h2>
        <p>
          Crafted with love, inspired by nature, and designed
          for women who believe beauty begins with self-care.
        </p>

        <div className="story-grid">
          <div>🌸 Clean Ingredients</div>
          <div>💎 Premium Quality</div>
          <div>🐰 Cruelty Free</div>
          <div>✨ Dermatologically Tested</div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section">
        <h2>Best Sellers</h2>

        <div className="product-grid">
          <Product name="Glow Serum" />
          <Product name="Rose Cream" />
          <Product name="Luxury Lipstick" />
        </div>
      </section>

      <footer className="footer">
        © 2025 SALONI – Crafted Beauty
      </footer>
    </div>
  );
}

function Category({ title, img }) {
  return (
    <div className="category-card">
      <img src={img} alt={title} />
      <h3>{title}</h3>
    </div>
  );
}

function Product({ name }) {
  return (
    <div className="product-card">
      <div className="product-img"></div>
      <h4>{name}</h4>
      <button>Add to Bag</button>
    </div>
  );
}
