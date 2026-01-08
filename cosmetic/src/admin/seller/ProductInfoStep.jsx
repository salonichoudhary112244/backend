import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";

import { useProduct } from "../../services/ProductContext";
import axiosInstance from "../../utils/axiosInstance";

export default function ProductInfoStep({ onNext }) {

  const { productState, setProductState } = useProduct();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: ""
  });

  // 🔹 handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 submit product info
  const handleSubmit = async () => {

    if (!form.name || !form.slug || !form.description) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "http://localhost:8080/auth/products",
        {
          name: form.name,
          slug: form.slug,
          description: form.description,
          categoryId: productState.categoryId,
          brandId: productState.brandId
        }
      );

      // 🔹 save productId + slug for next steps
      setProductState({
        ...productState,
        productId: res.data.id,
        slug: res.data.slug
      });

      onNext(); // go to next step
    } catch (err) {
      alert("Product creation failed");
    }
  };

  return (
    <Box>

      <Typography variant="h5" gutterBottom>
        Product Information
      </Typography>

      <TextField
        label="Product Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 3 }}
      />

      <TextField
        label="Slug (URL-friendly)"
        name="slug"
        value={form.slug}
        onChange={handleChange}
        helperText="URL friendly name (e.g. samsung-led-tv)"
        fullWidth
        sx={{ mb: 3 }}
      />

      <TextField
        label="Product Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        sx={{ mb: 4 }}
      />

      {/* 🔒 SAME AS IMAGE */}
      <Button
        variant="contained"
        onClick={handleSubmit}
      >
        Save & Continue
      </Button>

    </Box>
  );
}