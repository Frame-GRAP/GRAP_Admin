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
                <TableCell align="center" component="th" scope="row">
                    {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center"><img width="300px" height="150px" src={video.image} alt="header"/></TableCell>
                <TableCell align="center">{video.title}</TableCell>
                <TableCell align="center">{video.uploader}</TableCell>
                <TableCell align="center">{video.platform}</TableCell>
                <TableCell align="center">{video.liked}</TableCell>
                <TableCell align="center" className={classes.root}>
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
                                title:'?????? ??????????????????????',
                                subTitle:"????????? ??? ????????????.",
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
                                    title:'?????????????????????????',
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
                                    title:'???????????????????????????????',
                                    subTitle:"",
                                    onConfirm: () => {onRegister(video.id, gameId)}
                                })
                            }}/>
                    )}

                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={more} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                More Info
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">video</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow style={{ height: "300px" }}>
                                        <TableCell align="center">
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
