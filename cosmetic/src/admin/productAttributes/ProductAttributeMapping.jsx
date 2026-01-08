import { useEffect, useState } from "react";
import {
  assignAttributesToProduct,
  getAllAttributes
} from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export default function ProductAttributeMapping() {

  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [selected, setSelected] = useState([]);

  // 🔹 AUTO LOAD PRODUCT ID (BEST PRACTICE)
  useEffect(() => {
    const pid = localStorage.getItem("productId");
    if (pid) setProductId(pid);
  }, []);

  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    try {
      const res = await getAllAttributes();
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
      const payload = { attributeIds: selected };
      const res = await assignAttributesToProduct(productId, payload);

      alert(res.data); // "Attributes assigned to product"

      navigate("/admin/variants"); // ✅ FLOW CONTINUE

    } catch (err) {
      console.error("ATTRIBUTE MAP ERROR 👉", err);
      alert("Error mapping attributes");
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        Product Attribute Mapping
      </h2>

      {/* PRODUCT ID */}
      <input
        value={productId}
        readOnly
        className="border p-2 mb-4 w-[300px] bg-gray-100"
      />

      {/* ATTRIBUTE LIST */}
      <div className="bg-white p-4 rounded mb-6">
        <h3 className="font-semibold mb-3">Select Attributes</h3>

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

      {/* ACTION */}
      <button
        onClick={submitMapping}
        className="bg-pink-500 text-white px-6 py-2 rounded"
      >
        Save & Continue →
      </button>
    </>
  );
}
