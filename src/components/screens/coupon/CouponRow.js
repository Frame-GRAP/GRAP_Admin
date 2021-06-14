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


export default function CouponRow(props) {
    const {index, coupon, couponPage, rowsPerPage, openInPopup, setConfirmDialog, onDelete} = props;
    const [expirationDate, setExpirationDate] = useState("");
    const classes = useStyles();

    useEffect(() => {
        setExpirationDate(coupon.expirationDate);
    }, [coupon]);


    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {couponPage * rowsPerPage + index + 1}
                </TableCell>
                <TableCell>{coupon.name}</TableCell>
                <TableCell>{expirationDate}</TableCell>
                <TableCell><img width="200px" height="100px" src={coupon.gameHeaderImage} alt="header"/></TableCell>
                <TableCell>{coupon.gameName}</TableCell>
                <TableCell className={classes.root}>
                    <Controller.Button
                        text="Edit"
                        color="default"
                        size="small"
                        onClick={() => {openInPopup(coupon)}}
                    />
                    <Controller.Button
                        text="Delete"
                        color="secondary"
                        size="small"
                        onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                title:'정말 지우시겠습니까?',
                                subTitle:"되돌릴 수 없습니다.",
                                onConfirm: () => {onDelete(coupon.couponId, index)}
                            })
                        }}
                    />
                </TableCell>
            </TableRow>
        </>
    )
}
