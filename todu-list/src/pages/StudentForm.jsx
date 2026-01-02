// src/components/StudentForm.jsx
import { useEffect, useState } from "react";

/**
 * Reusable form component
 * props:
 *  - onSubmit(studentObject)
 *  - editingStudent (null ya student object)
 *  - onCancelEdit()
 */
export default function StudentForm({ onSubmit, editingStudent, onCancelEdit }) {
  const [name, setName] = useState("");
  const [clas, setClas] = useState("");
  const [address, setAddress] = useState("");

  // Jab edit wale data aayega, usko form me set kar do
  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name || "");
      setClas(editingStudent.clas || "");
      setAddress(editingStudent.address || "");
    } else {
      setName("");
      setClas("");
      setAddress("");
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    const student = {
      name,
      clas,
      address,
    };

    onSubmit(student);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      <h3>{editingStudent ? "Edit Student" : "Add New Student"}</h3>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Class:{" "}
          <input
            type="text"
            value={clas}
            onChange={(e) => setClas(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Address:{" "}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
      </div>

      <button type="submit" style={{ marginRight: "8px" }}>
        {editingStudent ? "Update" : "Save"}
      </button>

      {editingStudent && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}
