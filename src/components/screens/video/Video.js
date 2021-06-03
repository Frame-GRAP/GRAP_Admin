import React, {useEffect, useState} from 'react';
import '../game/Game.css'
import {
    Modal, Table, TableBody, TableContainer, TableFooter,
    TableHead, TablePagination, TableCell, TableRow,
    TextField, Collapse, Box, Typography, Tab, Tabs,
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import './Video.css';
import Controller from "../../controls/Controller";
import Notification from "../../controls/Notification";
import ConfirmDialog from "../../controls/ConfirmDialog";
import {deleteVideo, registerVideo} from "../../Service";
import VideoRow from "./VideoRow";

function Video(){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage]= useState(10);
    const [gameData, setGameData] = useState([]);
    const [videoData, setVideoData] = useState([]);
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''});
    const [loading, setLoading] = useState(true);
    const [more, setMore] = useState(false);
    const [videoFilter, setVideoFilter] = useState({ fn: video => { return video; } });
    const [currentTab, setCurrentTab] = useState("All");

    const [searchResult, setSearchResult] = useState([]);
    const [gameName, setGameName] = useState("");
    const [gameId, setGameId] = useState(0);

    const handleSort = (event, value) => {
        setCurrentTab(value);
        setVideoFilter({
            fn: video => {
                if(value == "All")
                    return video;
                else if(value == "Registered")
                    return video.filter(x => x.registered == true)
                else if(value == "Not Registered")
                    return video.filter(x => x.registered == false)
            }
        })
    }

    const recordsAfterPagingAndSortingVideo = () => {
        return videoFilter.fn(videoData).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function fetchGameData() {
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game?name=${gameName}`);

            setSearchResult(request.data);
            return request;
        }

        fetchGameData();
    }, [gameName])

    useEffect(()=> {
        setLoading(true);
        async function fetchData() {
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/all`);

            setVideoData(request.data);
            return request;
        }

        fetchData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [gameId]);


    const getVideo = (platform, urlKey) => {
        let player_Url = "";
        if(platform === "twitch"){
            player_Url = `https://clips.twitch.tv/embed?clip=${urlKey}&parent=localhost&autoplay=true&origin=http://localhost:3000`
        }else if(platform === "youtube"){
            player_Url = `https://www.youtube.com/embed/${urlKey}?autoplay=1&mute=0`
        }

        return (
            <iframe
                className="row_video"
                width="400px" height="300px"
                src={player_Url}
                scrolling="no"
                frameBorder="0"
                allow="autoplay"/>
        )
    }

    async function refreshVideo() {
        const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/all`);

        setVideoData(request.data);
        return request;
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteVideo(id, gameId).then(r => {
            refreshVideo().then(r => {setLoading(false);})
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            })
            refreshVideo();
        });
    }

    const onRegister = (videoId, gameId) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        registerVideo(videoId, gameId).then(r => {
            refreshVideo().then(r => {setLoading(false);})
            setNotify({
                isOpen: true,
                message: 'Register Successfully',
                type: 'success'
            });
            refreshVideo();
        })
    }

    const changeGameName = (event) => {
        setTimeout(() => {
            const getName = event.target.value;
            if(getName !== "")
                setGameName(getName);
        }, 1000);
    }

    const changeGameId = (event, value) => {
        const getId = value.id;
        setGameId(getId);
    }

    return (
        <div className="video_container">
            <div className="video_title">
                <h1>Game Select</h1>
            </div>
            <div className="game_selector">
                <Autocomplete
                    id="combo-box-demo"
                    options={searchResult}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Game Name" variant="outlined" onChange={changeGameName}/>}
                    onChange={changeGameId}
                />
                <Tabs value={currentTab} onChange={handleSort} aria-label="simple tabs example">
                    <Tab label="All" value="All" />
                    <Tab label="Registered" value="Registered"/>
                    <Tab label="Not Registered" value="Not Registered"/>
                </Tabs>
            </div>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>image</TableCell>
                            <TableCell>title</TableCell>
                            <TableCell>uploader</TableCell>
                            <TableCell>platform</TableCell>
                            <TableCell>liked</TableCell>
                            <TableCell>actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recordsAfterPagingAndSortingVideo()
                            .map((video, index) => (
                                <VideoRow
                                    key={index}
                                    index={index}
                                    video={video}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    getVideo={getVideo}
                                    setConfirmDialog={setConfirmDialog}
                                    onDelete={onDelete}
                                    onRegister={onRegister}
                                    gameId={gameId}
                                />
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={videoData.length}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    );
}

export default Video;
