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
import {deleteReport, deleteReview, deleteVideo} from "../../Service";
import ReportRow from "./ReportRow";
import "./Report.css";

function Report(){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage]= useState(10);
    const [reportData, setReportData] = useState([]);
    const [reportId, setReportId] = useState(0);
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''});
    const [loading, setLoading] = useState(true);
    const [more, setMore] = useState(false);
    const [reportFilter, setReportFilter] = useState({ fn: report => { return report; } });
    const [currentTab, setCurrentTab] = useState("All");

    const handleSort = (event, value) => {
        setCurrentTab(value);
        setReportFilter({
            fn: video => {
                if(value == "All")
                    return video;
                else if(value == "Video")
                    return video.filter(x => x.target == "video")
                else if(value == "Review")
                    return video.filter(x => x.target == "review")
            }
        })
    }

    const recordsAfterPagingAndSortingVideo = () => {
        return reportFilter.fn(reportData).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
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



    const getReview = (targetId) => {

    }

    async function refreshReport() {
        setReportData([]);
        const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/report/all`);

        setReportData(request.data);
        return request;
    }

    const onAccept = (reportId, type, targetId, gameId) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        if(type === "video"){
            deleteVideo(targetId);
        }
        else{
            deleteReview(targetId);
        }
        deleteReport(reportId).then(r => {
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            })
            refreshReport();
        })
    }

    const onReject = reportId => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteReport(reportId).then(r => {
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            })
            refreshReport();
        })
    }

    return (
        <div className="report_container">
            <div className="report_title">
                <h1>Report Info</h1>
            </div>
            <div className="report_selector">
                <Tabs value={currentTab} onChange={handleSort} aria-label="simple tabs example">
                    <Tab label="All" value="All" />
                    <Tab label="Video" value="Video"/>
                    <Tab label="Review" value="Review"/>
                </Tabs>
            </div>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No</TableCell>
                            <TableCell align="center">username</TableCell>
                            <TableCell align="center">reportType</TableCell>
                            <TableCell align="center">content</TableCell>
                            <TableCell align="center">modifiedDate</TableCell>
                            <TableCell align="center">target</TableCell>
                            <TableCell align="center">actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recordsAfterPagingAndSortingVideo()
                            .map((report, index) => (
                                <ReportRow
                                    key={index}
                                    index={index}
                                    report={report}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    getReview={getReview}
                                    setConfirmDialog={setConfirmDialog}
                                    onAccept={onAccept}
                                    onReject={onReject}
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
