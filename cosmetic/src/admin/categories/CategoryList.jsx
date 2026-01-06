import { useState } from "react";
import { createCategoriesBulk } from "../../api/authApi";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {

  const navigate = useNavigate();

  // list state (frontend side)
  const [categories, setCategories] = useState([]);

  // add form state
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    parentId: "",
    level: 1
  });

  const handleChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value
    });
  };

const addCategory = async () => {
  if (!newCategory.name || !newCategory.slug) {
    alert("Name and slug required");
    return;
  }

  try {
    const payload = [
      {
        ...newCategory,
        parentId: newCategory.parentId || null
      }
    ];

    const res = await createCategoriesBulk(payload);

    // ✅ CONSOLE LOG
    console.log("ADD CATEGORY FULL RESPONSE 👉", res);
    console.log("ADD CATEGORY RESPONSE DATA 👉", res.data);

    // ✅ POPUP (THIS WAS MISSING)
    alert(res.data); // "Categories created successfully"

    // ✅ frontend list update (since GET ALL API nahi hai)
    setCategories([...categories, newCategory]);

    // reset form
    setNewCategory({
      name: "",
      slug: "",
      parentId: "",
      level: 1
    });

  } catch (err) {
    console.error("ADD CATEGORY ERROR 👉", err);
    alert("Error creating category");
  }
};


  return (
    <AdminLayout>

      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      {/* ADD CATEGORY */}
      <div className="bg-white p-4 mb-6 border rounded">
        <h3 className="font-semibold mb-3">Add Category</h3>

        <div className="flex gap-3 flex-wrap">
          <input
            name="name"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="slug"
            placeholder="Slug"
            value={newCategory.slug}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="parentId"
            placeholder="Parent ID (optional)"
            value={newCategory.parentId}
            onChange={handleChange}
            className="border p-2"
          />

          <select
            name="level"
            value={newCategory.level}
            onChange={handleChange}
            className="border p-2"
          >
            <option value={1}>Level 1</option>
            <option value={2}>Level 2</option>
            <option value={3}>Level 3</option>
          </select>

          <button
            onClick={addCategory}
            className="bg-pink-500 text-white px-4"
          >
            Add
          </button>
        </div>
      </div>

      {/* CATEGORY LIST (frontend view) */}
      <table className="w-full bg-white border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th>Slug</th>
            <th>Parent</th>
            <th>Level</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{c.name}</td>
              <td>{c.slug}</td>
              <td>{c.parentId || "-"}</td>
              <td>{c.level}</td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No categories added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* SKIP BUTTON */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => navigate("/admin/attributes")}
          className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
        >
          Skip & Continue →
        </button>
      </div>

    </AdminLayout>
  );
}
