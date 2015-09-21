/**
 * Created by zhangjk on 2015/9/20.
 */

var canvas;
var context;
var width;
var height;
var brx, bry, brw, brh;
var mrx, mry, mrw, mrh;
var sx, sy, sw;
var sx2, sy2, sw2, sy2Move;
var fx, fy, fw, fh;
var fx2, fy2;
var syMin, syMax;
var buttonX, buttonY;
var isClick = false;
var px, py, pw, ph;
var processHeight = 0;
var processAdd, processSub;
var whiteSpeed = 0;
var whiteSolwSpeed = 0;
var totalScore = 0;
var maxScore = 0;
var moveTime = 0;
var canAddScore = false;
var scoreAddNum = 0;
var scoreIndex = 0;
var animateId;
var isSuccess;
var isMoveWhite;


function animate() {
    animateId = requestAnimationFrame(animate);
    moveProcess();
    moveWhite();
    moveBack();
    addScore();
    checkCanClick();
    checkWhite();
    checkCanStart();
}

function drawRect() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#67C39D";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "#776e65";
    context.fillRect(brx, bry, brw, brh);
    context.fillStyle = "#bbada0";
    context.fillRect(mrx, mry, mrw, mrh);
}

function drawButton() {
    var image = document.getElementById("button");
    context.drawImage(image, width - sw - 50, height - 60);
    buttonX = width - sw - 45;
    buttonY = height - 55;

}

function drawProcess() {
    context.lineWidth = 2;
    context.strokeStyle = "white";
    context.strokeRect(px - 1, py - 1, pw + 2, ph + 2);
}

function drawScore() {
    if (!canAddScore) {

        context.fillStyle = "white";
        context.fillText("得分：" + totalScore, fx, fy);
        maxScore = localStorage.getItem("maxScore");
        if (maxScore !== null && maxScore !== undefined) {
            maxScore = parseInt(maxScore);
        } else {
            maxScore = 0;
        }
        context.fillText("最高：" + maxScore, fx2, fy2);
    }
}


function drawWhite() {
    context.fillStyle = "white";
    context.fillRect(sx, sy, sw, sw);
}

function drawYellow() {
    context.fillStyle = "yellow";
    context.fillRect(sx2, sy2, sw2, sw2);
}

function moveWhite() {
    if (whiteSpeed > 0 && sy > 15) {
        sy -= whiteSpeed;
        whiteSolwSpeed += 2;
        whiteSpeed -= whiteSolwSpeed;
        if (whiteSpeed < 0)
            whiteSpeed = 0;
        if (sy <= 15) {
            sy = 15;
            whiteSpeed = 0;
        }
        draw();
    }
}


function moveProcess() {
    if (isClick == 1) {
        context.fillStyle = "#f65e3b";


        if (processHeight == ph) {
            processHeight = 0;
            context.fillStyle = "#67C39D"
            context.fillRect(px, py, pw, ph);
        }

        processHeight += processAdd;
        if (processHeight > ph) {
            processHeight = ph;
        }
        context.fillRect(px, height - 70 - processHeight, pw, processHeight);
    } else if (isClick == 2) {
        processHeight -= processSub;
        if (processHeight <= 0) {
            processHeight = 0;
        }
        context.fillStyle = "#67C39D"
        context.fillRect(px, py, pw, ph);
        context.fillStyle = "#f65e3b";
        context.fillRect(px, height - 70 - processHeight, pw, processHeight);
    }
}

function addScore() {
    if (canAddScore) {
        context.fillStyle = "#67C39D";
        context.fillRect(fx, 0, fw, fh);
        scoreIndex += 3;
        if (scoreIndex >= scoreAddNum) {
            scoreIndex = 0;
            canAddScore = false;
            totalScore += scoreAddNum;
            context.fillStyle = "white";
            context.fillText("得分：" + totalScore, fx, fy);
            if (totalScore > maxScore) {
                maxScore = totalScore;
                localStorage.setItem("maxScore", maxScore);
            }
            context.fillText("最高：" + maxScore, fx2, fy2);
            return;
        }
        context.fillStyle = "white";
        context.fillText("得分：" + (totalScore + scoreIndex), fx, fy);
        if (totalScore + scoreIndex > maxScore)
            maxScore = totalScore + scoreIndex;
        context.fillText("最高：" + maxScore, fx2, fy2);
    }
}


function moveBack() {
    if (sy2Move != sy2 || isMoveWhite) {
        if (sy2Move > sy2) {
            sy2 += 5;
            if (sy2 > sy2Move)
                sy2 = sy2Move;
        } else if (sy2Move < sy2) {
            sy2 -= 5;
            if (sy2 < sy2Move) {
                sy2 = sy2Move;
            }
        }

        if (sy < height - sw * 3) {
            sy += 10;
            if (sy >= height - sw * 3) {
                sy = height - sw * 3;
                isMoveWhite = false;
            }
        }
        draw();
    }
}


function draw() {
    drawRect();
    drawProcess();
    drawButton();
    drawYellow();
    drawWhite();
    drawScore();
}


function getScore() {
    switch (moveTime) {
        case  1:
            return 100;
        case 2:
            return 80;
        case 3:
            return 60;
        case 4 :
            return 40;
        case 5:
            return 30;
        case 6:
            return 20;
        case 7 :
            return 15;
        default :
            return 10;
    }
}

function success() {
    $.confirm({
        'message2': 'GREAT',
        'dialogSpeed': "fast",
        'buttons': {}
    });
    scoreAddNum = getScore();
    moveTime = 0;
    sy2Move = parseInt(Math.random() * (syMax - syMin) + syMin);
    canAddScore = true;
    isMoveWhite = true;

}

function checkCanClick() {
    if (isClick != 0 && processHeight == 0 && whiteSpeed == 0) {
        isClick = 0;
    }
}

function checkWhite() {
    if (sy2 < sy || whiteSpeed != 0 || isSuccess) {
        return;
    }
    if (sy2 >= sy && sy2 + sw2 <= sy + sw) {
        success();
        isSuccess = true;
    } else {
        lost();
        window.cancelAnimationFrame(animateId);
    }
}

function checkCanStart() {
    if (isSuccess == true && !isMoveWhite && sy2 == sy2Move && !canAddScore) {
        isSuccess = false;
        $.confirm.hide();
    }
}

function lost() {
    $.confirm({
        'message': 'GAME OVER',
        'buttons': {
            '重新开始': {
                'class': 'blue',
                'action': function () {
                    restart();
                }
            }
        }
    });
}

function restart() {
    totalScore = 0;
    sy2 = parseInt(Math.random() * (syMax - syMin) + syMin);
    sy2Move = sy2;
    sy = height - sw * 3;
    moveTime = 0;
    isSuccess = false;
    isMoveWhite = false;
    canAddScore = false;
    processHeight = 0;
    draw();
    animate();

}

function initValues() {
    context = canvas.getContext("2d");
    context.font = "normal 1.2em 'Microsoft YaHei'"
    width = canvas.width;
    height = canvas.height;
    sw = width < height ? parseInt(width / 10) : parseInt(height / 10);
    brx = sw * 1.8;
    bry = 10;
    brw = sw * 1.4;
    brh = height - 20;
    mrx = sw * 2;
    mry = 15;
    mrw = sw;
    mrh = height - 30;
    px = width - sw - 35;
    py = height - 70 - sw * 5;
    pw = 20;
    ph = sw * 5;
    processHeight = 0;
    processAdd = parseInt(sw / 7.5);
    processSub = processAdd * 2;
    sx2 = sw * 2.1;
    syMin = 40;
    syMax = parseInt(mrh * 2 / 3);
    sy2 = parseInt(Math.random() * (syMax - syMin) + syMin);
    sy2Move = sy2;
    sw2 = sw * 0.8;
    sx = mrx;
    sy = height - sw * 3;
    fx = width - sw * 4.5;
    fy = 40;
    fw = sw * 4.5;
    fh = 80;
    fx2 = fx;
    fy2 = 70;
    moveTime = 0;
    isSuccess = false;
    isMoveWhite = false;

}

function mouseDown(event) {
    event.preventDefault();
    if (!isSuccess && isClick == 0 && event.offsetX > buttonX && event.offsetX < buttonX + 40 && event.offsetY > buttonY && event.offsetY < buttonY + 40) {
        isClick = 1;
        moveTime++;
    }
}

function mouseUp(event) {
    event.preventDefault();
    if (isClick == 1) {
        whiteSpeed = parseInt(sw / 3.0 * 5 * processHeight / ph + sw / 2);
        isClick = 2;
        whiteSolwSpeed = 1;
    }
}

function touchDwon(event) {
    event.preventDefault();
    if (event.touches.length > 1) {
        return;
    }
    if (isClick == 0 && event.touches[0].pageX > buttonX && event.touches[0].pageX < buttonX + 40 && event.touches[0].pageY > buttonY && event.touches[0].pageY < buttonY + 40) {
        isClick = 1;
        moveTime++;
    }
}

function touchUp(event) {
    event.preventDefault();
    if (isClick == 1) {
        whiteSpeed = parseInt(sw / 3.0 * 5 * processHeight / ph + sw / 2);
        isClick = 2;
        whiteSolwSpeed = 1;
    }
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.onload = function () {
    canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mouseup", mouseUp, false);
    canvas.addEventListener("touchstart", touchDwon, false);
    canvas.addEventListener("touchend", touchUp, false);
    initCanvasWH(canvas);
    initValues();
    draw();
    $.confirm({
        'message2': '通过绿色按钮控制白色方块移动速度，使白色方块正好覆盖黄色方块。',
        'dialogSpeed': "fast",
        'buttons': {
            '开始游戏': {
                'class': 'blue',
                'action': function () {
                    animate();
                }
            }
        }
    });


}


