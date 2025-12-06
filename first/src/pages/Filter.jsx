import { useState } from "react";
import axios from "axios";

export default function Filter() {

  const [clas, setClas] = useState("");
  const [students, setStudents] = useState([]);

  const filter = () => {
    axios.post(`http://localhost:8080/api/filter?clas=${clas}`)
      .then(res => {
        console.log("Filtered:", res.data);
        setStudents(res.data);
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Filter by Class</h2>

      <input placeholder="Enter Class" onChange={(e) => setClas(e.target.value)} /> <br /><br />

      <button onClick={filter}>Filter</button>

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
