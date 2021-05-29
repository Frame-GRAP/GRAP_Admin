import React, {useState} from "react";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import "../../../App.css";
import Report from "./Report";

function ReportScreen() {
    const [sidebarOpen, setsidebarOpen] = useState(false);

    const openSidebar = () => {
        setsidebarOpen(true);
    };

    const closeSidebar = () => {
        setsidebarOpen(false);
    };

    return (
        <div className="report_screen">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <Report />
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>
    )
}

export default ReportScreen;
