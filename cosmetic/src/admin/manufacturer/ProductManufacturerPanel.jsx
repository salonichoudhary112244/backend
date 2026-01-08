import { useState, useEffect } from "react";
import { saveManufacturerInfo } from "../../api/authApi";
import FlowNav from "../layout/FlowNav";

export default function ProductManufacturerPanel() {

  const [productId, setProductId] = useState("");
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");

  // 🔹 AUTO LOAD PRODUCT ID
  useEffect(() => {
    const pid = localStorage.getItem("productId");

    if (!pid) {
      alert("Please create product first");
      return;
    }

    setProductId(pid);
  }, []);

  const save = async () => {
    if (!content.trim()) {
      alert("Manufacturer content required");
      return;
    }

    try {
      const res = await saveManufacturerInfo(productId, content);

      console.log("SAVE MANUFACTURER INFO 👉", res.data);
      alert("Manufacturer info saved");

      // 🔥 SHOW ON PAGE
      setSavedContent(content);
      setContent("");

    } catch (err) {
      console.error("SAVE MANUFACTURER ERROR 👉", err);
      alert("Error saving manufacturer info");
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">From the Manufacturer</h2>

      {/* PRODUCT ID */}
      <input
        value={productId}
        readOnly
        className="border p-2 mb-3 w-[300px] bg-gray-100"
      />

      {/* TEXT AREA */}
      <textarea
        rows="6"
        placeholder="Manufacturer content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={save}
        className="bg-pink-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>

      {/* PREVIEW */}
      {savedContent && (
        <div className="bg-white p-4 rounded mt-6">
          <h3 className="font-semibold mb-2">Preview (Submitted)</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {savedContent}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            * Content will be reviewed & approved by Admin
          </p>
        </div>
      )}

      {/* 🔽 FLOW NAVIGATION */}
      <FlowNav
        nextPath="/admin/success"
      />
    </>
  );
}
