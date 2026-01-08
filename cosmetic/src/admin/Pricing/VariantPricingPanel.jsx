import { useState, useEffect } from "react";
import { setVariantPrice, setVariantDiscount } from "../../api/authApi";
import FlowNav from "../layout/FlowNav";

export default function VariantPricingPanel() {

  const [variantId, setVariantId] = useState("");
  const [mrp, setMrp] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discountType, setDiscountType] = useState("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState("");

  // 🔹 AUTO LOAD VARIANT ID
  useEffect(() => {
    const vid = localStorage.getItem("variantId");
    if (!vid) {
      alert("Please create variant first");
      return;
    }
    setVariantId(vid);
  }, []);

  // 🔹 SAVE PRICE (VariantPriceRequestDto)
  const savePrice = async () => {
    try {
      const pricePayload = {
        mrp: Number(mrp),
        sellingPrice: Number(sellingPrice)
      };

      await setVariantPrice(variantId, pricePayload);
      alert("Price saved successfully");

    } catch (err) {
      console.error("PRICE ERROR 👉", err);
      alert("Error saving price");
    }
  };

  // 🔹 APPLY DISCOUNT (VariantDiscountRequestDto)
  const applyDiscount = async () => {
    try {
      const discountPayload = {
        discountType,
        discountValue: Number(discountValue)
      };

      await setVariantDiscount(variantId, discountPayload);
      alert("Discount applied successfully");

    } catch (err) {
      console.error("DISCOUNT ERROR 👉", err);
      alert("Error applying discount");
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Variant Pricing</h2>

      <input
        value={variantId}
        readOnly
        className="border p-2 mb-3 block bg-gray-100"
      />

      <input
        placeholder="MRP"
        value={mrp}
        onChange={(e) => setMrp(e.target.value)}
        className="border p-2 mb-2 block"
      />

      <input
        placeholder="Selling Price"
        value={sellingPrice}
        onChange={(e) => setSellingPrice(e.target.value)}
        className="border p-2 mb-4 block"
      />

      <button
        onClick={savePrice}
        className="bg-black text-white px-6 py-2 rounded mb-6"
      >
        Save Price
      </button>

      <h3 className="font-semibold mb-2">Discount</h3>

      <select
        value={discountType}
        onChange={(e) => setDiscountType(e.target.value)}
        className="border p-2 mb-2 block"
      >
        <option value="PERCENTAGE">Percentage</option>
        <option value="FLAT">Flat</option>
      </select>

      <input
        placeholder="Discount Value"
        value={discountValue}
        onChange={(e) => setDiscountValue(e.target.value)}
        className="border p-2 mb-3 block"
      />

      <button
        onClick={applyDiscount}
        className="bg-pink-500 text-white px-6 py-2 rounded"
      >
        Apply Discount
      </button>

      {/* 🔽 FLOW */}
      <FlowNav
        skipPath="/admin/images"
        nextPath="/admin/images"
      />
    </>
  );
}
