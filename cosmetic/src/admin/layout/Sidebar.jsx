import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-pink-200 min-h-screen p-4">
      <nav className="space-y-2">

        <NavLink to="/admin/products" className="block p-2 rounded hover:bg-pink-300">
          Products
        </NavLink>

        <NavLink to="/admin/pricing" className="block p-2 rounded hover:bg-pink-300">
          Variant Pricing
        </NavLink>

        <NavLink to="/admin/images" className="block p-2 rounded hover:bg-pink-300">
          Images
        </NavLink>

        <NavLink to="/admin/features" className="block p-2 rounded hover:bg-pink-300">
          Features
        </NavLink>

        <NavLink to="/admin/specs" className="block p-2 rounded hover:bg-pink-300">
          Specifications
        </NavLink>

        <NavLink to="/admin/manufacturer" className="block p-2 rounded hover:bg-pink-300">
          Manufacturer
        </NavLink>

      </nav>
    </div>
  );
}
