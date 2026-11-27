import { createBrowserRouter } from "react-router-dom";
import {
  ProjectOverView,
  DashboardLayout,
  ProjectLayout,
  NotFoundPage,
  ProtectedRoute,
  GuestRoute,
  Login,
  Register,
  Dashboard,
  ProjectOverviewDetails,
  Projects,
  ProjectTasks,
  ProjectTeams,
  Reports,
  Tasks,
  ProjectFiles,
  ChatLayout,
  Chats,
  ChatRoom,
  MeetingDetailsPage,
  Mattings,
  Profile,
} from "./routeimport";

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      { path: "/sign-in", element: <Login /> },
      { path: "/sign-up", element: <Register /> },
    ],
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
            children: [{ index: true, element: <Projects /> }],
          },
          {
            path: "/projects/:id",
            element: <ProjectOverView />,
            children: [
              { index: true, element: <ProjectOverviewDetails /> },
              { path: "tasks", element: <ProjectTasks /> },
              { path: "teams", element: <ProjectTeams /> },
              { path: "files", element: <ProjectFiles /> },
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
          { path: "/profile", element: <Profile /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
