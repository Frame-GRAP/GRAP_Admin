import React, {useEffect, useRef, useState} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import './Coupon.css'
import {makeStyles,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination, TextField,
    Toolbar
} from "@material-ui/core";
import axios from "axios";
import CouponForm from "./CouponForm";
import Controller from "../../controls/Controller";
import Popup from "../../controls/Popup";
import {insertCoupon, deleteCoupon, updateCoupon} from "../../Service";
import Notification from "../../controls/Notification";
import ConfirmDialog from "../../controls/ConfirmDialog";
import CouponRow from "./CouponRow";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
    searchInput:{
        width: '40%',
    },
    newButton: {
        position:'absolute',
        right:'10px'
    }
}))


function Coupon(){
    const [couponPage, setCouponPage] = useState(0);
    const [rowsPerPage, setRowsPerPage]= useState(10);
    const [couponData, setCouponData] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''})
    const [loading, setLoading] = useState(true);

    const [searchResult, setSearchResult] = useState([]);
    const [gameName, setGameName] = useState("");
    const [searchGameId, setSearchGameId] = useState(0);
    const [gameId, setGameId] = useState(0);

    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setCouponPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCouponPage(0);
    };

    const addCoupon = (data, resetForm) => {
        insertCoupon(data, gameId).then(r => {
            resetForm();
            setNotify({
                isOpen: true,
                message: 'Submitted Successfully',
                type: 'success'
            });
            setOpenPopup(false);
            if(searchGameId === gameId)
                refreshCoupon();
        });
    }

    const editCoupon = (data, resetForm) => {
        updateCoupon(data).then(r => {
            resetForm();
            setNotify({
                isOpen: true,
                message: 'Submitted Successfully',
                type: 'success'
            })
            setOpenPopup(false);
            refreshCoupon();
        });
    }

    const onDelete = (id, index) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteCoupon(id).then(r => {
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            });
            const temp = [...couponData];

            temp.splice(index, 1);

            setCouponData(temp);
        });
    }

    const openInPopup = (coupon) => {
        setRecordForEdit(coupon);
        setOpenPopup(true);
    }

    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${searchGameId}/coupon/all`);

            setCouponData(request.data);
            return request;
        }
        fetchData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [searchGameId]);

    useEffect(() => {
        setCouponData([]);
        async function fetchGameData() {
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game?name=${gameName}`);

            setSearchResult(request.data);
            return request;
        }

        fetchGameData();
    }, [gameName]);

    async function refreshCoupon() {
        const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/coupon/all`);
        console.log(request.data);
        setCouponData(request.data);
        return request;
    }

    const changeGameName = (event) => {
        setTimeout(() => {
            const getName = event.target.value;
            if(getName !== "")
                setGameName(getName);
        }, 1000);
    }

    const changeGameId = (event, value) => {
        if(value !== null){
            const getId = value.id;
            setSearchGameId(getId);
        }
    }

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="coupon_container">
            <div className="coupon_title">
                <h1>Game Select</h1>
            </div>
            <div className="game_selector">
                <Autocomplete
                    options={searchResult}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Game Name" variant="outlined" onChange={changeGameName}/>}
                    onChange={changeGameId}
                />
            </div>
            <div className="coupon_table" >
                <Toolbar>
                    <Controller.Button
                        className={classes.newButton}
                        text="Add New"
                        variant="outlined"
                        onClick={() => {setOpenPopup(true); setRecordForEdit(null)}}
                    />
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>name</TableCell>
                                <TableCell>expirationDate</TableCell>
                                <TableCell>gameHeaderImage</TableCell>
                                <TableCell>gameName</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {couponData.map((coupon, index) => (
                                    <CouponRow
                                        key={index}
                                        index={index}
                                        coupon={coupon}
                                        couponPage={couponPage}
                                        rowsPerPage={rowsPerPage}
                                        openInPopup={openInPopup}
                                        setConfirmDialog={setConfirmDialog}
                                        onDelete={onDelete}
                                    />
                                ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={couponData.length}
                                    page={couponPage}
                                    rowsPerPage={rowsPerPage}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <Popup
                    title="Coupon Info"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <CouponForm
                        recordForEdit={recordForEdit}
                        addCoupon={addCoupon}
                        editCoupon={editCoupon}
                        setGameId={setGameId}
                    />
                </Popup>
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </div>
        </div>
    );
}

export default Coupon;
