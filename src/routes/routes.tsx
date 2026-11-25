
import DashboardLayout from "@/components/modules/Dashboard/components/templates/LayOut";
import NotFoundPage from "@/core/ui-states/NotFoundState";
import ProtectedRoute from "@/guards/ProtectedRoute";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/Dashboard/DashboardHome/Dashboard";
import Mattings from "@/pages/Dashboard/Meetings/Mattings";
import Projects from "@/pages/Dashboard/projects/Projects";
import Reports from "@/pages/Dashboard/Reports/Reports";
import Tasks from "@/pages/Dashboard/Tasks/Tasks";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Register />,
  },

  {
    element: <ProtectedRoute />,
    
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/projects", element: <Projects /> },
          { path: "/reports", element: <Reports /> },
          { path: "/mattings", element: <Mattings /> },
          { path: "/tasks", element: <Tasks /> },
          { path: "/profile", element: <Tasks /> },
        ],
      },
    ],
    
  }, {
    path: "*",
    element: <NotFoundPage />,
  },
]);
