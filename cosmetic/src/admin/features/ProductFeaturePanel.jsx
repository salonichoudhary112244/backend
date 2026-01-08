import { useState, useEffect } from "react";
import { saveProductFeatures } from "../../api/authApi";
import FlowNav from "../layout/FlowNav";

export default function ProductFeaturePanel() {

  const [productId, setProductId] = useState("");
  const [features, setFeatures] = useState([""]);
  const [previewFeatures, setPreviewFeatures] = useState([]);

  // 🔹 AUTO LOAD PRODUCT ID
  useEffect(() => {
    const pid = localStorage.getItem("productId");

    if (!pid) {
      alert("Please create product first");
      return;
    }

    setProductId(pid);
  }, []);

  const addToPreview = () => {
    const cleaned = features.filter(f => f.trim() !== "");

    if (cleaned.length === 0) {
      alert("Enter at least one feature");
      return;
    }

    setPreviewFeatures(prev => [...prev, ...cleaned]);
    setFeatures([""]);
  };

  // 🔥 DTO MATCHING SAVE
  const saveFeatures = async () => {
    if (previewFeatures.length === 0) {
      alert("No features to save");
      return;
    }

    try {
      await saveProductFeatures(productId, previewFeatures);
      alert("Features saved successfully");

      // optional reset
      setPreviewFeatures([]);
    } catch (err) {
      console.error("SAVE FEATURES ERROR 👉", err);
      alert("Error saving features");
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Product Features</h2>

      {/* PRODUCT ID */}
      <input
        value={productId}
        readOnly
        className="border p-2 mb-4 w-[300px] bg-gray-100"
      /> 

      {/* ADD FEATURES */}
      <div className="bg-white p-4 rounded mb-4 w-[500px]">
        <h3 className="font-semibold mb-2">Add Features</h3>

        {features.map((f, i) => (
          <input
            key={i}
            value={f}
            placeholder={`Feature ${i + 1}`}
            onChange={(e) => {
              const copy = [...features];
              copy[i] = e.target.value;
              setFeatures(copy);
            }}
            className="border p-2 mb-2 w-full"
          />
        ))}

        <div className="flex gap-3 mt-2">
          <button
            onClick={() => setFeatures([...features, ""])}
            className="border px-3 py-1 rounded"
          >
            + Add Feature
          </button>

          <button
            onClick={addToPreview}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Preview
          </button>
        </div>
      </div>

      {/* PREVIEW LIST */}
      {previewFeatures.length > 0 && (
        <div className="bg-white p-4 rounded w-[500px] mb-4">
          <h3 className="font-semibold mb-2">Preview Features</h3>

          <ul className="list-disc pl-5 space-y-1">
            {previewFeatures.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <button
            onClick={saveFeatures}
            className="mt-4 bg-pink-500 text-white px-6 py-2 rounded"
          >
            Save Features
          </button>
        </div>
      )}

      {/* 🔽 FLOW NAV */}
      <FlowNav
        skipPath="/admin/specifications"
        nextPath="/admin/specifications"
      />
    </>
  );
}
