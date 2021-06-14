import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Controller from "../../controls/Controller";
import {Box, Collapse, makeStyles, Table, TableBody, TableHead, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function ReportRow(props) {
    const {index, report, page, rowsPerPage, getReview, setConfirmDialog, onAccept, onReject} = props;
    const [more, setMore] = useState(false);
    const [playerUrl, setPlayerUrl] = useState("");
    const [content, setContent] = useState("");
    const [targetId, setTargetId] = useState("");
    const classes = useStyles();

    useEffect(()=>{
        setTargetId(report.targetId);
    }, []);


    useEffect(() => {
        if(report.target === "video"){
            axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/video/${targetId}`)
                .then((res) =>{
                    const urlKey = res.data.urlKey;
                    const platform = res.data.platform;

                    if(platform === "twitch"){
                        setPlayerUrl(`https://clips.twitch.tv/embed?clip=${urlKey}&parent=localhost&autoplay=true&origin=http://localhost:3000`);
                    }else if(platform === "youtube"){
                        setPlayerUrl(`https://www.youtube.com/embed/${urlKey}?autoplay=1&mute=0`);
                    }
                })
        }
        else{
            axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/review/${targetId}`)
                .then((res) =>{
                    setContent(res.data.content);
                })
        }

    }, [more]);



    return (
        <>
            <TableRow key={index}>
                <TableCell align="center" component="th" scope="row">
                    {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center">{report.username}</TableCell>
                <TableCell align="center">{report.reportType}</TableCell>
                <TableCell align="center">{report.content}</TableCell>
                <TableCell align="center">{report.modifiedDate}</TableCell>
                <TableCell align="center">{report.target}</TableCell>
                <TableCell align="center">
                    <Controller.Button
                        text="more"
                        color="default"
                        size="small"
                        onClick={() => setMore(!more)}/>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={more} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                More Info
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">target</TableCell>
                                        <TableCell align="center">actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {report.target === "video" ? (
                                        <TableRow style={{ height: "300px" }}>
                                            <TableCell align="center">
                                                {playerUrl !== "" &&
                                                <iframe
                                                    className="row_video"
                                                    width="400px" height="300px"
                                                    src={playerUrl}
                                                    scrolling="no"
                                                    frameBorder="0"
                                                    allow="autoplay"
                                                />}
                                            </TableCell >
                                            <TableCell align="center" className={classes.root}>
                                                <Controller.Button
                                                    text="ACCEPT"
                                                    color="default"
                                                    size="small"
                                                    onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title:'해당 영상을 지우시겠습니까?',
                                                            subTitle:"되돌릴 수 없습니다.",
                                                            onConfirm: () => {onAccept(report.id, report.target, report.targetId, report.gameId)}
                                                        })
                                                    }}
                                                />
                                                <Controller.Button
                                                    text="REJECT"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title:'신고를 반려하시겠습니까?',
                                                            subTitle:"되돌릴 수 없습니다.",
                                                            onConfirm: () => {onReject(report.id)}
                                                        })
                                                    }}/>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        <TableRow style={{ height: "100px" }}>
                                            <TableCell align="center">
                                                {content}
                                            </TableCell>
                                            <TableCell align="center" className={classes.root}>
                                                <Controller.Button
                                                    text="ACCEPT"
                                                    color="default"
                                                    size="small"
                                                    onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title:'해당 댓글을 삭제하시겠습니까?',
                                                            subTitle:"되돌릴 수 없습니다.",
                                                            onConfirm: () => {onAccept(report.id, report.target, report.targetId)}
                                                        })
                                                    }}/>
                                                <Controller.Button
                                                    text="DENY"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title:'신고를 반려하시겠습니까?',
                                                            subTitle:"되돌릴 수 없습니다.",
                                                            onConfirm: () => {onReject(report.id)}
                                                        })
                                                    }}/>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )

}

export default ReportRow;
