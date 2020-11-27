function topNavDownload() {
    $.ajax({
      url: "../data/nav.json",
      success: function success(data) {
        //第三部分实现顶部导航
        var topNavArr = data.topNav;
        topNavArr.push({
          title: "服务"
        }, {
          title: "社区"
        });
  
        for (var i = 0; i < topNavArr.length; i++) {
          $("<li data-index=\"".concat(i, "\" class=\"nav-item\">\n                    <a href=\"#\" >\n                        <span class=\"text\">").concat(topNavArr[i].title, "</span>\n                    </a> \n                </li>")).appendTo(" .nav-list");
          var node = $("<ul class = 'children-list clearfix' style = \"display: ".concat(i == 0 ? 'block' : 'none', "\">\n                </ul>"));
          node.appendTo("#J_navMenu .container"); //取出所有的子菜单选项
  
          if (topNavArr[i].childs) {
            var childsArr = topNavArr[i].childs;
  
            for (var j = 0; j < childsArr.length; j++) {
              $("<li>\n                            <a href=\"#\">\n                                <div class = 'figure figure-thumb'>\n                                    <img src=\"".concat(childsArr[j].img, "\" alt=\"\"/>\n                                </div>\n                                <div class = 'title'>").concat(childsArr[j].a, "</div>\n                                <p class = 'price'>").concat(childsArr[j].i, "</p>\n                            </a>\n                        </li>")).appendTo(node);
            }
          }
        }
      },
      error: function error(msg) {
        console.log(msg);
      }
    });
  } //顶部导航添加移入移出效果
  
  
  function topNavTab() {
    $(" .nav-list").on("mouseenter", ".nav-item", function () {
      $(this).addClass("nav-item-active");
      var index = $(this).index() - 1;
  
      if (index >= 0 && index <= 6) {
        $("#J_navMenu").css({
          display: "block"
        }).removeClass("slide-up").addClass("slide-down");
        $("#J_navMenu .container").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");
        ;
      }
    });
    $(".nav-list").on("mouseleave", ".nav-item", function () {
      $(this).removeClass("nav-item-active");
    }); //移出的时候取消下拉菜单
  
    $(".nav-list").mouseleave(function () {
      $("#J_navMenu").css({
        display: "block"
      }).removeClass("slide-down").addClass("slide-up");
    });
  } //给侧片导航添加移入切换效果
  
  
  function leftNavTab() {
    $("#J_categoryList").on("mouseenter", ".category-item", function () {
      $(this).addClass("category-item-active");
    });
    $("#J_categoryList").on("mouseleave", "li.category-item", function () {
      $(this).removeClass("category-item-active");
    });
  }
  
  leftNavTab();
  topNavDownload();
  topNavTab();

var goods = localStorage.getItem('code');


  let myajax = $.ajax({
    url:'./data/goodsList2.json',
    type:'get',
    dataType:'json',
    success: function(json){
      var getArr = '';
      var chtml ='';
      $.each(json,function(index,item){
        if(goods === item.code){
          getArr = `<div class="swiper-slide"><img src="${item.imgurl1}" alt=""></div>
          <div class="swiper-slide"><img src="${item.imgurl2}" alt=""></div>
          <div class="swiper-slide"><img src="${item.imgurl3}" alt=""></div>
          <div class="swiper-slide"><img src="${item.imgurl4}" alt=""></div>`
          chtml = `<button code ="${item.code}">加入购物车</button>`
        }
      })
      $('.swiper-container .swiper-wrapper').append(getArr)
      $('.sale-btn').append(chtml)
    }
  })


  $('.sale-btn').on('click',' button',function (){
    // 获取当前点击商品的编号
    var code = $(this).attr('code')
    
    // localStorage  key = value
              //  goods = [{code:'abc1',num:1},{code:'abc2',num:2}]
    // 判断本地存储是否有数据
    if (localStorage.getItem('goods')) {
      var goodsArr = JSON.parse( localStorage.getItem('goods') )
    } else {
      var goodsArr = []
    }

    var hasGoods = false

    if (goodsArr.length > 0) {
      // 判断当前选中商品是否在购物车中
      $.each(goodsArr,function (index,item){
        console.log(index)
        console.log(item)
        if (item.code === code) {// 商品存在购物车中，数量+1
          item.num++
          hasGoods = true
          return false
        }
      })
    }

    // 如果购物车没有当前选中的商品，添加一条数据
    if (!hasGoods) {
      // var objStr = JSON.stringify({code:code,num:1})
      goodsArr.push({code:code,num:1})
    }

    // 更新本地存储的数据
    localStorage.setItem('goods',JSON.stringify(goodsArr))

    alert('添加购物车成功')

  })