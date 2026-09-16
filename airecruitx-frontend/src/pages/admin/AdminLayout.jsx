import { Outlet } from "react-router-dom";

import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";

const AdminLayout = () => {

    return (
        <div className="app-layout">

            <Navbar />

            <div className="app-body">

                <AdminSidebar />

                <main className="main-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default AdminLayout;