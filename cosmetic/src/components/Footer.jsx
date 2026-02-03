import "../styles/saloni.css";
 import { Link } from "react-router-dom";

export default function Footer() {
  return (
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

        {/* CUSTOMER CARE */}
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

          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 SALONI – Crafted Beauty. All rights reserved.
      </div>

    </footer>
  );
}
