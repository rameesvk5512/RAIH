import { Routes, Route } from "react-router-dom";
import { routes } from "./Routes";
import PrivateRoute from "./PrivateRoute";
import { AnimatePresence } from "framer-motion";

const Router: React.FC = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            element={
              route.private ? (
                <PrivateRoute>{route.element}</PrivateRoute>
              ) : (
                route.element
              )
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
