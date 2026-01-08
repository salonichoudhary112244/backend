import { useState } from "react";
import { createCategoriesBulk } from "../../api/authApi";

export default function CategoryPanel() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const addCategory = () => {
    if (!name.trim()) return;

    setCategories((prev) => [
      ...prev,
      { name, slug: name.toLowerCase().replace(/\s+/g, "-") }
    ]);

    setName("");
  };

  const saveCategories = async () => {
    if (categories.length === 0) {
      alert("Add categories first");
      return;
    }

    try {
      await createCategoriesBulk(categories);
      alert("Categories saved");
      setCategories([]);
    } catch (err) {
      console.error("SAVE CATEGORY ERROR", err);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      <div className="bg-white p-4 rounded w-[400px] space-y-3 mb-4">
        <input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          onClick={addCategory}
          className="border px-4 py-2 rounded"
        >
          + Add
        </button>

        <button
          onClick={saveCategories}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Save All
        </button>
      </div>

      <ul className="bg-white p-4 rounded w-[400px] space-y-2">
        {categories.map((c, i) => (
          <li key={i} className="border p-2 rounded">
            {c.name}
          </li>
        ))}
      </ul>
    </>
  );
}
