import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/"); // redirect to login
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={handleLogout}>Logout</button>

      <br /><br />

      <Link to="/order">Place Order</Link>
    </div>
  );
}