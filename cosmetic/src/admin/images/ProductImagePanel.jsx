import { uploadProductImages } from "../../api/authApi";
import { useState, useEffect } from "react";
import FlowNav from "../layout/FlowNav";

export default function ProductImagePanel() {

  const [productId, setProductId] = useState("");
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  // 🔹 AUTO LOAD PRODUCT ID
  useEffect(() => {
    const pid = localStorage.getItem("productId");

    if (!pid) {
      alert("Please create product first");
      return;
    }

    setProductId(pid);
  }, []);

  const upload = async () => {
    if (files.length === 0) {
      alert("Please select images");
      return;
    }

    const form = new FormData();
    files.forEach((f) => form.append("files", f));

    try {
      const res = await uploadProductImages(productId, form);

      /*
        Backend returns:
        List<ProductImageResponseDto>
        {
          id,
          productId,
          variantId,
          imageUrl,
          isPrimary,
          displayOrder
        }
      */

      console.log("UPLOAD IMAGES RESPONSE 👉", res.data);
      alert("Images uploaded successfully");

      // 🔥 USE BACKEND DTO RESPONSE
      setUploadedImages(prev => [...prev, ...res.data]);

      setFiles([]);

    } catch (err) {
      console.error("UPLOAD ERROR 👉", err);
      alert("Error uploading images");
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Product Images</h2>

      {/* PRODUCT ID */}
      <input
        value={productId}
        readOnly
        className="border p-2 mb-4 w-[300px] bg-gray-100"
      />

      {/* FILE UPLOAD */}
      <div className="bg-white p-4 rounded mb-6 w-[400px] space-y-3">
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />

        <button
          onClick={upload}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Upload Images
        </button>
      </div>

      {/* IMAGE PREVIEW (DTO BASED) */}
      {uploadedImages.length > 0 && (
        <>
          <h3 className="font-semibold mb-2">Uploaded Images</h3>

          <div className="grid grid-cols-4 gap-4">
            {uploadedImages.map((img) => (
              <div
                key={img.id}
                className="border rounded p-2 flex flex-col items-center"
              >
                <img
                  src={img.imageUrl}
                  alt="product"
                  className="w-32 h-32 object-cover"
                />

                {img.isPrimary && (
                  <span className="text-xs text-green-600 mt-1">
                    Primary Image
                  </span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🔽 FLOW NAV */}
      <FlowNav
        skipPath="/admin/features"
        nextPath="/admin/features"
      />
    </>
  );
}
