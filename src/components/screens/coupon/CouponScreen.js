import React, {useState} from "react";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import Coupon from "./Coupon";
import "../../../index.css";

function GameScreen() {
    const [sidebarOpen, setsidebarOpen] = useState(false);

    const openSidebar = () => {
        setsidebarOpen(true);
    };
    const closeSidebar = () => {
        setsidebarOpen(false);
    };

    return (
        <div className="game_screen">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <Coupon />
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>
    )
}

export default GameScreen;
