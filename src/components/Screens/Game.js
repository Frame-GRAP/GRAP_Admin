import React, {useEffect, useState} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import './Game.css'
import {Paper, Table, TableBody, TableContainer, TableFooter, TableHead, TablePagination} from "@material-ui/core";
import axios from "axios";

function Game(){
    const [gamePage, setGamePage] = useState(0);
    const [rowsPerPage, setRowsPerPage]= useState(10);
    const [gameData, setGameData] = useState([]);

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

    return (
        <div className="game_container">
            <div className="game_title">
                <h1>Game Info</h1>
            </div>
            <div className="game_table">
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
                                <TableCell>releaseDate</TableCell>
                                <TableCell>downloadUrl</TableCell>
                                <TableCell>lastVideoCrawled</TableCell>
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
            </div>
        </div>
    );
}

export default Game;
