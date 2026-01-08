import { useState } from "react";
import { createVariant, getVariants } from "../../api/authApi";
import FlowNav from "../layout/FlowNav";

export default function VariantPanel() {

  const [productId, setProductId] = useState("");
  const [variants, setVariants] = useState([]);

  const [variant, setVariant] = useState({
    sku: "",
    price: "",
    stock: ""
  });

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
        price: variant.price,
        stock: variant.stock
      };

      const res = await createVariant(productId, payload);

      console.log("ADD VARIANT 👉", res.data);
      alert("Variant created");

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
      <div className="bg-white p-4 mb-6 border rounded w-[400px]">
        <input
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          onClick={loadVariants}
          className="mt-3 bg-gray-200 px-4 py-1 rounded"
        >
          Load Variants
        </button>
      </div>

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
          value={variant.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="stock"
          placeholder="Stock"
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
