import React from "react";
import './Sidebar.css';
import logo from "../../img/grap_logo2-2.png";
import {Link, useHistory, useLocation} from "react-router-dom";

function Sidebar({ sidebarOpen, closeSidebar }) {
    const pathName = useLocation().pathname;
    const history = useHistory();


    return (
        <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
            <div className="sidebar_title">
                <div className="sidebar_img">
                    <img src={logo} alt="logo" />
                </div>
                <i onClick={() => closeSidebar()}
                   className="fa fa-times"
                   id="sidebarIcon"
                   aria-hidden="true"/>
            </div>
            <div className="sidebar_menu">
                <div className={`sidebar_link ${(pathName === "/") && "active_menu_link"}`} onClick={() => history.push("/")}>
                    <i className="fa fa-home"></i>
                    <a>Home</a>
                </div>
                <h2>Data</h2>
                <div className={`sidebar_link ${(pathName === "/game") && "active_menu_link"}`} onClick={() => history.push("/game")}>
                    <i className="fa fa-gamepad" aria-hidden="true"></i>
                    <a>Game</a>
                </div>
                <div className={`sidebar_link ${(pathName === "/video") && "active_menu_link"}`} onClick={() => history.push("/video")}>
                    <i className="fa fa-video-camera"></i>
                    <a>Video</a>
                </div>
                <div className="sidebar_logout">
                    <i className="fa fa-power-off"></i>
                    <a href="#">Log out</a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
