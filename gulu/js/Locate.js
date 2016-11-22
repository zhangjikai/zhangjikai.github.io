/**
 * Created by ZhangJikai on 2016/11/21.
 */
BMap.Locate = function () {
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
    this.defaultOffset = new BMap.Size(10, 50);
    this.centerMarker = null;

    // 设置这个属性为了演示标记功能
    this.markerManager = null;
};

BMap.Locate.prototype = new BMap.Control();

BMap.Locate.prototype.initialize = function (map) {

    // 创建一个DOM元素
    var div = document.createElement("div");

    div.innerHTML = "<img class='location-img' src='images/font-257.png' width='40' height='40'>";

    var self = this;
    div.onclick = function (e) {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    zoom = map.getZoom();
                    if(zoom < 15) {
                        map.setZoom(15);
                    }
                    if (self.centerMarker == null) {
                        var markerIcon = new BMap.Icon("images/location57.png", new BMap.Size(32, 32));
                        console.log(r.point);
                        self.centerMarker = new BMap.Marker(r.point, {
                            icon: markerIcon
                        });
                        map.addOverlay(self.centerMarker);
                        map.panTo(r.point);
                    } else {
                        //console.log(2222);
                        self.centerMarker.setPosition(r.point);
                        map.panTo(r.point);
                    }

                    self.markerManager.initData(r.point);
                    self.markerManager.drawMark();
                }

            },
            {
                enableHighAccuracy: true
            });
    };

    // 添加DOM元素到地图中
    map.getContainer().appendChild(div);
    // 将DOM元素返回
    return div;
};