import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white p-5 space-y-3">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/products/create">Create Product</NavLink>
        <NavLink to="/admin/variants">Variants</NavLink>
        <NavLink to="/admin/pricing">Pricing</NavLink>
        <NavLink to="/admin/images">Images</NavLink>
        <NavLink to="/admin/features">Features</NavLink>
        <NavLink to="/admin/specifications">Specifications</NavLink>
        <NavLink to="/admin/manufacturer">Manufacturer</NavLink>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>

    </div>
  );
}
