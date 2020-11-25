function leftNavDownload() {
  $.ajax({
    url: "../data/nav.json",
    success: function (data) {
      //第二部分，实现侧边导航栏
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

function leftNavTab() {
  $("#J_categoryList").on("mouseenter", ".category-item", function () {
    $(this).addClass("category-item-active");
  })
  $("#J_categoryList").on("mouseleave", "li.category-item", function () {
    $(this).removeClass("category-item-active");
  })
}

leftNavDownload();
leftNavTab();

function topNavDownload(){
  $.ajax({
      url: "../data/nav.json",
      success: function(data){
          //第三部分实现顶部导航
          var topNavArr = data.topNav;
          topNavArr.push({title: "服务"}, {title: "社区"});
          for(var i = 0; i < topNavArr.length; i++){
              $(`<li data-index="${i}" class = "nav-item">
              <a herf = "#" class = "link">${topNavArr[i].title}</a></li>`).appendTo(".x-nav-list");


              var node = $(`<ul class = 'children-list clearfix' style = "display: ${i == 0 ? 'block' : 'none'}">
              </ul>`);
              node.appendTo("#J_navMenu .container")
              //取出所有的子菜单选项
              if(topNavArr[i].childs){
                  var childsArr = topNavArr[i].childs;
                  for(var j = 0; j < childsArr.length; j++){
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
      error: function(msg){
          console.log(msg);
      }
  })
}

//顶部导航添加移入移出效果
function topNavTab(){
  
  $(".x-nav-list").on("mouseenter", ".nav-item", function(){
      $(this).addClass("nav-item-active");
      var index = $(this).index() ;
      if(index >= 0 && index <= 6){
          $("#J_navMenu").css({display: "block"}).removeClass("slide-up").addClass("slide-down");
          $("#J_navMenu .container").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");                ;
      }
  })
  $(".x-nav-list").on("mouseleave", ".nav-item", function(){
      $(this).removeClass("nav-item-active");
  })


  //移出的时候取消下拉菜单
  $(".x-nav-list").mouseleave(function(){
      $("#J_navMenu").css({display: "block"}).removeClass("slide-down").addClass("slide-up");
  })
  
}

topNavDownload();
topNavTab();