import React, {useEffect, useState} from 'react';
import {
    Modal, Table, TableBody, TableContainer, TableFooter,
    TableHead, TablePagination, TableCell, TableRow,
    TextField, Collapse, Box, Typography, Tab, Tabs,
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import Controller from "../../controls/Controller";
import Notification from "../../controls/Notification";
import ConfirmDialog from "../../controls/ConfirmDialog";
import {deleteVideo, registerVideo} from "../../Service";
import ReportRow from "./ReportRow";
import "./Report.css";

function Report(){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage]= useState(10);
    const [reportData, setReportData] = useState([]);
    const [reportId, setReportId] = useState(0);
    const [videoData, setVideoData] = useState([]);
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''});
    const [loading, setLoading] = useState(true);
    const [more, setMore] = useState(false);
    const [videoFilter, setVideoFilter] = useState({ fn: report => { return report; } });
    const [currentTab, setCurrentTab] = useState("All");

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

    /*const recordsAfterPagingAndSortingVideo = () => {
        return videoFilter.fn(videoData).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }*/

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
            const request = await axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/report/all");

            setReportData(request.data);
            return request;
        }

        fetchData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, []);

    /*useEffect(()=> {
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

    const changeGameId = (event, value) => {
        setGameId(value.id)
    }*/

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

    /*async function refreshVideo() {
        const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/all`);

        setVideoData(request.data);
        return request;
    }*/

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        /*deleteVideo(id, gameId).then(r => {
            refreshVideo().then(r => {setLoading(false);})
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            })
            window.location.reload(false);
        });*/
    }

    const onRegister = (videoId, gameId) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        /*registerVideo(videoId, gameId).then(r => {
            refreshVideo().then(r => {setLoading(false);})
            setNotify({
                isOpen: true,
                message: 'Register Successfully',
                type: 'success'
            });
            window.location.reload(false);
        })*/
    }

    return (
        <div className="report_container">
            <div className="report_title">
                <h1>Report Info</h1>
            </div>
            <div className="report_selector">
                {/*<Autocomplete
                    options={reportData}
                    getOptionLabel={(option => option.name)}
                    style={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Game Name" variant="outlined" />}
                    onChange={changeGameId}
                />*/}
                <Tabs value={currentTab} onChange={handleSort} aria-label="simple tabs example">
                    <Tab label="All" value="All" />
                    <Tab label="Processing" value="Processing"/>
                    <Tab label="Completed" value="Not Registered"/>
                </Tabs>
            </div>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>id</TableCell>
                            <TableCell>username</TableCell>
                            <TableCell>reportType</TableCell>
                            <TableCell>content</TableCell>
                            <TableCell>modifiedDate</TableCell>
                            <TableCell>actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.map((report, index) => (
                                <ReportRow
                                    key={index}
                                    index={index}
                                    report={report}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    getVideo={getVideo}
                                    setConfirmDialog={setConfirmDialog}
                                    onDelete={onDelete}
                                    onRegister={onRegister}
                                />
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={reportData.length}
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

export default Report;
