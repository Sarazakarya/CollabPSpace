import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../Navbar/organisms/DashboardNavbar";

export default function DashboardLayout() {
  return (
    <div className="ds-bg min-h-screen">
      <DashboardNavbar />
      <main className="ds-container flex flex-col gap-4 py-6">
        {" "}
        <Outlet />
      </main>
    </div>
  );
}
