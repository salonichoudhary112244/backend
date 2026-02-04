

import { useNavigate } from "react-router-dom";
import { addToCartApi } from "../../api/cartApi";
//import { getStoredUser } from "../../utils/auth";

import { Button, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";

export default function ProductBuyBox({ variant ,productId}) {
    const navigate = useNavigate();

//   //add to cart ke liye
const handleAddToCart = async () => {

if (!productId || !variant?.id) {
  alert("Invalid variant");
  return;
}

    try {
   await addToCartApi({
  productId,
  variantId: variant.id,    
  quantity: 1
});
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error(err);
    navigate("/login");
  }
};

  return (
    // <div className="product-buy-box">
    //   <button className="add-cart"onClick={handleAddToCart}>Add to Cart</button>
    //   <button className="buy-now">Buy Now</button>
    // </div>
     <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
      <Button
        variant="outlined"
        startIcon={<ShoppingCartIcon />}
        onClick={handleAddToCart}
        sx={{
          flex: 1,
          borderRadius: "999px",
          borderColor: "#e91e63",
          color: "#e91e63",
          textTransform: "none",
          fontWeight: 600,
          padding: "12px 16px",
          "&:hover": {
            borderColor: "#d81b60",
            backgroundColor: "rgba(233,30,99,0.05)",
          },
        }}
      >
        Add to Cart
      </Button>

      <Button
        variant="contained"
        startIcon={<FlashOnIcon />}
        sx={{
          flex: 1,
          borderRadius: "999px",
          background: "linear-gradient(135deg, #e91e63, #ad1457)",
          textTransform: "none",
          fontWeight: 600,
          padding: "12px 16px",
          "&:hover": {
            background: "linear-gradient(135deg, #d81b60, #880e4f)",
          },
        }}
      >
        Buy Now
      </Button>
    </Stack>
  );
}
