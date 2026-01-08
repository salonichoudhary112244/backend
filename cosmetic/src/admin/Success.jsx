import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-8 rounded shadow max-w-md">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        ✅ Product Created Successfully
      </h2>

      <p className="text-gray-600 mb-6">
        Your product has been submitted and will be reviewed by admin.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Go to Dashboard
        </button>

        <button
          onClick={() => navigate("/admin/products/create")}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Add New Product
        </button>
      </div>
    </div>
  );
}
