/**
 * Created by zhangjk on 2015/9/20.
 */

/**
 * 判断是手机还是电脑访问
 * @returns {boolean} true:手机 ; false 电脑
 */
function judgePlatform() {
    var system = {
        win: false,
        mac: false,
        xll: false
    };
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    if (system.win || system.mac || system.x11) {
        return false;
    } else {
        return true;
    }

}

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function initCanvasWH(canvas) {
    var isPhone = isMobile.any();
    if (isPhone) {
        canvas.width = parseInt(window.innerWidth * 0.96);
        canvas.height = parseInt(window.innerHeight * 0.96);
    } else {
        canvas.width = 300;
        canvas.height = 500;
    }
}