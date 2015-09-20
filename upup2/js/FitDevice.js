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

function initCanvasWH(canvas) {
    var isPhone = judgePlatform();
    if (isPhone) {
        canvas.width = parseInt(window.innerWidth * 0.98);
        canvas.height = parseInt(window.innerHeight * 0.7);
        
    } else {
        canvas.width = 300;
        canvas.height = 500;
    }
    
    alert(canvas.height + " " + isPhone + " " + navigator.platform);
}
