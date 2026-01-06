import { useState } from "react";
import AdminLayout from "../layout/AdminLayout";

export default function ProductSpecificationPanel() {

  const [productId, setProductId] = useState("");
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);
  const [previewSpecs, setPreviewSpecs] = useState([]);

  const addToPreview = () => {
    const cleaned = specs.filter(
      (s) => s.key.trim() !== "" && s.value.trim() !== ""
    );

    if (!productId || cleaned.length === 0) {
      alert("Product ID and at least one specification required");
      return;
    }

    console.log("SPEC PREVIEW 👉", cleaned);

    setPreviewSpecs((prev) => [...prev, ...cleaned]);
    setSpecs([{ key: "", value: "" }]);
  };

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">Product Specifications</h2>

      {/* PRODUCT ID */}
      <input
        placeholder="Product ID"
        onChange={(e) => setProductId(e.target.value)}
        className="border p-2 mb-4 w-[300px]"
      />

      {/* ADD SPECS */}
      <div className="bg-white p-4 rounded mb-4 w-[500px]">
        <h3 className="font-semibold mb-2">Add Specifications (Preview)</h3>

        {specs.map((s, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="Key (e.g. Weight)"
              value={s.key}
              onChange={(e) => {
                const copy = [...specs];
                copy[i].key = e.target.value;
                setSpecs(copy);
              }}
              className="border p-2 w-1/2"
            />

            <input
              placeholder="Value (e.g. 200g)"
              value={s.value}
              onChange={(e) => {
                const copy = [...specs];
                copy[i].value = e.target.value;
                setSpecs(copy);
              }}
              className="border p-2 w-1/2"
            />
          </div>
        ))}

        <div className="flex gap-3 mt-3">
          <button
            onClick={() => setSpecs([...specs, { key: "", value: "" }])}
            className="border px-3 py-1 rounded"
          >
            + Add Spec
          </button>

          <button
            onClick={addToPreview}
            className="bg-pink-500 text-white px-4 py-2 rounded"
          >
            Add to Preview
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          * Specifications will be reviewed & approved by Admin
        </p>
      </div>

      {/* PREVIEW TABLE */}
      {previewSpecs.length > 0 && (
        <div className="bg-white p-4 rounded w-[500px]">
          <h3 className="font-semibold mb-2">Added Specifications</h3>

          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Key</th>
                <th className="border p-2 text-left">Value</th>
              </tr>
            </thead>

            <tbody>
              {previewSpecs.map((s, i) => (
                <tr key={i}>
                  <td className="border p-2">{s.key}</td>
                  <td className="border p-2">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </AdminLayout>
  );
}
