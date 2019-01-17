// HTML Header Include
w3.includeHTML(function(){
	$(".navs li").click(function(){
		location.href = $(this).data("src");
	});
});

//datebase = CRUD (create / read / update / delete)  
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

// 공통 변수
var db = firebase.database();	//firebase의 데이터베이스 객체
var ref = null;
var key = "";
var lastKey = "";

init();
function init() {
	ref = db.ref("/root/blog");
	ref.on("child_added", onAdd);
	ref.on("child_removed", onRev);
	ref.on("child_changed", onChg);
}
function onAdd(data) {
	db.ref("root/blog").limitToLast(1).once("value", function(snapshot){
		//forEach 는 jQuery each 와 똑같다.
		snapshot.forEach(function(v, i){
			lastKey = v.key;
		});
	});
	$("#mc_sel").prepend(`<option value="${data.key}">${data.val().name}</option>`);
	$("#mc_sel").trigger("change");
}
function onRev(data) {
	$("#mc_sel option:selected").remove();
	$("#mc_sel").trigger("change");
}
function onChg(data) {
	$("#mc_sel option").each(function(){
		if(data.key == $(this).val()) $(this).text(data.val().name);
	});
}
function mcRev(obj) {
	if(confirm("정말 삭제? 진심?")) {
		db.ref("root/blog/"+$("#mc_sel option:selected").val()).remove();
	}
}
function mcChg(obj) {
	key = $("#mc_sel option:selected").val();
	log(key);
	var newTit = $(obj).prev().val();
	if(newTit == "") {
		alert("제목을 넣으세요.");
		$(obj).prev().focus();
		return;
	}
	db.ref("root/blog/"+key).update({
		name: newTit
	});
}

$("#mc_save").click(function(){
	if($("#mc_in").val() == "") {
		alert("메인 제목!!");
		$("#mc_in").focus();
		return;
	}
	ref = db.ref("/root/blog");
	ref.push({
		name: $("#mc_in").val()
	}).key;
	$("#mc_in").val("");
});

$("#mc_sel").change(function(){
	$(this).children("option").each(function(){
		if($(this).val() == lastKey) {
			$(this).attr("selected", true);
			var html = `
			<input type="text" id="mc_chg" class="w3-input w3-border w3-show-inline-block" 
			value="${$(this).val()}">
			<button class="w3-button w3-green mc_chg" onclick="mcChg(this);">수정</button>
			<button class="w3-button w3-red mc_rev" onclick="mcRev(this);">삭제</button>
			<div class="sc_ins">
				<input type="text" id="sc_name" class="w3-input w3-border w3-show-inline-block" placeholder="서브카테고리 이름">
				<input type="text" id="sc_link" class="w3-input w3-border w3-show-inline-block" placeholder="서브카테고리 링크">
				<select id="sc_target" class="w3-select w3-border w3-show-inline-block">
					<option value="_blank">새창</option>
					<option value="_self">현재창</option>
				</select>
				<button class="w3-button w3-indigo" onclick="scAdd(this)">저장</button>
			</div>`;
			$(".cont_wrap").empty().append(html);
		}
	});
	$("#mc_chg").val(	$(this).children("option:selected").text()	);
	key = $(this).children("option:selected").val();
});

/***** 서브카테고리 *****/
function scAdd(obj){
	log("저장!");
	ref = db.ref("root/blog/"+key+"/sub");
	if($("#sc_name").val() == "") {
		alert("제목을 입력하세요.");
		$("#sc_name").focus();
		return ;
	}
	if($("#sc_link").val() == "") {
		alert("링크를 입력하세요.");
		$("#sc_link").focus();
		return ;
	}
	ref.push({
		name: $("#sc_name").val(),
		target: $("#sc_target").val(),
		link: $("#sc_link").val()
	}).key;
}



/*
var arr = new Array("a", "b", "c");
var arr = ["a", "b", "c"];
for(var i=0; i<arr.length; i++) {
	log(arr[i]);
}
for(var i in arr) {
	log(arr[i]);
}
arr.forEach(function(value, index){
	log(value, index);
});
$(".abc").each(function(index){
});
*/