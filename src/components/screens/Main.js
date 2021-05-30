import React, {useEffect, useState} from "react";
import './Main.css';
import axios from "axios";
import {useHistory} from "react-router-dom";

function Main() {
    const [gameCount, setGameCount] = useState(0);
    const [videoCount, setVideoCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [reportCount, setReportCount] = useState(0);
    const [gameId, setGameId] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchGameLength() {
            axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/countAll").then((res)=>{
                setGameCount(res.data);
            })
            axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/video/countAll").then((res) => {
                setVideoCount(res.data);
            })
            axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/countAll").then((res) =>{
                setUserCount(res.data);
            })
            axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/report/countAll").then((res) => {
                setReportCount(res.data);
            })
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
                        <span className="font-bold text-title">{videoCount}</span>
                    </div>
                </div>
                <div className="card" onClick={() => history.push("/user")}>
                    <i className="fa fa-user fa-2x text-lightblue"></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Number of Users</p>
                        <span className="font-bold text-title">{userCount}</span>
                    </div>
                </div>
                <div className="card" onClick={() => history.push("/coupon")}>
                    <i className="fa fa-money fa-2x text-red"></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Number of Coupons</p>
                        <span className="font-bold text-title">5890</span>
                    </div>
                </div>
                <div className="card" onClick={() => history.push("/report")}>
                    <i className="fa fa-shield fa-2x text-lightblue"></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Number of Report</p>
                        <span className="font-bold text-title">{reportCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
