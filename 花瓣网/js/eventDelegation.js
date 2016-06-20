$(function() {
    //新型按钮点击  事件委托
    $("#img_page").on("click", ".heart_btn", function() {
        $this = $(this);

        if ($this.attr("data-selected") == "false") {
            $this.find(".heart").css("background-position", "0 -60px");
            $this.attr("data-selected", "true");
            console.log($this.attr("data-selected"));
        } else if ($this.attr("data-selected") == "true") {
            $this.find(".heart").css("background-position", "0 0");
            $this.attr("data-selected", "false");
        }

    });

    //图片展示页 事件委托

    //图片展示页 关闭按钮事件
    $("#img_view_close").on("click", function() {
        if ($("#img_view").css("display") != "none") {
            $("#img_view").css("display", "none");
        }
    });

    //---图片列表点击显示其他图片效果

    $("#img_view").on("click", "li", function() {
        $this = $(this);
        $("#main_img").attr("src", $this.find("img").attr("src"));
        $this.siblings("li").attr("class", "");
        $this.attr("class", "selected");
    });

    //---图片列表点击图片列表移动效果
    if (parseInt($(".img_list_ul").css("height")) > parseInt($(".img_list_box").css("height"))) {
        $("#img_view").on("click", "li", function() {
            $this = $(this);
            $center=$(".img_list").offset().top+parseInt($(".img_list_box").css("height"))/2-parseInt($this.css("height"));
            $top_upper_bound=parseInt($(".img_list_box").css("height"))-parseInt($(".img_list_ul").css("height"))-5;
            $pianyi=$this.offset().top-$center;
            $top=parseInt($(".img_list_ul").css("top"))-$pianyi;
            if($top<0&&$top>$top_upper_bound){
            	$(".img_list_ul").css("top",$top+"px")
            }else if($top>=0){
            	$(".img_list_ul").css("top","0px")
            }else {
            	$(".img_list_ul").css("top",$top_upper_bound+"px")
            }
        });
    }


});
