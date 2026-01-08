import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const steps = [
    { label: "Brands", path: "/admin/brands" },
    { label: "Categories", path: "/admin/categories" },
    { label: "Attributes", path: "/admin/attributes" },
    { label: "Create Product", path: "/admin/products/create" },
    { label: "Attribute Mapping", path: "/admin/product-attributes" },
    { label: "Variants", path: "/admin/variants" },
    { label: "Pricing", path: "/admin/pricing" },
    { label: "Images", path: "/admin/images" },
    { label: "Features", path: "/admin/features" },
    { label: "Specifications", path: "/admin/specifications" },
    { label: "Manufacturer", path: "/admin/manufacturer" },
    { label: "Success", path: "/admin/success" }
  ];

  return (
    <div className="bg-white p-8 rounded shadow max-w-3xl">

      <h1 className="text-3xl font-bold mb-4">
        Welcome Seller 👋
      </h1>

      <p className="mb-6 text-gray-600">
        Click any step below to continue your product creation journey.
      </p>

      {/* FLOW GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => navigate(step.path)}
            className="border p-4 rounded text-left hover:bg-pink-50 hover:border-pink-400 transition"
          >
            <p className="text-sm text-gray-400">
              Step {index + 1}
            </p>
            <p className="font-semibold text-gray-800">
              {step.label}
            </p>
          </button>
        ))}
      </div>

    </div>
  );
}
