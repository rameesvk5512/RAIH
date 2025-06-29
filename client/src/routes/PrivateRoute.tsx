import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Simulated auth check (replace with actual logic or context)
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
