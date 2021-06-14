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

function UserRow(props) {
    const {index, user, userPage, rowsPerPage, openInPopup, setConfirmDialog, onDelete} = props;
    const [more, setMore] = useState(false);
    const classes = useStyles();

    return (
        <>
            <TableRow key={index}>
                <TableCell align="center" component="th" scope="row">
                    {userPage * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center"><img width="80px" height="80px" src={user.picture} alt="header"/></TableCell>
                <TableCell align="center">{user.nickname}</TableCell>
                <TableCell align="center">{user.membership ? (user.membership) : ("None")}</TableCell>
                <TableCell className={classes.root} align="center">
                    {/*<Controller.Button
                        text="Edit"
                        color="default"
                        size="small"
                        onClick={() => {openInPopup(user)}}/>*/}
                    <Controller.Button
                        text="Delete"
                        color="secondary"
                        size="small"
                        onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                title:'정말 지우시겠습니까?',
                                subTitle:"되돌릴 수 없습니다.",
                                onConfirm: () => {onDelete(user.id, index)}
                            })
                        }}
                    />
                </TableCell>
            </TableRow>
        </>
    )
}

export default UserRow;
