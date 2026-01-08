import { useState, useEffect } from "react";
import { setVariantPrice } from "../../api/authApi";
import FlowNav from "../layout/FlowNav";

export default function VariantPricingPanel() {

  const [variantId, setVariantId] = useState("");
  const [mrp, setMrp] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discountType, setDiscountType] = useState("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState("");

  // 🔹 AUTO LOAD VARIANT ID (BEST PRACTICE)
  useEffect(() => {
    const vid = localStorage.getItem("variantId");

    if (!vid) {
      alert("Please create variant first");
      return;
    }

    setVariantId(vid);
  }, []);

  // 🔥 REAL DISCOUNT CALCULATION
  let finalPrice = sellingPrice;

  if (discountValue) {
    if (discountType === "PERCENTAGE") {
      finalPrice = sellingPrice - (sellingPrice * discountValue) / 100;
    } else {
      finalPrice = sellingPrice - discountValue;
    }
  }

  const savePrice = async () => {
    try {
      const payload = {
        mrp,
        sellingPrice: finalPrice
      };

      const res = await setVariantPrice(variantId, payload);

      console.log("PRICE SAVED 👉", res.data);
      alert("Price saved successfully");

    } catch (err) {
      console.error("PRICE ERROR 👉", err);
      alert("Error saving price");
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
        onChange={(e) => setMrp(Number(e.target.value))}
        className="border p-2 mb-2 block"
      />

      <input
        placeholder="Selling Price"
        onChange={(e) => setSellingPrice(Number(e.target.value))}
        className="border p-2 mb-4 block"
      />

      <h3 className="font-semibold mb-2">Discount (Preview Only)</h3>

      <select
        onChange={(e) => setDiscountType(e.target.value)}
        className="border p-2 mb-2"
      >
        <option value="PERCENTAGE">Percentage</option>
        <option value="FLAT">Flat</option>
      </select>

      <input
        placeholder="Discount Value"
        onChange={(e) => setDiscountValue(Number(e.target.value))}
        className="border p-2 mb-3 block"
      />

      <p className="text-green-600 font-semibold mb-4">
        Final Price after discount: ₹{finalPrice || sellingPrice}
      </p>

      <button
        onClick={savePrice}
        className="bg-pink-500 text-white px-6 py-2 rounded"
      >
        Save Price
      </button>

      {/* 🔽 FLOW NAVIGATION (CORRECT PLACE) */}
      <FlowNav
        skipPath="/admin/images"
        nextPath="/admin/images"
      />
    </>
  );
}
