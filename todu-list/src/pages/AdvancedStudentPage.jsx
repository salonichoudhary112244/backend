// src/pages/AdvancedStudentPage.jsx
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/api";

// ==== API FUNCTIONS yahi pe ====
async function fetchStudentsPage(pg, size) {
  const res = await fetch(
    `${API_BASE_URL}/page?pg=${pg}&size=${size}`,
    { method: "POST" }
  );
  return res.json();
}

async function fetchStudentsSorted(field, direction) {
  const res = await fetch(
    `${API_BASE_URL}/sort?field=${field}&direction=${direction}`,
    { method: "POST" }
  );
  return res.json();
}

async function fetchStudentsByClass(clas) {
  const res = await fetch(
    `${API_BASE_URL}/filter?clas=${encodeURIComponent(clas)}`,
    { method: "POST" }
  );
  return res.json();
}

// ==== PAGE COMPONENT ====
export default function AdvancedStudentPage() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0); // backend page index
  const [size, setSize] = useState(5);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterClass, setFilterClass] = useState("");
  const [mode, setMode] = useState("page"); // "page" | "sort" | "filter"
  const [loading, setLoading] = useState(false);

  // default: pagination mode me page load karo
  useEffect(() => {
    if (mode === "page") {
      loadPage();
    }
  }, [page, size, mode]);

  const loadPage = async () => {
    try {
      setLoading(true);
      const data = await fetchStudentsPage(page, size);
      console.log("Page data:", data);
      setStudents(data);
    } catch (err) {
      console.error("Error in pagination:", err);
      alert("Error in pagination. Console check karo.");
    } finally {
      setLoading(false);
    }
  };

  const loadSorted = async () => {
    try {
      setLoading(true);
      const data = await fetchStudentsSorted(sortField, sortDirection);
      console.log("Sorted data:", data);
      setStudents(data);
    } catch (err) {
      console.error("Error in sorting:", err);
      alert("Error in sorting. Console check karo.");
    } finally {
      setLoading(false);
    }
  };

  const loadFiltered = async () => {
    if (!filterClass.trim()) {
      alert("Class dal ke filter karo");
      return;
    }
    try {
      setLoading(true);
      const data = await fetchStudentsByClass(filterClass);
      console.log("Filtered data:", data);
      setStudents(data);
    } catch (err) {
      console.error("Error in filtering:", err);
      alert("Error in filtering. Console check karo.");
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "page") {
      loadPage();
    } else if (newMode === "sort") {
      loadSorted();
    }
    // filter mode me user ko class daalne do
  };

  return (
    <div>
      <h2>Advanced (Pagination + Sorting + Filter)</h2>

      {/* Mode buttons */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
      >
        <strong>Mode: </strong>
        <button
          onClick={() => handleModeChange("page")}
          style={{ marginRight: "5px" }}
        >
          Pagination
        </button>
        <button
          onClick={() => handleModeChange("sort")}
          style={{ marginRight: "5px" }}
        >
          Sorting
        </button>
        <button onClick={() => handleModeChange("filter")}>Filter</button>
      </div>

      {/* Pagination controls */}
      {mode === "page" && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h4>Pagination</h4>
          <div style={{ marginBottom: "8px" }}>
            <label>
              Page:{" "}
              <input
                type="number"
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
                style={{ width: "60px" }}
              />
            </label>

            <label style={{ marginLeft: "10px" }}>
              Size:{" "}
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                style={{ width: "60px" }}
              />
            </label>

            <button onClick={loadPage} style={{ marginLeft: "10px" }}>
              Load Page
            </button>
          </div>
          <small>Note: Page index 0 se start hota hai (0,1,2...)</small>
        </div>
      )}

      {/* Sorting controls */}
      {mode === "sort" && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h4>Sorting</h4>
          <div style={{ marginBottom: "8px" }}>
            <label>
              Field:{" "}
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="name">name</option>
                <option value="clas">clas</option>
                <option value="address">address</option>
                <option value="id">id</option>
              </select>
            </label>

            <label style={{ marginLeft: "10px" }}>
              Direction:{" "}
              <select
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
              >
                <option value="asc">asc</option>
                <option value="desc">desc</option>
              </select>
            </label>

            <button onClick={loadSorted} style={{ marginLeft: "10px" }}>
              Sort Now
            </button>
          </div>
        </div>
      )}

      {/* Filter controls */}
      {mode === "filter" && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h4>Filter by Class</h4>
          <div style={{ marginBottom: "8px" }}>
            <label>
              Class:{" "}
              <input
                type="text"
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
              />
            </label>

            <button onClick={loadFiltered} style={{ marginLeft: "10px" }}>
              Filter
            </button>
          </div>
        </div>
      )}

      {loading && <p>Loading...</p>}

      {/* Common table */}
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
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
