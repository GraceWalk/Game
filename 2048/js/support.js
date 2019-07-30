//获取格子定位的top值
function getPosTop(i, j) {
    return 20 + 120 * i;
}

//获取格子定位的left值
function getPosLeft(i, j) {
    return 20 + 120 * j;
}

//设置随机位置的随机数字
function generateOneNumber() {
    let randx = Math.floor(Math.random() * 4);
    let randy = Math.floor(Math.random() * 4);

    while(true) {
        if (board[randx][randy] === 0) {
            break;
        }
        randx = Math.floor(Math.random() * 4);
        randy = Math.floor(Math.random() * 4);
    }
    board[randx][randy] = Math.random() < 0.5 ? 2 : 4;
    showNumberWithAnimation(randx, randy, board[randx][randy]);
}

//设置数字的背景颜色
function  getNumberCellBgColor(number) {
    switch (number) {
        case 2: return '#eee4da'; break;
        case 4: return '#ede0c8'; break;
        case 8: return '#f2b179'; break;
        case 16: return '#f59563'; break;
        case 32: return '#f67c5f'; break;
        case 64: return '#f65e3b'; break;
        case 128: return '#edcf72'; break;
        case 256: return '#edcc61'; break;
        case 512: return '#9c0'; break;
        case 1024: return '#33b5e5'; break;
        case 2048: return '#09c'; break;
        case 4096: return '#a6c'; break;
        case 8192: return '#93c'; break;
    }
}

//设置数字的颜色
function getNumberCellColor(number) {
    if (number <= 4) {
        return '#776e65';
    }
    return '#fff';
}

//判断是否可以左移
function canMoveLeft(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//判断是否可以上移
function canMoveUp(board) {
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//判断是否可以下移
function canMoveDown(board) {
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//判断是否可以右移
function canMoveRight(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//判断两个方块之间有没有空格
function noBlockLeft(row, col1, col, board) {
    for (let i = col1 + 1; i < col; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockUp(col, row1, row, board) {
    for (let i = row1 + 1; i < row; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockDown(col, row1, row, board) {
    for (let i = row1 - 1; i > row; i--) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockRight(row, col1, col, board) {
    for (let i = col1 - 1; i > col; i--) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}