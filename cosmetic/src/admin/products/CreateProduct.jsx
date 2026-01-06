import { useState } from "react";
import { createProduct } from "../../api/authApi";
import AdminLayout from "./AdminLayout";



export default function CreateProduct() {

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    categoryId: "",
    brandId: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const submit = async () => {
  try {
    const res = await createProduct(form);
    console.log("API RESPONSE:", res.data);
    alert("Product created successfully");
  } catch (err) {
    console.error(err);
    alert("Error creating product");
  }
};


  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">
        Create Product
      </h2>

      <div className="bg-white p-6 rounded w-[500px] space-y-3">

        <input
          name="name"
          placeholder="Product Name"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="slug"
          placeholder="Slug (unique)"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="categoryId"
          placeholder="Category ID"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="brandId"
          placeholder="Brand ID"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <button
          onClick={submit}
          className="bg-pink-500 text-white px-6 py-2 rounded"
        >
          Save Product
        </button>

      </div>
    </AdminLayout>
  );
}
