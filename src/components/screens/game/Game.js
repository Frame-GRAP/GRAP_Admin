import React, {useEffect, useRef, useState} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import './Game.css'
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
    TablePagination, TextField,
    Toolbar, Typography
} from "@material-ui/core";
import axios from "axios";
import GameForm from "./GameForm";
import Controller from "../../controls/Controller";
import Popup from "../../controls/Popup";
import {deleteGame, insertGame, updateGame} from "../../Service";
import Notification from "../../controls/Notification";
import ConfirmDialog from "../../controls/ConfirmDialog";
import GameRow from "./GameRow";
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


function Game(){
    const [gamePage, setGamePage] = useState(0);
    const [rowsPerPage, setRowsPerPage]= useState(10);
    const [gameData, setGameData] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: games => { return games; } })
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''})
    const [more, setMore] = useState(false);
    const searchRef = useRef();
    const [loading, setLoading] = useState(true);

    const [searchResult, setSearchResult] = useState([]);
    const [gameName, setGameName] = useState("");
    const [searchGameId, setSearchGameId] = useState(0);

    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setGamePage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setGamePage(0);
    };

    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${searchGameId}`);

            setGameData(request.data);
            return request;
        }
        fetchData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, [searchGameId]);

    useEffect(() => {
        setGameData([]);
        async function fetchGameData() {
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game?name=${gameName}`);

            setSearchResult(request.data);
            return request;
        }

        fetchGameData();
    }, [gameName]);

    /*useEffect(()=> {
        async function fetchData() {
            const request = await axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/all");

            setGameData(request.data);
            return request;
        }
        fetchData();
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, []);*/

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: games => {
                if(target.value == "")
                    return games;
                else
                    return games.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    /*const recordsAfterPagingAndSorting = () => {
        return filterFn.fn(gameData).slice(gamePage * rowsPerPage, (gamePage + 1) * rowsPerPage);
    }*/

    /*const addOrEdit = (game, resetForm) => {
        insertGame(game);
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
    }*/

    async function refreshGame() {
        setGameData([]);
        const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game?name=${gameName}`);

        setSearchResult(request.data);
        return request;
    }

    const addOrEdit = (data, resetForm) => {
        if(data.img == undefined){//edit
            updateGame(data).then(r => {
                resetForm();
                setNotify({
                    isOpen: true,
                    message: 'Submitted Successfully',
                    type: 'success'
                })
                setOpenPopup(false);
                setGameData(data);
            });
        }

        else { //insert
            console.log("insert");
            insertGame(data).then(r => {
                resetForm();
                setNotify({
                    isOpen: true,
                    message: 'Submitted Successfully',
                    type: 'success'
                })
                setOpenPopup(false);
            });
        }
    }

    const openInPopup = (game) => {
        setRecordForEdit(game);
        setOpenPopup(true);
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteGame(id).then(r => {
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            });
            setOpenPopup(false);
            setGameData([]);
        });
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
        <div className="game_container">
            <div className="game_title">
                <h1>Game Info</h1>
            </div>
            <div className="game_table" >
                <Toolbar>
                    <Autocomplete
                        options={searchResult}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} inputRef={searchRef} label="Game Name" variant="outlined" onChange={changeGameName}/>}
                        onChange={changeGameId}
                    />
                    {/*<Controller.Input
                        className={classes.searchInput}
                        label="Search Game"
                        InputProps= {{
                            startAdornment:(<InputAdornment position="start">
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                        inputRef={searchRef}
                    />*/}
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
                                {/*<TableCell align="center">No</TableCell>*/}
                                <TableCell align="center">name</TableCell>
                                <TableCell align="center">image</TableCell>
                                <TableCell align="center">price</TableCell>
                                <TableCell align="center">publisher</TableCell>
                                <TableCell align="center">releaseDate</TableCell>
                                <TableCell align="center">actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*{gameData.map((game, index) => (*/}
                            {gameData.id !== undefined && <GameRow
                                game={gameData}
                                gamePage={gamePage}
                                rowsPerPage={rowsPerPage}
                                openInPopup={openInPopup}
                                setConfirmDialog={setConfirmDialog}
                                onDelete={onDelete}/>}

                                {/*))}*/}
                        </TableBody>
                        {/*<TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={gameData.length}
                                    page={gamePage}
                                    rowsPerPage={rowsPerPage}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>*/}
                    </Table>
                </TableContainer>
                <Popup
                    title="Game Info"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <GameForm
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

export default Game;
