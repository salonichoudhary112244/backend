// import { useState } from "react";
// import { createProduct } from "../../api/authApi";
// import AdminLayout from "../layout/AdminLayout";

// export default function CreateProduct() {

//   const [form, setForm] = useState({
//     name: "",
//     slug: "",
//     description: "",
//     categoryId: "",
//     brandId: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm({
//       ...form,
//       [name]: value
//     });
//   };

//   const submit = async () => {
//     try {
//       // 🔥 DTO EXACT PAYLOAD
//       const payload = {
//         name: form.name,
//         slug: form.slug,
//         description: form.description,
//         categoryId: Number(form.categoryId), // ✅ Long
//         brandId: Number(form.brandId)         // ✅ Long
//       };

//       const res = await createProduct(payload);

//       console.log("PRODUCT CREATED 👉", res.data);
//       alert("Product created successfully");

//       // 🔹 IMPORTANT FOR NEXT STEPS
//       localStorage.setItem("productId", res.data.id);

//     } catch (err) {
//       console.error("CREATE PRODUCT ERROR 👉", err);
//       alert("Error creating product");
//     }
//   };

//   return (
//     <AdminLayout>
//       <h2 className="text-xl font-semibold mb-4">
//         Create Product
//       </h2>

//       <div className="bg-white p-6 rounded w-[500px] space-y-3">

//         <input
//           name="name"
//           placeholder="Product Name"
//           value={form.name}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />

//         <input
//           name="slug"
//           placeholder="Slug (unique)"
//           value={form.slug}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />

//         <input
//           name="categoryId"
//           placeholder="Category ID"
//           value={form.categoryId}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />

//         <input
//           name="brandId"
//           placeholder="Brand ID"
//           value={form.brandId}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />

//         <button
//           onClick={submit}
//           className="bg-pink-500 text-white px-6 py-2 rounded"
//         >
//           Save Product
//         </button>

//       </div>
//     </AdminLayout>
//   );
// }
