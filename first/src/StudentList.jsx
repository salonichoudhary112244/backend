import { useEffect, useState } from "react";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", clas: "", address: "" });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    fetch("http://localhost:8080/api/get")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  };

  const deleteStudent = (id) => {
    fetch(`http://localhost:8080/api/delete/${id}`, { method: "DELETE" })
      .then(() => {
        alert("Deleted!");
        loadStudents();
      });
  };

  const startEdit = (student) => {
    setEditId(student.id);
    setEditData(student);
  };

  const saveEdit = () => {
    fetch(`http://localhost:8080/api/update/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData)
    })
      .then(() => {
        alert("Updated!");
        setEditId(null);
        loadStudents();
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Students</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>
                {editId === s.id ? (
                  <input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                ) : (
                  s.name
                )}
              </td>

              <td>
                {editId === s.id ? (
                  <input
                    value={editData.clas}
                    onChange={(e) => setEditData({ ...editData, clas: e.target.value })}
                  />
                ) : (
                  s.clas
                )}
              </td>

              <td>
                {editId === s.id ? (
                  <input
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  />
                ) : (
                  s.address
                )}
              </td>

              <td>
                {editId === s.id ? (
                  <>
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(s)}>Edit</button>
                    <button onClick={() => deleteStudent(s.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;