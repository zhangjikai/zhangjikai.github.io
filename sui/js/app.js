/**
 * Created by ZhangJikai on 2016/12/12.
 */

$(function () {
    'use strict';

    /**
     * 自行车详细
     */
    $(document).on("pageInit", "#page-picker", function (e, id, page) {
        $("#picker").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
        <button class="button button-link pull-left close-picker">取消</button>\
        <button class="button button-link pull-right close-picker">确定</button>\
        <h1 class="title">适合人群</h1>\
        </header>',
            cols: [
                {
                    textAlign: 'center',
                    values: ['成年男性', '成年女性', '儿童']
                }
            ]
        });


        $(".extra").forEach(function (obj) {
            $(obj).on("click", function (e) {

                var backgroundColor = $(obj).css("background-color");
                console.log(backgroundColor);
                if (backgroundColor == "rgb(153, 153, 153)") {
                    $(obj).css("background-color", "rgba(0, 0, 0, 0)");

                } else {
                    $(obj).css("background-color", "#999");
                }
            })
        });
    });

    $(document).on("pageInit", "#page-photo", function (e, id, page) {
        $("#input-select").on("change", function (e) {

            //console.log(this.files);


            var reader = new FileReader();

            reader.onload = function (e) {
                //$("#img").attr("src",  e.target.result);
                //console.log(e.target.result)
                $("#bike-show").append("<div class='col-33'><img src='" + e.target.result + "'></div>");
            };

            reader.readAsDataURL(this.files[0]);


        })
    });

    $.init();


});

