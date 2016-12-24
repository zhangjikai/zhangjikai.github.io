/**
 * Created by ZhangJikai on 2016/12/24.
 */



var canvas;
var context;


function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
}


function transfer(image) {


    var width = image.width;
    var height = image.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, width, height);


    var imageData = context.getImageData(0, 0, width, height);

    var start, start2;

    var wNum = imageData.width;
    var hNum = imageData.height;

    var data = imageData.data;
    var index = 0;
    var rgb = [44, 50, 62];
    var rgb_2 = [55, 52, 59];
    var rgb_3 = [74, 75, 75];
    var rgb_4 = [116, 118, 90];
    var rgb2 = [];
    var similarCount = 0;
    var inStart = 0;

    var interval = 8;
    for (var i = 0; i < hNum; i++) {

        start = 4 * wNum * i;
        start2 = 4 * wNum * (i + interval);
        similarCount = 0;

        for (var j = 0; j < wNum; j++) {
            inStart = start + j * 4;
            rgb2.length = 0;
            rgb2[0] = data[inStart];
            rgb2[1] = data[inStart + 1];
            rgb2[2] = data[inStart + 2];
            if (similar(rgb, rgb2) || similar(rgb_2, rgb2) || similar(rgb_3, rgb2) || similar(rgb_4, rgb2)) {
                similarCount++;
            }
        }

        if (similarCount > (wNum / 4 * 3)) {
            for (j = 0; j < wNum * 4; j++) {
                data[start + j] = data[start2 + j];
            }
        }
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(imageData, 0, 0);
};


function similar(rgb, rgb2) {
    var threshold = 40;
    var result = Math.sqrt(Math.pow(rgb[0] - rgb2[0], 2) + Math.pow(rgb[1] - rgb2[1], 2) + Math.pow(rgb[2] - rgb2[2], 2));

    if (result < threshold) {
        return true
    } else {
        return false;
    }
}