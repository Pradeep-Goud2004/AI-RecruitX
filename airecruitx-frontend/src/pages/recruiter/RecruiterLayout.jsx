import { Outlet } from "react-router-dom";

import Navbar from "../../components/Navbar";
import RecruiterSidebar from "../../components/RecruiterSidebar";

const RecruiterLayout = () => {

    return (
        <div className="app-layout">

            <Navbar />

            <div className="app-body">

                <RecruiterSidebar />

                <main className="main-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default RecruiterLayout;