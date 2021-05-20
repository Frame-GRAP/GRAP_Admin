import React, {useEffect, useState} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import './Game.css'
import {
    InputAdornment, makeStyles,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    Toolbar
} from "@material-ui/core";
import axios from "axios";
import GameForm from "./GameForm";
import Controller from "../../controls/Controller";
import Popup from "../../controls/Popup";
import {insertGame} from "../../Service";

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
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setGamePage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setGamePage(0);
    };

    function truncate(string, n){
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get("http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/all");

            setGameData(request.data);
            return request;
        }
        fetchData();
    }, []);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if(target.value == "")
                    return items;
                else
                    return items.filter(x => x.name.includes(target.value))
            }
        })
    }

    const addOrEdit = (game, resetForm) => {
        insertGame(game);
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
    }

    const openInPopup = (game) => {
        setRecordForEdit(game);
        setOpenPopup(true);
    }

    /*const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }*/


    return (
        <div className="game_container">
            <div className="game_title">
                <h1>Game Info</h1>
            </div>
            <div className="game_table" >
                <Toolbar>
                    <Controller.Input
                        className={classes.searchInput}
                        label="Search Game"
                        InputProps= {{
                            startAdornment:(<InputAdornment position="start">
                            </InputAdornment>)
                        }}
                        onChange={{handleSearch}}
                    />
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
                                <TableCell>id</TableCell>
                                <TableCell>name</TableCell>
                                <TableCell>image</TableCell>
                                <TableCell>description</TableCell>
                                <TableCell>publisher</TableCell>
                                <TableCell>releasedDate</TableCell>
                                <TableCell>downloadUrl</TableCell>
                                <TableCell>lastVideoCrawled</TableCell>
                                <TableCell>actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gameData
                                .slice(gamePage * rowsPerPage, (gamePage + 1) * rowsPerPage)
                                .map((game, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {gamePage * rowsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell className="game_cell">{game.id}</TableCell>
                                        <TableCell className="game_cell">{game.name}</TableCell>
                                        <TableCell className="game_cell"><img width="200px" height="100px" src={game.headerImg} alt="header"/></TableCell>
                                        <TableCell className="game_cell">{truncate(game?.description, 150)}</TableCell>
                                        <TableCell className="game_cell">{game.publisher}</TableCell>
                                        <TableCell className="game_cell">{game.releasedData}</TableCell>
                                        <TableCell className="game_cell">{game.downloadUrl}</TableCell>
                                        <TableCell className="game_cell">{game.lastVideoCrawled}</TableCell>
                                        <TableCell className="game_cell">
                                            <Controller.Button
                                                text="Edit"
                                                color="primary"
                                                size="small"
                                                onClick={() => {openInPopup(game)}}/>
                                            <Controller.Button text="Delete" color="primary" size="small"/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={gameData.length}
                                    page={gamePage}
                                    rowsPerPage={rowsPerPage}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
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
            </div>
        </div>
    );
}

export default Game;
