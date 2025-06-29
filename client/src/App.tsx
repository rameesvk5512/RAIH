import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routes/Router";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
        <Router />
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
