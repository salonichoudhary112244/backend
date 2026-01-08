import React, { useState } from "react";
import CreateProductLayout from "../pages/seller/CreateProductLayout";
import { useProduct } from "../services/ProductContext";
import "../styles/SellerPanel.css";

/* 🔐 STEP ACCESS CONTROL */
const canAccessStep = (stepIndex, productState) => {
  if (stepIndex > 0 && !productState.categoryId) return false;
  if (stepIndex > 1 && !productState.brandId) return false;
  if (stepIndex > 2 && !productState.productId) return false;
  if (
    stepIndex > 4 &&
    (!productState.variants || productState.variants.length === 0)
  )
    return false;

  return true;
};

export default function SellerPanel() {
  const [activeStep, setActiveStep] = useState(0);
  const { productState } = useProduct();

  const steps = [
    "Category",
    "Brand",
    "Product Info",
    "Attributes",
    "Variants",
    "Pricing",
    "Features",
    "Specifications",
    "Manufacturer Info",
    "Variant Images",
    "Product Images"
  ];

  return (
    <div className="seller-panel">

      {/* 🔹 LEFT SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>SALONI</h2>
        </div>

        <h4 className="text-center mb-3">Modules</h4>

        <ul className="sidebar-menu">
          {steps.map((label, index) => {
            const locked = !canAccessStep(index, productState);

            return (
              <li
                key={index}
                className={`
                  ${index === activeStep ? "active" : ""}
                  ${locked ? "disabled" : ""}
                `}
                onClick={() => {
                  if (locked) {
                    alert("Please complete previous steps first");
                    return;
                  }
                  setActiveStep(index);
                }}
              >
                {index}. {label}
                {locked && <span style={{ marginLeft: 6 }}>🔒</span>}
              </li>
            );
          })}
        </ul>
      </div>

      {/* 🔹 RIGHT CONTENT */}
      <div className="main-content">
        <CreateProductLayout
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
    </div>
  );
}