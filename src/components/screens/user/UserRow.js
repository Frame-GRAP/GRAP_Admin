import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Controller from "../../controls/Controller";
import {Box, Collapse, Table, TableBody, TableHead, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";

function UserRow(props) {
    const {index, user, userPage, rowsPerPage, openInPopup, setConfirmDialog, onDelete} = props;
    const [more, setMore] = useState(false);

    console.log(user.nickname);

    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {userPage * rowsPerPage + index + 1}
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell><img width="80px" height="80px" src={user.picture} alt="header"/></TableCell>
                <TableCell>{user.nickname}</TableCell>
                <TableCell>{user.membership}</TableCell>
                <TableCell>
                    <Controller.Button
                        text="Edit"
                        color="default"
                        size="small"
                        onClick={() => {openInPopup(user)}}/>
                    <Controller.Button
                        text="Delete"
                        color="default"
                        size="small"
                        onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                title:'정말 지우시겠습니까?',
                                subTitle:"되돌릴 수 없습니다.",
                                onConfirm: () => {onDelete(user.id)}
                            })
                        }}
                    />
                </TableCell>
            </TableRow>
        </>
    )
}

export default UserRow;
