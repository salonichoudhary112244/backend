import { useEffect, useState } from "react";
import { createAttribute, getAllAttributes } from "../../api/authApi";

export default function AttributePanel() {
  const [name, setName] = useState("");
  const [values, setValues] = useState([""]);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    const res = await getAllAttributes();
    setAttributes(res.data);
  };

  const addAttribute = async () => {
    if (!name.trim()) {
      alert("Attribute name required");
      return;
    }

    const cleanedValues = values.filter(v => v.trim() !== "");

    if (cleanedValues.length === 0) {
      alert("At least one value required");
      return;
    }

    await createAttribute({
      name,
      values: cleanedValues
    });

    setName("");
    setValues([""]);
    loadAttributes();
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

        <h4 className="font-medium">Attribute Values</h4>

        {values.map((v, i) => (
          <input
            key={i}
            placeholder={`Value ${i + 1}`}
            value={v}
            onChange={(e) => {
              const copy = [...values];
              copy[i] = e.target.value;
              setValues(copy);
            }}
            className="border p-2 w-full"
          />
        ))}

        <button
          onClick={() => setValues([...values, ""])}
          className="border px-3 py-1 rounded"
        >
          + Add Value
        </button>

        <button
          onClick={addAttribute}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Add Attribute
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {attributes.map((a) => (
          <div key={a.id} className="bg-white p-2 rounded border text-center">
            {a.name}
          </div>
        ))}
      </div>
    </>
  );
}
