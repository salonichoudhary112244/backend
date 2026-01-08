import { useEffect, useState } from "react";
import { createAttribute, getAllAttributes } from "../../api/authApi";

export default function AttributePanel() {
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    try {
      const res = await getAllAttributes();
      setAttributes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addAttribute = async () => {
    if (!name.trim()) {
      alert("Attribute name required");
      return;
    }

    try {
      await createAttribute({ name });
      setName("");
      loadAttributes();
    } catch (err) {
      console.error("CREATE ATTRIBUTE ERROR", err);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Attributes</h2>

      <div className="bg-white p-4 rounded w-[400px] mb-6 space-y-3">
        <input
          placeholder="Attribute name (e.g. Color)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          onClick={addAttribute}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Add Attribute
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {attributes.map((a) => (
          <div
            key={a.id}
            className="bg-white p-2 rounded border text-center"
          >
            {a.name}
          </div>
        ))}
      </div>
    </>
  );
}
