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
    //var rgb = [44, 50, 62];
    //var rgb = [53, 50, 55];
    var rgb = [36, 60, 44];
    var rgb_2 = [55, 52, 59];
    var rgb_3 = [74, 75, 75];
    var rgb_4 = [66, 47, 39];
    var rgb_5 = [47, 47, 47];
    var rgb_6 = [141, 140, 136];
    var rgb_7 = [63, 63, 63];
    var rgb_8 = [39, 47, 61];
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
            if (similar3(rgb, rgb2) || similar3(rgb_2, rgb2) || similar3(rgb_3, rgb2) || similar3(rgb_4, rgb2)) {
                similarCount++;
            }
        }

        if (similarCount > (wNum / 4 * 3)) {
            for (j = 0; j < wNum * 4; j++) {
                data[start + j] = data[start2 + j];
                //data[start + j] = 0xf;
            }
        }
    }

    //for (i = 0; i < hNum; i++) {
    //
    //    start = 4 * wNum * i;
    //    if (i < interval) {
    //        start2 = 4 * wNum * (i + interval);
    //    } else {
    //        start2 = 4 * wNum * (i - interval);
    //    }
    //
    //    similarCount = 0;
    //
    //    for (j = 0; j < wNum; j++) {
    //        inStart = start + j * 4;
    //        rgb2.length = 0;
    //        rgb2[0] = data[inStart];
    //        rgb2[1] = data[inStart + 1];
    //        rgb2[2] = data[inStart + 2];
    //        if (similar2(rgb, rgb2) || similar2(rgb_2, rgb2) || similar2(rgb_3, rgb2)) {
    //            similarCount++;
    //        }
    //    }
    //
    //    if (similarCount > (wNum / 4 * 3)) {
    //        for (j = 0; j < wNum * 4; j++) {
    //            data[start + j] = data[start2 + j];
    //        }
    //    }
    //}




    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(imageData, 0, 0);
    //StackBlur.canvasRGBA(canvas, 0, 0, width, height,8);
}


function rgb2lab(rgb){
    var r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255,
        x, y, z;

    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}


function similar3(rgb, rgb2) {
    var lab = rgb2lab(rgb);
    var lab2 = rgb2lab(rgb2);
    var color = {L: lab[0], A: lab[1], B: lab[2]};
    var color2 = {L: lab2[0], A: lab2[1], B: lab2[2]};

    var dis = DeltaE.getDeltaE94(color, color2);
    var threshold = 10;
    if(dis < threshold) {
        return true;
    } else {
        return false;
    }

}

function similar(rgb, rgb2) {

    var threshold = 40;
    var result = Math.sqrt(Math.pow(rgb[0] - rgb2[0], 2) + Math.pow(rgb[1] - rgb2[1], 2) + Math.pow(rgb[2] - rgb2[2], 2));

    if (result < threshold) {
        return true
    } else {
        return false;
    }
}

function similar2(rgb, rgb2) {
    var threshold = 5;
    var result = Math.sqrt(Math.pow((rgb[0] - rgb2[0]) * 0.3, 2) + Math.pow((rgb[1] - rgb2[1]) * 0.59, 2) + Math.pow((rgb[2] - rgb2[2]) * 0.11, 2));
    //var result = Math.sqrt(Math.pow((rgb[0] - rgb2[0]) , 2) + Math.pow((rgb[1] - rgb2[1]) , 2) + Math.pow((rgb[2] - rgb2[2]) , 2));

    if (result < threshold) {
        return true
    } else {
        return false;
    }
}