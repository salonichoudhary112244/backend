import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddStudent from "./pages/AddStudent";
import ViewStudents from "./pages/ViewStudent";
import Pagination from "./pages/pagination";
import Sorting from "./pages/Sorting";
import Filter from "./pages/Filter";

function App() {
  return (
    <BrowserRouter>

      <nav style={{ padding: 15, background: "#eee" }}>
        <Link to="/" style={{ marginRight: 20 }}>Add</Link>
        <Link to="/view" style={{ marginRight: 20 }}>View</Link>
        <Link to="/pagination" style={{ marginRight: 20 }}>Pagination</Link>
        <Link to="/sorting" style={{ marginRight: 20 }}>Sorting</Link>
        <Link to="/filter">Filter</Link>
      </nav>

      <Routes>
        <Route path="/" element={<AddStudent />} />
        <Route path="/view" element={<ViewStudents />} />
        <Route path="/pagination" element={<Pagination/>} />
        <Route path="/sorting" element={<Sorting/>} />
        <Route path="/filter" element={<Filter />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
