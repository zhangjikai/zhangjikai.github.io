/**
 * Created by ZhangJikai on 2016/11/22.
 */
BMap.MarkerManager = function (map) {
    this.markerList = [];
    this.markerData = [];
    this.map = map;
    this.markIcon = null;
};

BMap.MarkerManager.prototype.initData = function (point) {


    this.markerData[0] = {
        lng: point.lng + 0.01,
        lat: point.lat,
        img: "images/bicycle.jpg",
        info: "山地车",
        price: 20
    };

    this.markerData[1] = {
        lng: point.lng - 0.01,
        lat: point.lat + 0.005,
        img: "images/bicycle.jpg",
        info: "自行车",
        price: 10
    };
};


BMap.MarkerManager.prototype.drawMark = function () {
    this.markerList.forEach(function (marker) {
        this.map.removeOverlay(marker);
    });
    this.markerList.length = 0;
    if (!this.markIcon) {
        this.markIcon = new BMap.Icon("images/location54.png", new BMap.Size(32, 32));
    }
    var self = this;
    this.markerData.forEach(function (data) {
        var point = new BMap.Point(data.lng, data.lat);
        var marker = new BMap.Marker(point, {
            icon: self.markIcon
        });
        self.map.addOverlay(marker);
        self.markerList.push(marker);
        var htmlTemplate =
            "<div class='bike-show'> " +
            "<div class='bike-img'><img src='" + data.img + "' width=200 height=200></div>" +
            "<div class='bike-info'><span>" + data.info + "</span></div>" +
            "<div class='bike-price'><span>" + data.price + "</span></div>" +
            "</div>";


        var opts = {
            width: 240,     // 信息窗口宽度
            height: 250,     // 信息窗口高度
            title: "",
            enableMessage: false
        };
        var infoWindow = new BMap.InfoWindow(htmlTemplate);  // 创建信息窗口对象
        marker.addEventListener("click", function () {
            self.map.openInfoWindow(infoWindow, point); //开启信息窗口
        });

    });
};