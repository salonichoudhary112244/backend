import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Divider
} from "@mui/material";
import { useProduct } from "../../api/ProductContext";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/SellerPanel.css"

export default function VariantPricingStep({ onNext }) {
  const { productState } = useProduct();
  const productId = productState.productId;

  const [variants, setVariants] = useState([]);   // ✅ LOCAL STATE
  const [variantId, setVariantId] = useState("");

  const [priceForm, setPriceForm] = useState({
    mrp: "",
    sellingPrice: ""
  });

  const [discountForm, setDiscountForm] = useState({
    discountType: "PERCENT",
    discountValue: ""
  });

  const [pricingPreview, setPricingPreview] = useState(null);

  /* 🔹 LOAD VARIANTS FROM BACKEND (MAIN FIX) */
  useEffect(() => {
    if (!productId) return;

    axiosInstance
      .get(`/auth/products/${productId}/variants`)
      .then(res => setVariants(res.data))
      .catch(() => alert("Failed to load variants"));
  }, [productId]);

  /* 🔹 LOAD PRICING */
  useEffect(() => {
    if (!variantId) return;
    loadPricing();
  }, [variantId]);

  const loadPricing = async () => {
    const res = await axiosInstance.get(
      `/auth/variants/${variantId}/pricing`
    );

    setPricingPreview(res.data);

    if (res.data) {
      setPriceForm({
        mrp: res.data.mrp || "",
        sellingPrice: res.data.sellingPrice || ""
      });

      setDiscountForm(prev => ({
        ...prev,
        discountValue: res.data.discount || ""
      }));
    }
  };

  const savePrice = async () => {
    await axiosInstance.post(
      `/auth/variants/${variantId}/pricing/price`,
      {
        mrp: Number(priceForm.mrp),
        sellingPrice: Number(priceForm.sellingPrice)
      }
    );
    loadPricing();
  };

  const saveDiscount = async () => {
    await axiosInstance.post(
      `/auth/variants/${variantId}/pricing/discount`,
      {
        discountType: discountForm.discountType,
        discountValue: Number(discountForm.discountValue)
      }
    );
    loadPricing();
  };

  return (
    <Box className="pricing-container">
      <Typography variant="h5" className="pricing-title" gutterBottom>
        Variant Pricing & Discount
      </Typography>

      {/* ✅ VARIANT DROPDOWN NOW WORKS */}
      <TextField
        select
        className="variant-select"
        label="Select Variant"
        value={variantId}
        onChange={e => setVariantId(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      >
        {variants.map(v => (
          <MenuItem key={v.id} value={v.id}>
            {v.sku}
          </MenuItem>
        ))}
      </TextField>

      {variantId && (
        <>
          <Typography className="pricing-section-title" fontWeight="bold">Base Pricing</Typography>

          <Box className="pricing-row" sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              label="MRP"
              value={priceForm.mrp}
              onChange={e =>
                setPriceForm({ ...priceForm, mrp: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Selling Price"
              value={priceForm.sellingPrice}
              onChange={e =>
                setPriceForm({
                  ...priceForm,
                  sellingPrice: e.target.value
                })
              }
              fullWidth
            />
          </Box>

          <Button className="pricing-btn" sx={{ mt: 2 }} variant="contained" onClick={savePrice}>
            Save Price
          </Button>

          <Divider className="pricing-divider" sx={{ my: 4 }} />

          <Typography className="pricing-section-title" fontWeight="bold">Discount</Typography>

          <Box  className="pricing-row" sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              select
              label="Discount Type"
              value={discountForm.discountType}
              onChange={e =>
                setDiscountForm({
                  ...discountForm,
                  discountType: e.target.value
                })
              }
              fullWidth
            >
              <MenuItem value="PERCENT">Percentage (%)</MenuItem>
              <MenuItem value="FLAT">Flat (₹)</MenuItem>
            </TextField>

            <TextField
              label="Discount Value"
              value={discountForm.discountValue}
              onChange={e =>
                setDiscountForm({
                  ...discountForm,
                  discountValue: e.target.value
                })
              }
              fullWidth
            />
          </Box>

          <Button className="pricing-btn discount-btn" sx={{ mt: 2 }} variant="contained" onClick={saveDiscount}>
            Apply Discount
          </Button>

          {pricingPreview && (
            <Box className="pricing-preview" sx={{ mt: 4 }}>
              <Typography variant="h6">Pricing Preview</Typography>
 <Typography>
        Final Price: <span>₹{pricingPreview.finalPrice}</span>
      </Typography>            </Box>
          )}

          <Box className="pricing-footer" sx={{ mt: 4 }}>
            <Button variant="outlined" onClick={onNext}>
              Continue
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}