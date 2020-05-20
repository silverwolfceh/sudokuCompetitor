import { validateCell } from '../utilities/sudoku-board-validator';
import { solve, hasUniqueSolution } from '../utilities/sudoku-AI';

function getRandomIntBetween(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function generateRandomXBoard() {
    let board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    for (let i = 0; i < 9; i++) {
        board[i][i] = getRandomIntBetween(1, 9);
        while (!validateCell(i, i, board)) {
            board[i][i] = getRandomIntBetween(1, 9);
        }
        if (i !== 4) {
            board[i][8 - i] = getRandomIntBetween(1, 9);
            while (!validateCell(i, 8 - i, board)) {
                board[i][8 - i] = getRandomIntBetween(1, 9);
            }
        }
    }
    return board;
}

function getXBoard(params) {
    let val = window.atob(params).split(",");
    let board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            board[i][j] = parseInt(val[i*8+ j]);
        }
    }
    return board;
    
}

function generateURL(board) {
    let val = "";
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            val = val + board[i][j] + ",";
        }
    }
    return  window.btoa(val);
}

function findPopulatedCell(board) {
    let row, col;
    do {
        row = getRandomIntBetween(0, 8);
        col = getRandomIntBetween(0, 8);
    } while (board[row][col] === 0);
    return [row, col];
}


export default function generateSudokuBoard() {
    let url = document.location.href;
    console.log(url);
    if(url.indexOf("boardid") != -1)
    {
        let params = url.split("boardid=")[1];
        console.log(params);
        return getXBoard(params);
    }
    else
    {
        let board = generateRandomXBoard();
        solve(board);

        let row, col;
        const numberOfCellsToClear = getRandomIntBetween(27, 63);
        for (let i = 0; i < numberOfCellsToClear; i++) {
            [row, col] = findPopulatedCell(board);
            board[row][col] = 0;
        }
        
        document.location.href = url + "/?boardid=" + generateURL(board);
        return board;
    }
    
}
