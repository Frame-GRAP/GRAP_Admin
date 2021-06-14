import React, {useEffect, useRef, useState} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {
    Box,
    Collapse,
    InputAdornment, makeStyles,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    Toolbar, Typography
} from "@material-ui/core";
import axios from "axios";
import Controller from "../../controls/Controller";
import Popup from "../../controls/Popup";
import {deleteUser, insertUser, updateUser} from "../../Service";
import Notification from "../../controls/Notification";
import ConfirmDialog from "../../controls/ConfirmDialog";
import UserForm from "./UserForm";
import UserRow from "./UserRow";
import "./User.css";

const useStyles = makeStyles(theme => ({
    searchInput:{
        width: '40%',
        marginBottom: '10px',
    },
    newButton: {
        position:'absolute',
        right:'20px',
        marginBottom: '20px',
    }
}))

function User(){
    const [userPage, setUserPage] = useState(0);
    const [rowsPerPage, setRowsPerPage]= useState(10);
    const [userData, setUserData] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: games => { return games; } })
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''})
    const searchRef = useRef();
    const [loading, setLoading] = useState(true);

    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setUserPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setUserPage(0);
    };

    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/all");

            setUserData(request.data);
            return request;
        }
        fetchData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, []);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: users => {
                if(target.value == "")
                    return users;
                else
                    return users.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    const recordsAfterPagingAndSorting = () => {
        return filterFn.fn(userData).slice(userPage * rowsPerPage, (userPage + 1) * rowsPerPage);
    }

    const addOrEdit = (data, resetForm) => {
        updateUser(data).then(r => {
            resetForm()
            setNotify({
                isOpen: true,
                message: 'Submitted Successfully',
                type: 'success'
            })
            window.location.reload(false);
        });

    }

    const openInPopup = (user) => {
        setRecordForEdit(user);
        setOpenPopup(true);
    }

    const onDelete = (userId, index) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteUser(userId).then(r => {
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            });
            window.location.reload(false);
        });
    }

    if(loading) return (<div>Loading...</div>);
    return (
        <div className="user_container">
            <div className="user_title">
                <h1>User Info</h1>
            </div>
            <div className="user_table" >
                <Toolbar>
                    <Controller.Input
                        className={classes.searchInput}
                        label="Search User"
                        InputProps= {{
                            startAdornment:(<InputAdornment position="start">
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                        inputRef={searchRef}
                    />
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">No</TableCell>
                                <TableCell align="center">name</TableCell>
                                <TableCell align="center">email</TableCell>
                                <TableCell align="center">picture</TableCell>
                                <TableCell align="center">nickname</TableCell>
                                <TableCell align="center">membership</TableCell>
                                <TableCell align="center">actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recordsAfterPagingAndSorting()
                                .map((user, index) => (
                                    <UserRow
                                        key={index}
                                        index={index}
                                        user={user}
                                        userPage={userPage}
                                        rowsPerPage={rowsPerPage}
                                        openInPopup={openInPopup}
                                        setConfirmDialog={setConfirmDialog}
                                        onDelete={onDelete}/>
                                ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={userData.length}
                                    page={userPage}
                                    rowsPerPage={rowsPerPage}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <Popup
                    title="User Info"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <UserForm
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
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

export default User;
