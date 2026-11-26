import ProjectOverView from "@/components/modules/Dashboard/Projects/templates/ProjectOverView";
import DashboardLayout from "@/components/modules/Dashboard/components/templates/LayOut";
import ProjectLayout from "@/components/modules/Dashboard/Projects/templates/ProjectLayOut";
import NotFoundPage from "@/core/ui-states/NotFoundState";
import ProtectedRoute from "@/guards/ProtectedRoute";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/Dashboard/DashboardHome/Dashboard";
import ProjectOverviewDetails from "@/components/modules/Dashboard/ProjectOverView/organisms/ProjectOverviewDetails";
import Projects from "@/pages/Dashboard/projects/Projects";
import ProjectTasks from "@/components/modules/Dashboard/ProjectTasks/organinsms/ProjectTasks";
import ProjectTeams from "@/components/modules/Dashboard/ProjectTeams/organisms/ProjectTeams";
import Reports from "@/pages/Dashboard/Reports/Reports";
import Tasks from "@/pages/Dashboard/Tasks/Tasks";
import { createBrowserRouter } from "react-router-dom";
import ProjectFiles from "@/components/modules/Dashboard/ProjectFiles/organisms/ProjectFiles";
import ChatLayout from "@/components/modules/Dashboard/Chats/template/ChatLayout";
import Chats from "@/pages/Dashboard/chats/Chats";
import ChatRoom from "@/components/modules/Dashboard/Chats/organsisms/ChatRoom";
import MeetingDetailsPage from "@/components/modules/Dashboard/Meeting/organisms/MeetingDetailsPage";
import Mattings from "@/pages/Dashboard/Meetings/Mattings";

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
          {
            path: "/projects",
            element: <ProjectLayout />,
            children: [
              {
                index: true,
                element: <Projects />,
              },
            ],
          },
          {
            path: "/projects/:id",
            element: <ProjectOverView />,
            children: [
              {
                index: true,
                element: <ProjectOverviewDetails />,
              },
              {
                path: "tasks",
                element: <ProjectTasks />,
              },
              {
                path: "teams",
                element: <ProjectTeams />,
              },
              {
                path: "files",
                element: <ProjectFiles />,
              },
            ],
          },
          {
            path: "/chats",
            element: <ChatLayout />,
            children: [
              { index: true, element: <Chats /> },
              { path: ":projectId", element: <ChatRoom /> },
            ],
          },
          { path: "/reports", element: <Reports /> },
          { path: "/meetings", element: <Mattings /> },
          { path: "/meetings/:id", element: <MeetingDetailsPage /> },
          { path: "/tasks", element: <Tasks /> },
          { path: "/profile", element: <Tasks /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
