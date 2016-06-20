$(function(){
	//nav_user  事件委托
	$(".nav_user").on("mouseover",function(){
		$(".user_list").css("display","block")
	});
	$(".nav_user").on("mouseout",function(){
		$(".user_list").css("display","none")
	});
});