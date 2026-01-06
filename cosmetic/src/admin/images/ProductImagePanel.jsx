import { uploadProductImages } from "../../api/authApi";
import AdminLayout from "../layout/AdminLayout";
import { useState } from "react";

export default function ProductImagePanel() {

  const [productId, setProductId] = useState("");
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const upload = async () => {
    if (!productId || files.length === 0) {
      alert("Product ID and images required");
      return;
    }

    const form = new FormData();
    files.forEach((f) => form.append("files", f));

    try {
      const res = await uploadProductImages(productId, form);

      console.log("UPLOAD IMAGES RESPONSE 👉", res.data);
      alert("Images uploaded successfully");

      /**
       * 🔥 IMPORTANT
       * Agar backend sirf string return karta hai
       * to hum local preview dikha rahe hain
       */
      const previews = files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name
      }));

      setUploadedImages((prev) => [...prev, ...previews]);
      setFiles([]);

    } catch (err) {
      console.error("UPLOAD ERROR 👉", err);
      alert("Error uploading images");
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">Product Images</h2>

      {/* INPUTS */}
      <div className="bg-white p-4 rounded mb-4 w-[400px] space-y-3">
        <input
          placeholder="Product ID"
          onChange={(e) => setProductId(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />

        <button
          onClick={upload}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      {/* IMAGE PREVIEW */}
      {uploadedImages.length > 0 && (
        <>
          <h3 className="font-semibold mb-2">Uploaded Images</h3>

          <div className="grid grid-cols-4 gap-4">
            {uploadedImages.map((img, index) => (
              <div
                key={index}
                className="border rounded p-2 flex flex-col items-center"
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-32 h-32 object-cover"
                />
                <span className="text-xs mt-1">{img.name}</span>
              </div>
            ))}
          </div>
        </>
      )}

    </AdminLayout>
  );
}
