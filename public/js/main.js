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

// top_nav hover 이벤트
$(".top_icon").mouseenter(function(){
	$(this).children("img").css({"opacity":.7});
});
$(".top_icon").mouseleave(function(){
	$(this).children("img").css({"opacity":1});
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

$(".madals").click(function(e){
	e.stopPropagation();
});

//메인네비 / .navs

// firebase.database().ref("root/test").push({test:"테스트"}).key;  // 이거슨 데이타베이스 잘 들어가나 해보는 테스트