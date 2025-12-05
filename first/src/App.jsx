import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [clas, setClas] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const studentData = { name, clas, address };

    fetch("http://localhost:8080/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(studentData)
    })
      .then(async (response) => {
        const text = await response.text(); 
        return text ? JSON.parse(text) : {}; 
      })
      .then((data) => {
        console.log("Saved:", data);
        alert("Student saved successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error occurred!");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Form</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /><br />
        <input value={clas} onChange={(e) => setClas(e.target.value)} placeholder="Class" /><br />
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" /><br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
