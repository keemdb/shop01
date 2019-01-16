// HTML Header Include
w3.includeHTML(function(){
	$(".navs li").click(function(){
		location.href = $(this).data("src");
	});
	$(".page").html($(".page").html().replace(/[\n\r]/g, "<br>"));
	$(".page").html($(".page").html().replace(/[\t]/g, "&nbsp;&nbsp;&nbsp;&nbsp;"));
});