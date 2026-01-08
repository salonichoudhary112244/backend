import { useState } from "react";
import { createProduct } from "../../api/authApi";
import FlowNav from "../layout/FlowNav";

export default function ProductPanel() {

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    brandId: "",
    categoryId: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const saveProduct = async () => {
    try {
      // 🔥 DTO SAFE PAYLOAD
      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        brandId: Number(form.brandId),       // ✅ Long
        categoryId: Number(form.categoryId)  // ✅ Long
      };

      const res = await createProduct(payload);

      console.log("PRODUCT CREATE RESPONSE 👉", res.data);
      alert("Product created successfully");

      // 🔹 NEXT STEPS KE LIYE
      localStorage.setItem("productId", res.data.id);

      // reset form
      setForm({
        name: "",
        slug: "",
        description: "",
        brandId: "",
        categoryId: ""
      });

    } catch (err) {
      console.error("PRODUCT CREATE ERROR 👉", err);
      alert("Error creating product");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">
        Product Panel
      </h2>

      <div className="bg-white p-6 rounded shadow w-[500px] space-y-3">

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="brandId"
          placeholder="Brand ID"
          value={form.brandId}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="categoryId"
          placeholder="Category ID"
          value={form.categoryId}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          onClick={saveProduct}
          className="bg-pink-500 text-white px-6 py-2 rounded"
        >
          Save Product
        </button>

      </div>

      {/* 🔽 FLOW CONTINUE */}
      <FlowNav nextPath="/admin/attribute-mapping" />
    </>
  );
}
