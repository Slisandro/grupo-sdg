import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/private/Home";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/public/Login";
import ResetPassword from "./pages/public/ResetPassword";
import ChangePassword from "./pages/public/ChangePassword";
import ProgramacionPago from "./pages/private/Programacion";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-scheduling"
          element={
            <ProtectedRoute>
              <ProgramacionPago />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
