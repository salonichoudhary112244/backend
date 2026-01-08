import { useState, useEffect } from "react";
import { createVariant, getVariants } from "../../api/authApi";
import FlowNav from "../layout/FlowNav";

export default function VariantPanel() {

  const [productId, setProductId] = useState("");
  const [variants, setVariants] = useState([]);

  const [variant, setVariant] = useState({
    sku: "",
    price: "",
    stock: "",
    attributes: {}   // ✅ DTO REQUIRED
  });

  // 🔹 AUTO LOAD PRODUCT ID
  useEffect(() => {
    const pid = localStorage.getItem("productId");
    if (pid) setProductId(pid);
  }, []);

  const handleChange = (e) => {
    setVariant({
      ...variant,
      [e.target.name]: e.target.value
    });
  };

  const loadVariants = async () => {
    if (!productId) {
      alert("Enter product ID first");
      return;
    }

    try {
      const res = await getVariants(productId);
      console.log("GET VARIANTS 👉", res.data);
      setVariants(res.data);
    } catch (err) {
      console.error("GET VARIANTS ERROR 👉", err);
    }
  };

const addVariant = async () => {
  if (!productId || !variant.sku) {
    alert("Product ID and SKU required");
    return;
  }

  try {
    const payload = {
      sku: variant.sku,
      price: Number(variant.price),
      stock: Number(variant.stock)
    };

const res = await createVariant(productId, payload);

// 🔥 BACKEND RESPONSE
// res.data.id  <-- यही variantId है

localStorage.setItem("variantId", res.data.id);   // ✅ IMPORTANT

console.log("VARIANT CREATED 👉", res.data);
alert("Variant created successfully");

setVariant({ sku: "", price: "", stock: "" });
loadVariants();


  } catch (err) {
    console.error("ADD VARIANT ERROR 👉", err);
    alert("Error creating variant");
  }
};


  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Variants</h2>

      {/* PRODUCT ID */}
      <input
        value={productId}
        readOnly
        className="border p-2 mb-4 w-[300px] bg-gray-100"
      />

      {/* ADD VARIANT */}
      <div className="bg-white p-4 mb-6 border rounded w-[500px] space-y-3">
        <input
          name="sku"
          placeholder="SKU"
          value={variant.sku}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          value={variant.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="stock"
          placeholder="Stock"
          type="number"
          value={variant.stock}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          onClick={addVariant}
          className="bg-pink-500 text-white px-6 py-2 rounded"
        >
          Save Variant
        </button>
      </div>

      {/* VARIANT LIST */}
      <table className="w-full bg-white border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {variants.map((v) => (
            <tr key={v.id} className="border-t">
              <td className="p-2">{v.id}</td>
              <td>{v.sku}</td>
              <td>{v.price}</td>
              <td>{v.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FLOW NAV */}
      <FlowNav
        skipPath="/admin/pricing"
        nextPath="/admin/pricing"
      />
    </>
  );
}
