import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewStudents() {

  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", clas: "", address: "" });

  // Load all students from backend
  const loadData = () => {
    axios.get("http://localhost:8080/api/get")
      .then(res => {
        console.log("All Students:", res.data);
        setStudents(res.data);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Delete student
  const deleteStudent = (id) => {
    console.log("Deleting ID:", id);
    axios.delete(`http://localhost:8080/api/delete/${id}`)
      .then(() => {
        alert("Deleted!");
        loadData(); // reload table
      });
  };

  // Start editing a student
  const startEdit = (student) => {
    setEditId(student.id);
    setEditData({ name: student.name, clas: student.clas, address: student.address });
  };

  // Handle input changes during edit
  const handleEdit = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save updated student
  const saveEdit = () => {
    console.log("Updating ID:", editId, editData);
    axios.put(`http://localhost:8080/api/update/${editId}`, editData)
      .then(() => {
        alert("Updated!");
        setEditId(null);
        loadData(); // reload table
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>All Students</h2>

      <table border="1" cellPadding="10">
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
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>

              {/* Editable Name */}
              <td>
                {editId === s.id ? (
                  <input name="name" value={editData.name} onChange={handleEdit} />
                ) : (
                  s.name
                )}
              </td>

              {/* Editable Class */}
              <td>
                {editId === s.id ? (
                  <input name="clas" value={editData.clas} onChange={handleEdit} />
                ) : (
                  s.clas
                )}
              </td>

              {/* Editable Address */}
              <td>
                {editId === s.id ? (
                  <input name="address" value={editData.address} onChange={handleEdit} />
                ) : (
                  s.address
                )}
              </td>

              {/* Actions */}
              <td>
                {editId === s.id ? (
                  <button onClick={saveEdit}>Save</button>
                ) : (
                  <button onClick={() => startEdit(s)}>Update</button>
                )}
                &nbsp;
                <button onClick={() => deleteStudent(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
