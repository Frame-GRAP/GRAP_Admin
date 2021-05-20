import React, {useEffect, useState} from "react";
import './Main.css';
import axios from "axios";
import {useHistory} from "react-router-dom";

function Main() {
    const [gameCount, setGameCount] = useState(0);
    const [gameId, setGameId] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchGameLength() {
            const request = await axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/all");

            setGameCount(request.data.length);
            setGameId(request.data);
            return request;
        }

        fetchGameLength();
    }, [])

    return (
        <div className="main_container">
            <div className="main_title">
                <h1>GRAP Admin Page</h1>
            </div>

            <div className="main_cards">
                <div className="card" onClick={() => history.push("/game")}>
                    <i className="fa fa-gamepad fa-2x text-lightblue"></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Number of Games</p>
                        <span className="font-bold text-title">{gameCount}</span>
                    </div>
                </div>
                <div className="card" onClick={() => history.push("/video")}>
                    <i className="fa fa-video-camera fa-2x text-red"></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Number of Videos</p>
                        <span className="font-bold text-title"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
