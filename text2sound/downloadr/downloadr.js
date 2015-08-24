(function ($) {
    $.fn.downloadr = function () {
        return this.each(function () {

            function returnBrowserTest() {

                var dlBrowser = $.browser.browser();
                console.log(dlBrowser)

                var dlString = '';

                switch (dlBrowser) {

                    case "Safari":
                        dlString = '右击下面的图标，在菜单中选择 <strong>链接文件另存为...</strong> or <strong>下载链接文件为...</strong>';
                        break;
                    case "Mozilla":
                    case "Firefox":
                        dlString = '右击下面的图标，在菜单中选择 <strong>链接另存为...</strong> ';
                        break;
                    case "Msie":
                        dlString = '右击下面的图标，在菜单中选择 <strong>目标另存为...</strong> ';
                        break;
                    default:
                        dlString = '右击下面的图标，在菜单中选择 <strong>目标另存为...</strong> ';
                }


                return dlString;
            }

            var element = this;

            $(element).addClass("download_link");

            var theTitle = $(element).attr('title');

            var theLink = $(element).attr('href');

            $(element).bind('click', function (e) {

                e.preventDefault();

                var html = "";

                html += "<h2>下载文件</h2>";
                html += "<p>" +  returnBrowserTest() + "</p>";
                html += "<p style='text-align:center;'><a id='down_link' href='" + theLink + "'><img src='downloadr/download.png' alt='右击另存为' id='download_file'/></a></p>";
                html += "<p>如果使用迅雷等下载软件，请加上.mp3后缀</p>";

                jQuery.facebox(html);

            });
        });

    }
})(jQuery);