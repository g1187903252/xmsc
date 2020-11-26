//用户状态
function userStatus() {
  if (!(localStorage.getItem("user"))) {
    var loginArr = `<a href = "./login.html" id="login" class="link">登录</a>
    <span class="sep">|</span>
    <a href = "./register.html" id="register" class="link">注册</a>
    <span class="sep">|</span>`;
    $(".topar-info").empty();
    // loginArr.appendTo(".topar-info");
    $('.topar-info').append(loginArr);
  } else {
    $.ajax({
      url: "./data/user.json",
      type: "get",
      dataType: "json",
      success: function (json) {
        console.log(json)
        var nai = localStorage.getItem("user");
        $.each(json, function (index, item) {
          if (item.username === nai) {
            var loginArr = $(`<i id="username" class="link">${item.username}</i>
    <span class="sep">|</span>
    <i id="log-off" class="link">注销</i>
    <span class="sep">|</span>`);
            $(".topar-info").empty();
            $(".topar-info").append(loginArr)
          }
        })

      }
    })
  }
}
//退出登录
function cancellation() {
  $('.topar-info').on("click", "#log-off", function () {
    localStorage.removeItem('user')
    userStatus();
  })
}


//实现侧边导航栏
function leftNavDownload() {
  $.ajax({
    url: "../data/nav.json",
    success: function (data) {
      var sideArr = data.sideNav;
      for (var i = 0; i < sideArr.length; i++) {
        var node = $(`<li class = 'category-item'>
                  <a href="/index.html" class = 'title'>
                      ${sideArr[i].title}
                      <em class = 'iconfont icon-xiangyou'></em>
                  </a>
                  <div class="children clearfix">
                      
                  </div>
              </li>`);
        node.appendTo("#J_categoryList");

        //取出其中的子节点
        var childArr = sideArr[i].child;
        var col = Math.ceil(childArr.length / 6);
        node.find("div.children").addClass("children-col-" + col);
        for (var j = 0; j < childArr.length; j++) {
          if (j % 6 == 0) {
            var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"></ul>`);
            newUl.appendTo(node.find("div.children"));
          }
          $(`<li class = "edg">
                      <a href="#">
                          <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                          <span class="text">${childArr[j].title}</span>
                      </a>
                  </li>`).appendTo(newUl);
        }
      }
    }
  })
}
//实现侧边导航栏移入移出效果
function leftNavTab() {
  $("#J_categoryList").on("mouseenter", ".category-item", function () {
    $(this).addClass("category-item-active");
  })
  $("#J_categoryList").on("mouseleave", "li.category-item", function () {
    $(this).removeClass("category-item-active");
  })
}
//实现顶部导航
function topNavDownload() {
  $.ajax({
    url: "../data/nav.json",
    success: function (data) {

      var topNavArr = data.topNav;
      topNavArr.push({
        title: "服务"
      }, {
        title: "社区"
      });
      for (var i = 0; i < topNavArr.length; i++) {
        $(`<li data-index="${i}" class = "nav-item">
              <a herf = "#" class = "link">${topNavArr[i].title}</a></li>`).appendTo(".x-nav-list");


        var node = $(`<ul class = 'children-list clearfix' style = "display: ${i == 0 ? 'block' : 'none'}">
              </ul>`);
        node.appendTo("#J_navMenu .container")
        //取出所有的子菜单选项
        if (topNavArr[i].childs) {
          var childsArr = topNavArr[i].childs;
          for (var j = 0; j < childsArr.length; j++) {
            $(`<li>
                          <a href="#">
                              <div class = 'figure figure-thumb'>
                                  <img src="${childsArr[j].img}" alt=""/>
                              </div>
                              <div class = 'title'>${childsArr[j].a}</div>
                              <p class = 'price'>${childsArr[j].i}</p>
                          </a>
                      </li>`).appendTo(node);
          }
        }
      }
    },
    error: function (msg) {
      console.log(msg);
    }
  })
}
//顶部导航添加移入移出效果
function topNavTab() {

  $(".x-nav-list").on("mouseenter", ".nav-item", function () {
    $(this).addClass("nav-item-active");
    var index = $(this).index();
    if (index >= 0 && index <= 6) {
      $("#J_navMenu").css({
        display: "block"
      }).removeClass("slide-up").addClass("slide-down");
      $("#J_navMenu .container").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");;
    }
  })
  $(".x-nav-list").on("mouseleave", ".nav-item", function () {
    $(this).removeClass("nav-item-active");
  })


  //移出的时候取消下拉菜单
  $(".x-nav-list").mouseleave(function () {
    $("#J_navMenu").css({
      display: "block"
    }).removeClass("slide-down").addClass("slide-up");
  })

}


//定时器倒计时，每天14:00开枪，每天22:00开枪
function countDown() {
  var nowDate = new Date();
  var hour = nowDate.getHours();
  var date = nowDate.getDate();
  var afterDate = new Date();


  //计算倒计时时间间隔
  if (hour < 14) {
    afterDate.setHours(14);
    $(".countdown-box .round").html("14:00 场");

  } else if (hour >= 14 && hour < 22) {
    afterDate.setHours(22);
    $(".countdown-box .round").html("22:00 场");
  } else {
    $(".countdown-box .round").html("明日14:00 场");
    afterDate.setHours(14);
    afterDate.setDate(date + 1);
  }
  afterDate.setMilliseconds(0);
  afterDate.setSeconds(0);
  afterDate.setUTCMilliseconds(0);

  //计算倒计时总秒数
  var count = parseInt((afterDate.getTime() - nowDate.getTime()) / 1000);


  var aSpans = $(".box-bd .countdown").find("span");

  var timer = setInterval(function () {
    count--;
    aSpans.eq(2).html(doubleNum(count % 60));
    aSpans.eq(1).html(doubleNum(parseInt(count / 60) % 60));
    aSpans.eq(0).html(doubleNum(parseInt(count / 3600) % 24));
    if (count == 0) {
      clearInterval(timer);
      $(".box-bd .desc").html("本次活动结束,敬请期待~");
    }
  }, 1000);
}

function doubleNum(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}
//第一部分渲染
$(function(){
  $.ajax({
    url:'../data/goods.json',
    type:'get',
    datatype:'json',
    success:function(json){
      var goodsStr=''
      $.each(json,function(index,item){
        goodsStr+=`<li class="showdown">
        <a href="./goodsList.html">
          <div class="figure">
            <img src="${item.imgurl}" alt="">
          </div>
          <h3>
            ${item.shoppingname}
          </h3>
          <p class="desc">
          ${item.title}
          </p>
          <p class="price">
            <span>${item.price}</span>元起
          </p>
        </a>
      </li>`
      })
      $('.row-r ul').append(goodsStr)
    }
  })
})
//第二部分渲染
$(function(){
  $.ajax({
    url:'../data/goods2.json',
    type:'get',
    datatype:'json',
    success:function(json){
      var goodsStr=''
      $.each(json,function(index,item){
        goodsStr+=`<li class="showdown">
        <a href="#">
          <div class="figure">
            <img src="${item.imgurl}" alt="">
          </div>
          <h3>
            ${item.shoppingname}
          </h3>
          <p class="desc">
          ${item.title}
          </p>
          <p class="price">
            <span>${item.price}</span>元起
          </p>
        </a>
      </li>`
      })
      goodsStr = goodsStr + `                  <li id="last-li">
      <div class="last">
        <div class="showdown">
          <a href="#">
            <div class="figure-img">
              <img src="./img/03.png" alt="">
            </div>
            <h3 class="title">小米壁画电视 65英寸</h3>
            <p>
              <span>6999</span>元
            </p>
          </a>
        </div>
        <div class="showdown">
          <a href="#" class="clearfix">
            <div class="figure-icon">
              <i class="iconfont icon-circle_right"></i>
            </div>
            <div class="more">
              浏览更多
              <small>电视影音</small>
            </div>
          </a>
        </div>
      </div>
    </li>`
      $('.last-but-one ul').append(goodsStr)
    }
  })
})

countDown();
cancellation();
userStatus();
leftNavDownload();
leftNavTab();
topNavDownload();
topNavTab();