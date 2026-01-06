export default function AdminLayout({ children }) {
  return (
    <div style={{ padding: "20px", background: "#f5f5f5", minHeight: "100vh" }}>
      {/* TOP BAR */}
      <div style={{ background: "#222", color: "#fff", padding: "10px" }}>
        <h2>Seller Admin Panel</h2>
      </div>

      {/* CONTENT */}
      <div style={{ marginTop: "20px", background: "#fff", padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}
