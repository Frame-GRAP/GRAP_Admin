import React, {useState} from "react";
import Navbar from "../navbar/Navbar";
import Main from "./Main";
import Sidebar from "../sidebar/Sidebar";
import Video from './Video';
import "../../App.css";

function VideoScreen() {
    const [sidebarOpen, setsidebarOpen] = useState(false);

    const openSidebar = () => {
        setsidebarOpen(true);
    };

    const closeSidebar = () => {
        setsidebarOpen(false);
    };

    return (
        <div className="video_screen">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <Video />
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>
    )
}

export default VideoScreen;
