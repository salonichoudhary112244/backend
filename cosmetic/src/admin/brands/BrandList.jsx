import { useEffect, useState } from "react";
import { getAllBrands, createBrandsBulk } from "../../api/authApi";
import AdminLayout from "../layout/AdminLayout";

import { useNavigate } from "react-router-dom";

export default function BrandList() {

  const navigate = useNavigate();

  // list state
  const [brands, setBrands] = useState([]);

  // add form state (single row for now)
  const [newBrand, setNewBrand] = useState({
    name: "",
    slug: "",
    logoUrl: ""
  });

  // load brands on page load
  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    const res = await getAllBrands();
    console.log("GET BRANDS 👉", res.data);
    setBrands(res.data);
  };

  // input change
  const handleChange = (e) => {
    setNewBrand({
      ...newBrand,
      [e.target.name]: e.target.value
    });
  };

  // add brand
  const addBrand = async () => {
    if (!newBrand.name || !newBrand.slug) {
      alert("Name and slug required");
      return;
    }

    try {
      const res = await createBrandsBulk([newBrand]);

      console.log("ADD BRAND RESPONSE 👉", res.data);

      // reset form
      setNewBrand({ name: "", slug: "", logoUrl: "" });

      // reload list
      loadBrands();

    } catch (err) {
      console.error("ADD BRAND ERROR 👉", err);
    }
  };

  return (
    <AdminLayout>

      <h2 className="text-xl font-semibold mb-4">Brands</h2>

      {/* ADD BRAND SECTION */}
      <div className="bg-white p-4 mb-6 border rounded">
        <h3 className="font-semibold mb-3">Add Brand</h3>

        <div className="flex gap-3">
          <input
            name="name"
            placeholder="Brand Name"
            value={newBrand.name}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="slug"
            placeholder="Slug"
            value={newBrand.slug}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="logoUrl"
            placeholder="Logo URL (optional)"
            value={newBrand.logoUrl}
            onChange={handleChange}
            className="border p-2"
          />

          <button
            onClick={addBrand}
            className="bg-pink-500 text-white px-4"
          >
            Add
          </button>
        </div>
      </div>

      {/* BRAND LIST SECTION */}
      <table className="w-full bg-white border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {brands.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-2">{b.id}</td>
              <td>{b.name}</td>
              <td>{b.slug}</td>
              <td>{b.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}

          {brands.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No brands found
              </td>
            </tr>
          )}
        </tbody>
      </table>

       {/* NEXT / SKIP BUTTON */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => navigate("/admin/categories")}
          className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
        >
          Skip & Continue →
        </button>
      </div>

    </AdminLayout>
  );
}
