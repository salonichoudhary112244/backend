import { useEffect, useState } from "react";
import { createAttribute, getAllAttributes } from "../../api/authApi";
import AdminLayout from "../products/AdminLayout";
import { useNavigate } from "react-router-dom";

export default function AttributePanel() {

  const navigate = useNavigate();

  // list state
  const [attributes, setAttributes] = useState([]);

  // add state
  const [name, setName] = useState("");

  // load on page open
  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    try {
      const res = await getAllAttributes();
      console.log("GET ATTRIBUTES 👉", res.data);
      setAttributes(res.data);
    } catch (err) {
      console.error("GET ATTRIBUTES ERROR 👉", err);
    }
  };

  const addAttribute = async () => {
    if (!name.trim()) {
      alert("Attribute name required");
      return;
    }

    try {
      const payload = { name };

      const res = await createAttribute(payload);

      // 🔥 CONSOLE
      console.log("ADD ATTRIBUTE FULL RESPONSE 👉", res);
      console.log("ADD ATTRIBUTE RESPONSE DATA 👉", res.data);

      // 🔔 POPUP
      alert(res.data); // "Attribute created"

      // reload list
      loadAttributes();

      // reset input
      setName("");

    } catch (err) {
      console.error("ADD ATTRIBUTE ERROR 👉", err);
      alert("Error creating attribute");
    }
  };

  return (
    <AdminLayout>

      <h2 className="text-xl font-semibold mb-4">Attributes</h2>

      {/* ADD ATTRIBUTE */}
      <div className="bg-white p-4 mb-6 border rounded">
        <h3 className="font-semibold mb-3">Add Attribute</h3>

        <div className="flex gap-3">
          <input
            placeholder="Attribute name (Color, Size, Weight)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2"
          />

          <button
            onClick={addAttribute}
            className="bg-pink-500 text-white px-4"
          >
            Add
          </button>
        </div>
      </div>

      {/* ATTRIBUTE LIST */}
      <table className="w-full bg-white border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {attributes.map((a) => (
            <tr key={a.id} className="border-t">
              <td className="p-2">{a.id}</td>
              <td>{a.name}</td>
            </tr>
          ))}

          {attributes.length === 0 && (
            <tr>
              <td colSpan="2" className="p-4 text-center text-gray-500">
                No attributes found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* SKIP / NEXT */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => navigate("/admin/products")}
          className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
        >
          Skip & Continue →
        </button>
      </div>

    </AdminLayout>
  );
}
