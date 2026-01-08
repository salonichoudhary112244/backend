import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useProduct } from "../../api/ProductContext";
import { Box, Button } from "@mui/material";

export default function CategoryBrandStep({ onNext }) {

  // 🔹 LOCAL INPUT STATE (category id typed by user)
  const [categoryIdInput, setCategoryIdInput] = useState("");

  const [breadcrumb, setBreadcrumb] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 GLOBAL PRODUCT CONTEXT
  const { productState, setProductState } = useProduct();

  // 🔹 Fetch breadcrumb from backend
  const fetchBreadcrumb = async () => {
    if (!categoryIdInput) {
      alert("Enter category id");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/auth/categories/breadcrumb/${categoryIdInput}`
      );

      setBreadcrumb(res.data);

    } catch (err) {
      alert("Invalid category ID");
      setBreadcrumb([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Confirm Category
  const handleConfirm = () => {
    if (breadcrumb.length === 0) {
      alert("Please select valid category");
      return;
    }

    // ✅ LAST CATEGORY = ACTUAL CATEGORY ID
    const selectedCategoryId =
      breadcrumb[breadcrumb.length - 1].id;

    // ✅ SAVE INTO PRODUCT CONTEXT (IMPORTANT)
    setProductState(prev => ({
      ...prev,
      categoryId: selectedCategoryId
    }));

    // (optional)
    localStorage.setItem(
      "selectedCategory",
      JSON.stringify(breadcrumb)
    );

    onNext();
  };

  return (
    <div>

      <h3>Select Category</h3>

      {/* Category ID input */}
      <input
        type="text"
        placeholder="Category ID"
        value={categoryIdInput}
        onChange={(e) => setCategoryIdInput(e.target.value)}
      />

      <br /><br />

      <button onClick={fetchBreadcrumb}>
        Preview Breadcrumb
      </button>

      {loading && <p>Loading...</p>}

      {/* Breadcrumb Preview */}
      {breadcrumb.length > 0 && (
        <>
          <h4>Breadcrumb Preview</h4>

          <div>
            {breadcrumb.map((cat, index) => (
              <span
                key={cat.id}
                style={{
                  marginRight: "8px",
                  padding: "6px",
                  border: "1px solid black",
                  background:
                    index === breadcrumb.length - 1
                      ? "#1976d2"
                      : "#eee",
                  color:
                    index === breadcrumb.length - 1
                      ? "white"
                      : "black"
                }}
              >
                {cat.name}
              </span>
            ))}
          </div>

          <Box sx={{ mt: 4 }}>
            <Button variant="contained" onClick={handleConfirm}>
              Confirm Category
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}