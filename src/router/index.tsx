import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

// Layouts
import AuthLayout from "../components/layout/AuthLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

// Auth Pages
import Login from "../pages/public/Login";
import ResetPassword from "../pages/public/ResetPassword";
import ChangePassword from "../pages/public/ChangePassword";

import ProtectedRoute from "../pages/private/PrivateRoute";

import CfdisListPage from "../pages/private/cfdis/CfdisListPage";
import CfdisGestionPage from "../pages/private/cfdis/CfdisGestionPage";

import ProgramacionListPage from "../pages/private/programacion/ProgramacionListPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { index: true, element: <Navigate to="/login" replace /> },
            { path: 'login', element: <Login /> },
            { path: 'recover-password', element: <ResetPassword /> },
            { path: 'change-password', element: <ChangePassword /> },
        ],
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="cfdi" replace /> },

            // CFDI
            { path: 'cfdi', element: <CfdisListPage /> },
            { path: 'cfdi/create', element: <CfdisGestionPage /> },
            { path: 'cfdi/edit/:id', element: <CfdisGestionPage /> },


            // Programacion de pagos
            { path: 'programacion-pagos', element: <ProgramacionListPage /> },
        ],
    }
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;