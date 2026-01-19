import { Link } from "react-router-dom";
import "../styles/saloni.css";
import Navbar from "./Navbar";



export default function SaloniHome() {
  return (
    <div className="saloni-container">

      {/* NAVBAR */}
        <Navbar />

      {/* HERO */}
<section className="hero-banner">
  {/* BACKGROUND IMAGE */}
 <img
  src="https://res.cloudinary.com/dbbqumrry/image/upload/v1767526216/copy_of_t3mas0pfqvz8mvgkcw89_3e4f9b.jpg"
  alt="Saloni Beauty"
  className="hero-bg"
/>


  {/* TEXT OVERLAY */}
  <div className="hero-overlay">
    <h1 className="hero-title">SALONI</h1>
    <p className="hero-subtitle">Crafted Beauty</p>
    
          {/* 👇 same page scroll */}
          <a href="/products" className="shop-btn hero-btn">
            Shop Now
          </a>
  </div>
</section>



      {/* RADIANT ESSENTIALS */}
      <section className="section">
        <h2>Radiant Essentials</h2>
        <p className="sub-text">Crafted Beauty for Modern Women</p>

        <div className="category-grid">
          <Category
            title="Skincare"
            img="https://res.cloudinary.com/dbbqumrry/image/upload/v1767529216/makeup_ddhwvy.png"
          />
          <Category
            title="Hair Care"
            img="https://res.cloudinary.com/dbbqumrry/image/upload/v1767529570/haircare_xy0rom.jpg"
          />
          <Category
            title="Makeup"
            img="https://res.cloudinary.com/dbbqumrry/image/upload/v1767529226/makeup2_glmhuh.png"
          />
        </div>
      </section>

      {/* DISCOVER */}
  <section className="discover-banner">
  <img
    src="https://res.cloudinary.com/dbbqumrry/image/upload/v1767529240/makeup3_c1iw9r.png"
    alt="Discover Glow"
    className="discover-bg"
  />

  <div className="discover-overlay">
    <h2>Discover Your Glow</h2>
    <p>Luxurious skincare crafted to enhance your natural beauty</p>
    <button className="shop-btn">Shop Skincare</button>
  </div>
</section>

      {/* ✅ BRAND STORY — YAHAN ADD KARNA THA */}
    <section className="brand-story">
  <h2>Why SALONI?</h2>
  <p className="brand-desc">
    Crafted with love, inspired by nature, and designed for women
    who believe beauty begins with self-care.
  </p>

  <div className="story-grid">
    <div className="story-card">
      <img
        src="https://res.cloudinary.com/dbbqumrry/image/upload/v1767533183/clean-ingredians_qpwnvd.jpg"
        alt="Clean Ingredients"
      />
      <h4>Clean Ingredients</h4>
      <span>Gentle • Safe • Natural</span>
    </div>

    <div className="story-card">
      <img
        src="https://res.cloudinary.com/dbbqumrry/image/upload/v1767533205/primium-quality_wtnjqz.jpg"
        alt="Premium Quality"
      />
      <h4>Premium Quality</h4>
      <span>Luxury • Trusted</span>
    </div>

    <div className="story-card">
      <img
        src="https://res.cloudinary.com/dbbqumrry/image/upload/v1767533190/curly-free_irbdd3.jpg"
        alt="Cruelty Free"
      />
      <h4>Cruelty Free</h4>
      <span>Ethical Beauty</span>
    </div>

    <div className="story-card">
      <img
        src="https://res.cloudinary.com/dbbqumrry/image/upload/v1767533214/dermitologist_qnyf05.jpg"
        alt="Dermatologically Tested"
      />
      <h4>Dermatologically Tested</h4>
      <span>Safe for All Skin</span>
    </div>
  </div>
</section>


  {/* BEST SELLERS */}
<section className="best-sellers">
  <h2 className="best-title">Best Sellers</h2>

  <div className="best-grid">
    <div className="best-card">
      <img
        src="https://res.cloudinary.com/dbbqumrry/image/upload/v1767531926/glow-serium_p2gfci.jpg"
        alt="Glow Serum"
      />
      <p>Glow Serum</p>
    </div>

    <div className="best-card">
      <img
        src="https://res.cloudinary.com/dbbqumrry/image/upload/v1767531942/rose-cream_dziw6d.jpg"
        alt="Rose Cream"
      />
      <p>Rose Cream</p>
    </div>

    <div className="best-card">
      <img
        src="https://res.cloudinary.com/dbbqumrry/image/upload/v1767531934/lipstic_gdz7s7.jpg"
        alt="Luxury Lipstick"
      />
      <p>Luxury Lipstick</p>
    </div>
  </div>
</section>

{/* 
footer ke liye */}

<footer className="footer">

<div className="footer-grid">

{/* BRAND */}
<div className="footer-brand"> 
  <h2>SALONI</h2>
   <p>
Crafted Beauty for every glow ✨ <br /> 
Skincare & cosmetics made with love.
     </p> 
</div>

{/* QUICK LINKS */}
<div className="footer-links">
   <h4>Quick Links</h4>
    <a href="/">Home</a>
     <a href="/products">Shop</a>
      <a href="/wishlist">Wishlist</a> 
      <a href="/cart">Cart</a> 
</div>

{/* CATEGORIES */}
<div className="footer-links"> 
  <h4>Customer Care</h4>
   <a href="#">Help Center</a>
    <a href="#">Shipping Policy</a>
     <a href="#">Returns & Refunds</a> 
     <a href="#">Privacy Policy</a> 
</div>
{/* NEWSLETTER + SOCIAL */}
 <div className="footer-newsletter">
   <h4>Stay Beautiful ✨</h4>
    <p>Subscribe for exclusive beauty tips</p>
     <input type="email" placeholder="Your email" /> 
     <button>Subscribe</button> 
     {/* 🌸 SOCIAL ICONS – YAHI ADD HONGE */} 
     <div className="footer-social"> 
      <a href="#" aria-label="Instagram"> 
        <i className="fab fa-instagram"></i>
         </a> 
         <a href="#" aria-label="YouTube"> 
          <i className="fab fa-youtube"></i> </a>
           </div> 
           </div> 
</div>

  <div className="footer-bottom">
    © 2025 SALONI – Crafted Beauty. All rights reserved.
  </div>
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
