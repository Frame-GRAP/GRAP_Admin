import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Controller from "../../controls/Controller";
import {Box, Collapse, makeStyles, Table, TableBody, TableHead, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function ReportRow(props) {
    const {index, report, page, rowsPerPage, getVideo, setConfirmDialog, onAccept, onReject} = props;
    const [more, setMore] = useState(false);
    const classes = useStyles();

    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell>{report.username}</TableCell>
                <TableCell>{report.reportType}</TableCell>
                <TableCell>{report.content}</TableCell>
                <TableCell>{report.modifiedDate}</TableCell>
                <TableCell>{report.target}</TableCell>
                <TableCell>
                    <Controller.Button
                        text="more"
                        color="primary"
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
                                        <TableCell>target</TableCell>
                                        <TableCell>actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {report.target === "video" ? (
                                        <TableRow style={{ height: "300px" }}>
                                            <TableCell >
                                                {/*{getVideo(video.platform, video.urlKey)}*/}
                                            </TableCell >
                                            <TableCell className={classes.root}>
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
                                            <TableCell >
                                                {/*{getVideo(video.platform, video.urlKey)}*/}
                                            </TableCell>
                                            <Controller.Button
                                                text="ACCEPT"
                                                color="primary"
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
                                                color="primary"
                                                size="small"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title:'신고를 반려하시겠습니까?',
                                                        subTitle:"되돌릴 수 없습니다.",
                                                        onConfirm: () => {onReject(report.id)}
                                                    })
                                                }}/>
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
