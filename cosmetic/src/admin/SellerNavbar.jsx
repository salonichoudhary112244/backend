// SellerNavbar.jsx
import "../styles/SellerPanel.css";

export default function SellerNavbar() {
  return (
    <div className="seller-navbar">
      <div className="seller-brand">
        🌸 <span>SALONI</span>
        <small>Seller Panel</small>
      </div>

      <div className="seller-search">
        <input placeholder="Search modules..." />
      </div>

      <div className="seller-profile">
        Priya Sharma ⌄
      </div>
    </div>
  );
}
