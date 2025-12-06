import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentApp() {
  const [name, setName] = useState("");
  const [clas, setClas] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const studentData = { name, clas, address };

    fetch("http://localhost:8080/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    })
      .then((res) => res.json())
      .then(() => {
        alert("Student Saved!");
        navigate("/students");   // 👈 Save ke baad list page par redirect
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /><br />
        <input value={clas} onChange={(e) => setClas(e.target.value)} placeholder="Class" /><br />
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" /><br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default StudentApp;
