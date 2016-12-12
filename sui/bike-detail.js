/**
 * Created by ZhangJikai on 2016/12/12.
 */

$(function () {
    'use strict';
    //$("#picker").picker({
    //    toolbarTemplate: '<header class="bar bar-nav">\
    //    <button class="button button-link pull-left close-picker">取消</button>\
    //    <button class="button button-link pull-right close-picker">确定</button>\
    //    <h1 class="title">适合人群</h1>\
    //    </header>',
    //    cols: [
    //        {
    //            textAlign: 'center',
    //            values: ['成年男性', '成年女性', '儿童']
    //        }
    //    ]
    //});



        $("#picker").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
        <button class="button button-link pull-left">\
      按钮\
      </button>\
      <button class="button button-link pull-right close-picker">\
      确定\
      </button>\
      <h1 class="title">标题</h1>\
      </header>',
            cols: [
                {
                    textAlign: 'center',
                    values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3'],
                    cssClass: 'picker-items-col-normal'
                }
            ]
        });

});

