// src/pages/SimpleStudentPage.jsx
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/api";

// ==== API FUNCTIONS yahi pe ====
async function fetchStudents() {
  const res = await fetch(`${API_BASE_URL}/get`);
  return res.json();
}

async function saveStudentApi(student) {
  const res = await fetch(`${API_BASE_URL}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  const data = await res.json();
  console.log("Saved student:", data);
  return data;
}

async function updateStudentApi(id, student) {
  const res = await fetch(`${API_BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  const data = await res.json();
  console.log("Updated student:", data);
  return data;
}

async function deleteStudentApi(id) {
  const res = await fetch(`${API_BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  const text = await res.text();
  console.log("Delete response:", text, "for id:", id);
  return text;
}

// ==== FORM COMPONENT (simple) ====
function StudentForm({ onSubmit, editingStudent, onCancelEdit }) {
  const [name, setName] = useState("");
  const [clas, setClas] = useState("");
  const [address, setAddress] = useState("");

  // jab edit mode ho, data set karo
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
    if (!name.trim()) {
      alert("Name required hai");
      return;
    }

    const student = { name, clas, address };
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

// ==== TABLE COMPONENT ====
function StudentTable({ students, onEdit, onDelete }) {
  return (
    <table
      border="1"
      cellPadding="8"
      style={{ borderCollapse: "collapse", minWidth: "400px" }}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Class</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.length === 0 && (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              No students found
            </td>
          </tr>
        )}

        {students.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>{s.clas}</td>
            <td>{s.address}</td>
            <td>
              <button
                onClick={() => onEdit(s)}
                style={{ marginRight: "5px" }}
              >
                Edit
              </button>
              <button onClick={() => onDelete(s.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ==== MAIN PAGE COMPONENT ====
export default function SimpleStudentPage() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  // first time load hone par data laao
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await fetchStudents();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
      alert("Error fetching students. Console check karo.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOrUpdate = async (studentData) => {
    try {
      if (editingStudent) {
        // update
        const updated = await updateStudentApi(editingStudent.id, studentData);
        setStudents((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        );
        setEditingStudent(null);
      } else {
        // new save
        const saved = await saveStudentApi(studentData);
        setStudents((prev) => [...prev, saved]);
      }
    } catch (err) {
      console.error("Error saving/updating student:", err);
      alert("Error saving/updating. Console check karo.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete karna sure ho?")) return;
    try {
      await deleteStudentApi(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("Error deleting. Console check karo.");
    }
  };

  return (
    <div>
      <h2>Simple CRUD (No Pagination)</h2>
      {loading && <p>Loading students...</p>}

      <StudentForm
        onSubmit={handleSaveOrUpdate}
        editingStudent={editingStudent}
        onCancelEdit={() => setEditingStudent(null)}
      />

      <StudentTable
        students={students}
        onEdit={(stu) => setEditingStudent(stu)}
        onDelete={handleDelete}
      />
    </div>
  );
}
