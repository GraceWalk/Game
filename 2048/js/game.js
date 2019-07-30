//a用来在showEnd()函数中屏蔽上下左右移动按键
let a = 0;
//绑定上下左右按键进行移动
$(document).keydown(function(e) {
    if(a === 0){
        switch (e.keyCode) {
            case 37://left
                if (moveLeft())
                    setTimeout('generateOneNumber()', 300);
                break;
            case 38://up
                if (moveUp())
                    setTimeout('generateOneNumber()', 300);
                break;
            case 39://right
                if (moveRight())
                    setTimeout('generateOneNumber()', 300);
                break;
            case 40://down
                if (moveDown())
                    setTimeout('generateOneNumber()', 300);
                break;
            default:
                break;
        }
        Victory();
        GameOver();
    }
})

//左移
function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (let k = 0; k < j; k++) {
                    if (board[i][k] === 0 && noBlockLeft(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        
                    } else if (board[i][k] === board[i][j] && noBlockLeft(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        $('#score').html(score);
                       
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200);
    return true;
}

//上移
function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (let k = 0; k < i; k++) {
                    if (board[k][j] === 0 && noBlockUp(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        
                    } else if (board[k][j] === board[i][j] && noBlockUp(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        $('#score').html(score);
                       
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200);
    return true;
}

//下移
function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (let k = 3; k > i; k--) {
                    if (board[k][j] === 0 && noBlockDown(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        
                    } else if (board[k][j] === board[i][j] && noBlockDown(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        $('#score').html(score);
                        
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200);
    return true;
}

//右移
function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (let k = 3; k > j; k--) {
                    if (board[i][k] === 0 && noBlockRight(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                    } else if (board[i][k] === board[i][j] && noBlockRight(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        $('#score').html(score);

                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200);
    return true;
}

//游戏结束
function GameOver() {
    //判断是否不可以上下左右移动
    if(!canMoveUp(board) && !canMoveLeft(board) && !canMoveDown(board) && !canMoveRight(board)) {
      showEnd('#gameover');
    }
}

//游戏胜利
function Victory() {
    for(let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            //游戏胜利条件
            if (board[i][j] === 512) {
                showEnd('#victory');
                return false;
            }
        }
    }
}

//展示结局画面并重置游戏
function showEnd(end) {
    $(end + ' #overScore').html('Score : ' + score);
    $(end).show(500);
    a = 1;

    setTimeout(function() {  
        //鼠标点击关闭展示界面      
        $(end).one('click', function() {
            $(end).hide(500);
            a = 0;
            newgame();
        })
        //按任意键关闭展示界面
        $(document).one('keydown', function() {
            $(end).hide(500);
            a = 0;
            newgame();
        })
    },1000)
}
