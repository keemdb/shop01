const log = console.log;  
 
 // Firebase Init / 
  var config = {
    apiKey: "AIzaSyAwF5w2Sq75VxGQm-P9G6GTJ4nffwa7GV4",
    authDomain: "keemdb-shop.firebaseapp.com",
    databaseURL: "https://keemdb-shop.firebaseio.com",
    projectId: "keemdb-shop",
    storageBucket: "keemdb-shop.appspot.com",
    messagingSenderId: "359770632520"
  };
  firebase.initializeApp(config);

//Firebase Init
var db = firebase.database();

//카테고리 HOME 생성
db.ref("root/home").on("child_added", homeAdd);
function homeAdd(data) {
	var html = `
	<li class="rt_arrow">
		<a href="${data.val().link}" target="${data.val().target}">${data.val().title}</a>
	</li>`;
	$(".nav_sub").eq(0).append(html);
}

// 카테고리 SHOP 생성 - Ajax/json 통신
$.ajax({
	type: "get",
	url: "../json/shop.json",
	dataType: "json",
	success: function (data) {
		var html = `<div class="shop_cates wrap clear">`;
		for(var i=0; i<data.cates.length; i++) {
			html += `
			<ul>
				<li class="shop_cate_tit">${data.cates[i].tit}</li>
				<li>
					<ul>`;
			for(var j=0; j<data.cates[i].data.length; j++) {
				html += `
				<li class="shop_cate_name rt_arrow">
				<a href="${data.cates[i].data[j].link}" target="${data.cates[i].data[j].target}">
				${data.cates[i].data[j].name}</a>
				</li>`;
			}
			html += `
					</ul>
				</li>
			</ul>`;
		}
		html += `</div>`;
		html += `<ul>`;
		for(i=0; i<data.prds.length; i++) {
			html += `
			<li class="shop_prd"><a href="${data.prds[i].link}" target="${data.prds[i].target}">
			<img src="${data.prds[i].src}" class="img">
			</a>
			</li>`;
		}
		html += `</ul>`;
		$(".nav_sub").eq(1).append(html);
	}
});

// window.resize()구현 
$(window).resize(function(){
	
}).trigger("resize");


// top_nav hover 이벤트
$(".top_icon").mouseenter(function(){
	$(this).children("img").css({"opacity":.7});
});
$(".top_icon").mouseleave(function(){
	$(this).children("img").css({"opacity":1});
});

// nav 이벤트 (nav_sub show/hide)
$(".nav").mouseenter(function(){
	$(this).children(".nav_sub").css({"display":"block", "opacity":0}).stop().animate({"opacity":1, "top":"45px"}, 200);
});
$(".nav").mouseleave(function(){
	$(this).children(".nav_sub").stop().animate({"opacity":0, "top":"80px"}, 200, function(){
		$(this).css({"display":"none"});
	});
});

// rt_wings 이벤트
$(".top_nav .fa-bars").click(function(){
	var $bg = $(".rt_bg");
	var $cont = $(".rt_cont");
	$bg.css({"opacity":0, "display":"block"}).stop().animate({"opacity":.3}, 1000);
	$cont.css({"display":"block", "right":"-240px"}).stop().animate({"right":0}, 1000);
});

$(".rt_cont .fa-close").click(function(){
	var $bg = $(".rt_bg");
	var $cont = $(".rt_cont");
	$bg.stop().animate({"opacity":0}, 800, function(){
		$(this).css({"display":"none"});
	});
	$cont.stop().animate({"right":"-240px"}, 800, function(){
		$(this).css({"display":"none"});
	});
});

$(".rt_bg").click(function(e){
	e.stopPropagation();
	$(".rt_cont .fa-close").trigger("click");
});

//메인네비 / .navs
//firebase.database().ref("root/test").push({test:"테스트"}).key;