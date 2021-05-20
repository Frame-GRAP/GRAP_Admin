import React, {useState} from "react";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import Game from "./Game";
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
            <Game />
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>
    )
}

export default GameScreen;
