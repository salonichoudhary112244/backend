import { useEffect, useState } from "react";
import {
  assignAttributesToProduct,
  getAllAttributes
} from "../../api/authApi";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate } from "react-router-dom";

export default function ProductAttributeMapping() {

  const navigate = useNavigate();

  // form state
  const [productId, setProductId] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [selected, setSelected] = useState([]);

  // load attributes (GET allowed)
  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    try {
      const res = await getAllAttributes();
      console.log("GET ATTRIBUTES 👉", res.data);
      setAttributes(res.data);
    } catch (err) {
      console.error("GET ATTRIBUTES ERROR 👉", err);
    }
  };

  const toggleAttribute = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((a) => a !== id)
        : [...prev, id]
    );
  };

  const submitMapping = async () => {
    if (!productId || selected.length === 0) {
      alert("Product ID and at least one attribute required");
      return;
    }

    try {
      const payload = {
        attributeIds: selected
      };

      const res = await assignAttributesToProduct(productId, payload);

      // 🔥 CONSOLE
      console.log("PRODUCT ATTRIBUTE MAP FULL RESPONSE 👉", res);
      console.log("PRODUCT ATTRIBUTE MAP DATA 👉", res.data);

      // 🔔 POPUP
      alert(res.data); // "Attributes assigned to product"

      // reset
      setProductId("");
      setSelected([]);

    } catch (err) {
      console.error("PRODUCT ATTRIBUTE MAP ERROR 👉", err);
      alert("Error mapping attributes to product");
    }
  };

  return (
    <AdminLayout>

      <h2 className="text-xl font-semibold mb-4">
        Product Attribute Mapping
      </h2>

      {/* PRODUCT ID INPUT */}
      <div className="bg-white p-4 mb-6 border rounded w-[500px]">
        <h3 className="font-semibold mb-3">Select Product</h3>

        <input
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* ATTRIBUTE SELECTION */}
      <div className="bg-white p-4 mb-6 border rounded">
        <h3 className="font-semibold mb-3">
          Select Allowed Attributes
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {attributes.map((a) => (
            <label
              key={a.id}
              className="flex items-center gap-2 border p-2 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(a.id)}
                onChange={() => toggleAttribute(a.id)}
              />
              {a.name}
            </label>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between mt-6">
        <button
          onClick={submitMapping}
          className="bg-pink-500 text-white px-6 py-2 rounded"
        >
          Save Mapping
        </button>

        <button
          onClick={() => navigate("/admin/variants")}
          className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
        >
          Skip & Continue →
        </button>
      </div>

    </AdminLayout>
  );
}
