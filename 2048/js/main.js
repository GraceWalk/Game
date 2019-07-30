$(function() {
    newgame();
})
function newgame() {
    //初始化棋盘
    init();
    //产生两个数字
    generateOneNumber();
    generateOneNumber();
}

//重新开始游戏
$('#newgamebutton').click(newgame);

let score = 0;
let board = new Array();
//初始化背景格子
function init() {
    score = 0;
    for (let i = 0; i < 4; i++) {
        board[i] = new Array();
        for (let j = 0; j < 4; j++) {
            //初始化每个格子的初值为0
            board[i][j] = 0;
            //设置每个格子的位置
            let gridCell = $('#grid-cell-' + i + '-' + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }
    updateBoardView();
    
}

//初始化内容格子
function updateBoardView() {
    $('.number-cell').remove();
    for (let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            $('#grid-container').append("<div class='number-cell' id='number-cell-"
            +i+"-"+j+"'></div>");
            if (board[i][j] != 0) {
            let numberCell = $("#number-cell-" + i + "-" + j);
            numberCell.css('top', getPosTop(i, j));
            numberCell.css('left', getPosLeft(i, j));
            numberCell.css('background-color', getNumberCellBgColor(board[i][j]));
            numberCell.css('color', getNumberCellColor(board[i][j]));
            numberCell.text(board[i][j]);
            }
        }
    }
}

