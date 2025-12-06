import { useState } from "react";
import axios from "axios";

export default function Pagination() {

  const [pg, setPg] = useState(0);
  const [size, setSize] = useState(2);
  const [students, setStudents] = useState([]);

  const loadPage = () => {
    axios.post(`http://localhost:8080/api/page?pg=${pg}&size=${size}`)
      .then(res => {
        console.log("Pagination:", res.data);
        setStudents(res.data);
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Pagination</h2>

      <input placeholder="Page" onChange={(e) => setPg(e.target.value)} /> <br /><br />
      <input placeholder="Size" onChange={(e) => setSize(e.target.value)} /> <br /><br />

      <button onClick={loadPage}>Load</button>

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
