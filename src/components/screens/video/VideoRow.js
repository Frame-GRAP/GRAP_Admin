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

export default function VideoRow(props) {
    const {index, video, page, rowsPerPage, getVideo, setConfirmDialog, onDelete, onRegister, onUnRegister, gameId} = props;
    const [more, setMore] = useState(false);
    const [registered, setRegistered] = useState("");
    const classes = useStyles();

    useEffect(() => {
        if(video.registered)
            setRegistered("true");
        else
            setRegistered("false");
    }, [video])

    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell>{video.id}</TableCell>
                <TableCell><img width="300px" height="150px" src={video.image} alt="header"/></TableCell>
                <TableCell>{video.title}</TableCell>
                <TableCell>{video.uploader}</TableCell>
                <TableCell>{video.platform}</TableCell>
                <TableCell>{video.liked}</TableCell>
                <TableCell className={classes.root}>
                    <Controller.Button
                        text="more"
                        color="default"
                        size="small"
                        onClick={() => setMore(!more)}/>
                    <Controller.Button
                        text="Delete"
                        color="secondary"
                        size="small"
                        onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                title:'정말 지우시겠습니까?',
                                subTitle:"되돌릴 수 없습니다.",
                                onConfirm: () => {onDelete(video.id)}
                            })
                        }}/>
                    {!video.registered ? (
                        <Controller.Button
                            text="Register"
                            color="primary"
                            size="small"
                            onClick={() => {
                                setConfirmDialog({
                                    isOpen: true,
                                    title:'등록하시겠습니까?',
                                    subTitle:"",
                                    onConfirm: () => {onRegister(video.id, gameId)}
                                })
                            }}/>
                    ) : (
                        <Controller.Button
                            text="UnRegister"
                            color="secondary"
                            size="small"
                            onClick={() => {
                                setConfirmDialog({
                                    isOpen: true,
                                    title:'등록취소하시겠습니까?',
                                    subTitle:"",
                                    onConfirm: () => {onRegister(video.id, gameId)}
                                })
                            }}/>
                    )}

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
                                        <TableCell>video</TableCell>
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
            </TableRow>
        </>
    )

}
