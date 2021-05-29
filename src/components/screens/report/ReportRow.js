import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Controller from "../../controls/Controller";
import {Box, Collapse, Table, TableBody, TableHead, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";

function ReportRow(props) {
    const {index, report, page, rowsPerPage, getVideo, setConfirmDialog, onDelete, onRegister, onUnRegister, gameId} = props;
    const [more, setMore] = useState(false);

/*
    useEffect(() => {
        if(video.registered)
            setRegistered("true");
        else
            setRegistered("false");
    }, [video])
*/

    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.username}</TableCell>
                <TableCell>{report.reportType}</TableCell>
                <TableCell>{report.content}</TableCell>
                <TableCell>{report.modifiedDate}</TableCell>
                <TableCell>
                    <Controller.Button
                        text="more"
                        color="primary"
                        size="small"
                        onClick={() => setMore(!more)}/>
                    <Controller.Button
                        text="Delete"
                        color="primary"
                        size="small"
                        onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                title:'정말 지우시겠습니까?',
                                subTitle:"되돌릴 수 없습니다.",
                                onConfirm: () => {onDelete(report.id)}
                            })
                        }}/>
                </TableCell>
            </TableRow>
            {/*<TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={more} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                More Info
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>video or comment</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow style={{ height: "300px" }}>
                                        <TableCell >
                                            {getVideo(video.platform, video.urlKey)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>*/}
        </>
    )

}

export default ReportRow;
