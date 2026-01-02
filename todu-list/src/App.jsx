// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import SimpleStudentPage from "./pages/SimpleStudentPage";
import AdvancedStudentPage from "./pages/AdvancedStudentPage";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Student Management (React + Spring Boot)</h1>

      {/* Simple navigation */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Simple CRUD</Link>
        <Link to="/advanced">Advanced (Pagination + Sort + Filter)</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SimpleStudentPage />} />
        <Route path="/advanced" element={<AdvancedStudentPage />} />
      </Routes>
    </div>
  );
}

export default App;
