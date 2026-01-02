import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="p-6">
      <h1>Welcome 🎉</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
