import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // 🔹 Check if token exists

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}
