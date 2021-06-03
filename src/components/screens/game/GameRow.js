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

export default function GameRow(props) {
    const {index, game, gamePage, rowsPerPage, openInPopup, setConfirmDialog, onDelete} = props;
    const [more, setMore] = useState(false);
    const [releaseDate, setReleaseDate] = useState("");
    const classes = useStyles();

    useEffect(() => {
        setReleaseDate(game.releaseDate);
    }, [game]);


    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {gamePage * rowsPerPage + index + 1}
                </TableCell>
                <TableCell>{game.name}</TableCell>
                <TableCell><img width="200px" height="100px" src={game.headerImg} alt="header"/></TableCell>
                <TableCell>{game.price}</TableCell>
                <TableCell>{game.publisher}</TableCell>
                <TableCell>{releaseDate}</TableCell>
                <TableCell className={classes.root}>
                    <Controller.Button
                        text="Edit"
                        color="default"
                        size="small"
                        onClick={() => {openInPopup(game)}}/>
                    <Controller.Button
                        text="Delete"
                        color="secondary"
                        size="small"
                        onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                title:'정말 지우시겠습니까?',
                                subTitle:"되돌릴 수 없습니다.",
                                onConfirm: () => {onDelete(game.id)}
                            })
                        }}
                    />
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
                                        <TableCell>description</TableCell>
                                        <TableCell>lastVideoCrawled</TableCell>
                                        <TableCell>downloadUrl</TableCell>
                                        <TableCell>VoteCount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{game.description}</TableCell>
                                        <TableCell>{game.lastVideoCrawled}</TableCell>
                                        <TableCell>{game.downloadUrl}</TableCell>
                                        <TableCell>{game.vote_count}</TableCell>
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
