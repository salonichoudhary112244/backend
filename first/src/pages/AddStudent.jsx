import { useState } from "react";
import axios from "axios";

export default function AddStudent() {

  const [data, setData] = useState({ name: "", clas: "", address: "" });

  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const save = async () => {
    console.log("Saving:", data);
    const res = await axios.post("http://localhost:8080/api/save", data);
    console.log("Response:", res.data);
    alert("Saved!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Student</h2>

      <input name="name" placeholder="Name" onChange={handle} /> <br /><br />
      <input name="clas" placeholder="Class" onChange={handle} /> <br /><br />
      <input name="address" placeholder="Address" onChange={handle} /> <br /><br />

      <button onClick={save}>Save</button>
    </div>
  );
}
