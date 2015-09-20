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
var syMin, syMax;
var sx2, sy2, sw2;
var hNum;
var count = 0;

function draw() {
    if (count++ > 10) {
        count = 0;
        drawRect();
        context.fillStyle = "white";
        context.fillRect(mrx, sy++, sw, sw);
    }
    /*context.fillStyle = "yellow";
     context.fillRect(sw * 4.6, sw * 8, sw * .8, sw * .8);
     context.fillStyle = "white";
     context.fillRect(sw * 4.5, sw * 6, sw * 1, sw * 1);*/
}

function genSy() {
    sy = Math.random() * (syMax - syMin) + syMin;
}

function animate() {
    requestAnimationFrame(animate);
    //draw();
}

function drawRect() {
    context.fillStyle = "#776e65";
    context.fillRect(brx, bry, brw, brh);
    context.fillStyle = "#bbada0";
    context.fillRect(mrx, mry, mrw, mrh);
    genSy();
    context.fillStyle = "white";
    context.fillRect(sx, sy, sw, sw);
}

function drawButton() {
    /* context.fillStyle = "red";
     context.beginPath();
     context.arc(width - sw * 2, height - 30, 20, 0, Math.PI * 2, true);
     context.closePath();


     context.fill();
     context.fillStyle = "#ffffff"
     context.fillText("CLICK", width - sw * 2 - 10, height - 30);*/
    var image = document.getElementById("button");
    context.drawImage(image, width - sw - 50, height - 60);
}

function drawProcess() {
    context.fillStyle = "#f65e3b";
    context.strokeStyle = "white";
    context.strokeRect(width - sw - 35, height - 60 - sw * 5, 20, sw * 5);
}

function initValues() {
    context = canvas.getContext("2d");
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
    sx2 = sw * 2.1;
    sy2 = height - sw * 3;
    sw2 = sw * 0.8;
    sx = mrx;
    sy = 40;
    syMin = 30;
    syMax = parseInt(mrh * 2 / 3);
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
    initCanvasWH(canvas);
    initValues();
    drawRect();
    drawButton();
    drawProcess();
    animate();
}


