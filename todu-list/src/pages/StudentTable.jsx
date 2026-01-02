// src/components/StudentTable.jsx

/**
 * Simple table jisme:
 *  - students list show
 *  - edit button
 *  - delete button
 * props:
 *  - students
 *  - onEdit(student)
 *  - onDelete(id)
 */
export default function StudentTable({ students, onEdit, onDelete }) {
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
