import { Link ,useNavigate,NavLink} from "react-router-dom";
import {useState,useEffect} from "react";
import { MdSpa ,MdShoppingCart,MdFavoriteBorder   } from "react-icons/md";   // ✅ ADD THIS
import { getCartApi  } from "../api/cartApi";
import { getWishlistApi } from "../api/wishlistApi";
import { getStoredUser } from "../utils/auth";
import "../styles/saloni.css";
import "../styles/navbar.css";
import { MdMoreVert } from "react-icons/md";
import {
  MdPerson,
  MdShoppingBag,
  MdStore,
  MdAdminPanelSettings,
  MdLogout
} from "react-icons/md";
import { MdListAlt } from "react-icons/md";

import { useRef } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);//menu 
const menuRef = useRef();
const [wishlistCount, setWishlistCount] = useState(0);


  // 🔹 LOAD USER FROM LOCAL STORAGE hii logout system
useEffect(() => {
  const storedUser = getStoredUser();
  if (storedUser) {
    setUser(storedUser);//user set
  }
}, []);


//   /* 🔹 LOGOUT */ button
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

// 🔹 OUTSIDE CLICK → CLOSE MENU
useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


//   const navClass = ({ isActive }) =>
//     `nav-link ${isActive ? "active" : ""}`;


useEffect(() => {
  const user = getStoredUser();
  if (!user?.id) return;

  const loadCounts = async () => {
    try {
       const cartRes = await getCartApi();
      const wishRes = await getWishlistApi(user.id);
      // 🔥 UNIQUE ITEMS COUNT

      setCartCount(cartRes.data.length);     // unique cart items
      setWishlistCount(wishRes.data.length); // wishlist count
    } catch (e) {
      console.error("Cart count error", e);
    }
  };


  loadCounts();

  window.addEventListener("cartUpdated", loadCounts);
  window.addEventListener("wishlistUpdated", loadCounts);

  return () => {
    window.removeEventListener("cartUpdated", loadCounts);
    window.removeEventListener("wishlistUpdated", loadCounts);
  };
}, []);

  return (
    <nav className="saloni-navbar">
      {/* BRAND */}
      <div className="brand">
        <Link to="/" className="brand-link">
          <MdSpa className="saloni-icon hair-flow" />
          <span className="brand-name">SALONI</span>
        </Link>
        <span className="tagline">Crafted Beauty</span>
      </div>

      {/* MENU */}
      <ul className="nav-menu">
         <li>
    <Link to="/products" className="nav-link">Shop</Link>
  </li>
        <li>Skincare</li>
        <li>Hair Care</li>
        <li>Makeup</li>
      </ul>

        <div className="seller-search">
        <input placeholder="Search " />
      </div>
      
      {/* cart */}

<div
  className="cart-icon"
  onClick={() => navigate("/cart")}
>
  <MdShoppingCart size={22} />
  {cartCount > 0 && (
    <span className="cart-badge">{cartCount}</span>
  )}
</div>


{/* ❤️ WISHLIST */}
<div
  className="cart-icon"
  onClick={() => navigate("/wishlist")}
>
  <MdFavoriteBorder size={22} />
  {wishlistCount > 0 && (
    <span className="cart-badge">{wishlistCount}</span>
  )}
</div>


{/* MORE MENU */}
<div className="more-menu" ref={menuRef}>
  <MdMoreVert
    size={24}
    className="more-icon"
    onClick={() => setShowMenu(!showMenu)}
  />

  {showMenu && (
    <div className="more-dropdown">

      {/* USER NAME */}
      <div className="menu-user">
        Hi, {user?.name}
      </div>

      <p onClick={() => navigate("/profile")}>
        <MdPerson /> My Profile
      </p>

      <p onClick={() => navigate("/my-orders")}>
        <MdShoppingBag /> My Orders
      </p>

      <p onClick={() => navigate("/wishlist")}>
        <MdFavoriteBorder /> Wishlist
      </p>

      <p onClick={() => navigate("/cart")}>
        <MdShoppingCart /> Cart
      </p>
<p onClick={() => navigate("/seller-product-create")}>
  <MdStore /> Seller Panel
</p>

<p onClick={() => navigate("/admin")}>
  <MdAdminPanelSettings /> Admin Panel
</p>

<p onClick={() => navigate("/admin/orders")}>
  <MdListAlt /> Admin Orders
</p>

      {/* SELLER ONLY */}
      {/* {user?.role === "SELLER" && (
        <p onClick={() => navigate("/seller-product-create")}>
          <MdStore /> Seller Panel
        </p>
      )} */}

      {/* ADMIN ONLY */}
    {/* {user?.role === "ADMIN" && (
  <>
    <p onClick={() => navigate("/admin")}>
      <MdAdminPanelSettings /> Admin Panel
    </p>

    <p onClick={() => navigate("/admin/orders")}>
      <MdListAlt /> Admin Orders
    </p>
  </>
)} */}


      <hr />

      <p className="logout-text" onClick={handleLogout}>
        <MdLogout /> Logout
      </p>
    </div>
  )}
</div>




 {/* RIGHT LINKS */}
        <div className="nav-right d-none d-md-flex">

          {user ? (
            <>
              {/* <span className="user-name">
                Hi, {user.name}
              </span>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button> */}
            </>
          ) 
          :
           (
            <>
              <NavLink to="/login" className="signin-btn">Login</NavLink>
              <NavLink to="/register" className="register-btn">Register</NavLink>
            </>
          )}

          {/* CART ICON */}
          {/* <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton> */}
        </div>

      {/* AUTH
      <div className="auth-buttons">
        <Link to="/login" className="signin-btn">Sign in</Link>
        <Link to="/register" className="register-btn">Register</Link>
      </div> */}
    </nav>
  );
}
