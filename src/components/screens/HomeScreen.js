import React, {useState} from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Main from "./Main";

function HomeScreen() {
    const [sidebarOpen, setsidebarOpen] = useState(false);

    const openSidebar = () => {
        setsidebarOpen(true);
    };
    const closeSidebar = () => {
        setsidebarOpen(false);
    };

    return (
        <div className="home_screen">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <Main />
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>
    )
}

export default HomeScreen;
