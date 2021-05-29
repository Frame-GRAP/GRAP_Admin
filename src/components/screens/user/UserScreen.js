import React, {useState} from "react";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import User from "./User";
import "../../../index.css";

function UserScreen() {
    const [sidebarOpen, setsidebarOpen] = useState(false);

    const openSidebar = () => {
        setsidebarOpen(true);
    };
    const closeSidebar = () => {
        setsidebarOpen(false);
    };

    return (
        <div className="user_screen">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <User />
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>
    )
}

export default UserScreen;
