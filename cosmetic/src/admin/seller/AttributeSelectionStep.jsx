import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from "@mui/material";

import axiosInstance from "../../api/axiosInstance";
import { useProduct } from "../../api/ProductContext";

export default function AttributeSelectionStep({ onNext }) {

  const { productState } = useProduct(); // productId yahin se aayega

  const [attributes, setAttributes] = useState([]);
  const [selected, setSelected] = useState([]);

  /* ---------------- FETCH ATTRIBUTES ---------------- */
  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      const res = await axiosInstance.get("/auth/attributes");
      setAttributes(res.data);
    } catch (err) {
         console.error("Load attributes error:", err.response?.status);
      alert("Failed to load attributes");
    }
  };

  /* ---------------- TOGGLE ---------------- */
  const toggleAttribute = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    if (selected.length === 0) {
      alert("Select at least one attribute");
      return;
    }

    if (!productState.productId) {
      alert("Product ID not found");
      return;
    }

    try {
      await axiosInstance.post(
        `/auth/products/${productState.productId}/attributes`,
        {
       attributeIds: selected   // 👈 backend expects List<Long>
        }
      );

      onNext();
    } catch (err) {
      console.error("Assign attribute error:", err.response?.data);
      console.error("Status:", err.response?.status);
      alert("Failed to assign attribute");
    }
  };

  return (
    <Box>

      <Typography variant="h5" gutterBottom>
        Select Attributes
      </Typography>

      <FormGroup>
        {attributes.map((attr) => (
          <FormControlLabel
            key={attr.id}
            control={
              <Checkbox
                checked={selected.includes(attr.id)}
                onChange={() => toggleAttribute(attr.id)}
              />
            }
            label={attr.name}
          />
        ))}
      </FormGroup>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handleSave}>
          Save & Continue
        </Button>
      </Box>

    </Box>
  );
}