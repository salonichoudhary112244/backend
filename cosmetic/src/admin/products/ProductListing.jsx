import AdminLayout from "../layout/AdminLayout";

export default function ProductList() {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-4">
        Products Submitted ✅
      </h2>

      <p className="text-gray-600">
        Your product is under review and will go live after approval.
      </p>
    </AdminLayout>
  );
}
