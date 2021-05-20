import React, {useEffect, useState} from 'react';
import './game/Game.css'
import {
    Modal, Table, TableBody, TableContainer, TableFooter,
    TableHead, TablePagination,TableCell, TableRow,
    TextField,
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import './Video.css';

function Video(){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage]= useState(10);
    const [gameData, setGameData] = useState([]);
    const [gameId, setGameId] = useState(0);
    const [videoData, setvideoData] = useState([]);
    const [open, setOpen] = useState(false);

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

    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/all");

            setGameData(request.data);
            return request;
        }

        fetchData();
    }, []);

    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/all`);
            setvideoData(request.data);
            return request;
        }

        fetchData();
    }, [gameId]);

    const changeGameId = (event, value) => {
        setGameId(value.id)
    }

    const getVideo = (platform, urlKey) => {
        let player_Url;
        if(videoData.platform === "twitch"){
            player_Url = `https://clips.twitch.tv/embed?clip=${urlKey}&parent=localhost&autoplay=true&origin=http://localhost:3000`
        }else if(videoData.platform === "youtube"){
            player_Url = `https://www.youtube.com/embed/${urlKey}?autoplay=1&mute=0`
        }

        return (
            <iframe
                className="row_video"
                width="95%" height="95%"
                src={player_Url}
                scrolling="no"
                frameBorder="0"
                allow="autoplay"/>
        )
    }

    return (
        <div className="video_container">
            <div className="video_title">
                <h1>Game Select</h1>
            </div>
            <div className="game_selector">
                <Autocomplete
                    options={gameData}
                    getOptionLabel={(option => option.name)}
                    style={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Game Name" variant="outlined" />}
                    onChange={changeGameId}
                />
            </div>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>id</TableCell>
                            {/*<TableCell>gameName</TableCell>*/}
                            <TableCell>image</TableCell>
                            <TableCell>title</TableCell>
                            <TableCell>uploader</TableCell>
                            <TableCell>platform</TableCell>
                            <TableCell>video</TableCell>
                            <TableCell>liked</TableCell>
                            {/*<TableCell>isRegistered</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {videoData
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map((video, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {page * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell>{video.id}</TableCell>
                                    {/*<TableCell>{video.gameName}</TableCell>*/}
                                    <TableCell><img width="300px" height="150px" src={video.image} alt="header"/></TableCell>
                                    <TableCell>{video.title}</TableCell>
                                    <TableCell>{video.uploader}</TableCell>
                                    <TableCell>{video.platform}</TableCell>
                                    <TableCell >
                                        <button type="button" onClick={handleOpen}>
                                            Show Video
                                        </button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                        >
                                            <div className="modal_video">
                                                {getVideo(video.platform, video.urlKey)}
                                            </div>
                                        </Modal>
                                    </TableCell>
                                    <TableCell>{video.liked}</TableCell>
                                    {/*<TableCell>{video.isRegistered}</TableCell>*/}
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={gameData.length}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Video;
