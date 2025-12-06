import { useState } from "react";
import axios from "axios";

export default function Sorting() {

  const [field, setField] = useState("name");
  const [dir, setDir] = useState("asc");
  const [students, setStudents] = useState([]);

  const sort = () => {
    axios.post(`http://localhost:8080/api/sort?field=${field}&direction=${dir}`)
      .then(res => {
        console.log("Sorted:", res.data);
        setStudents(res.data);
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Sorting</h2>

      <input placeholder="Field (name/clas/id)" onChange={(e) => setField(e.target.value)} /> <br /><br />
      <input placeholder="asc/desc" onChange={(e) => setDir(e.target.value)} /> <br /><br />

      <button onClick={sort}>Sort</button>

      <table border="1" cellPadding="10" style={{ marginTop: 20 }}>
        <thead><tr>
          <th>ID</th><th>Name</th><th>Class</th><th>Address</th>
        </tr></thead>

        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.clas}</td>
              <td>{s.address}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}
