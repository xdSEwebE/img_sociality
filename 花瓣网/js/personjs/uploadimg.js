$(function() {
    function createObjectURL(blob) {
        if (window.URL) {
            return window.URL.createObjectURL(blob);
        } else if (window.webkitURL) {
            return window.webkitURL.createObjectURL(blob);
        } else {
            return null;
        }
    }
    //显示上传页面事件
    $(".add_img").on("click",function(){
    	$(".dialog_boxes").css("display","block");
    })
    //.dialog_boxes_shadow 点击退出上传界面
    $(".dialog_boxes_shadow").on("click",function(){
    	$(".dialog_boxes").css("display","none");
    });

    $("#uploadimg").on("change", function(e) {
    	
        var e = e || window.event;
        var //info = "",
        //progress = document.getElementById("progress"),
            files = e.target.files,
            //reader = new FileReader(),
            url = createObjectURL(files[0]);
        if (url) {
            if (/image/.test(files[0].type)) {
                $("#image_upload").css("display", "none");
                $("#create_pin").css("display", "block");
                $("#uploadfile").attr("src", url)

            } else {
                alert("Not a image");
            }
        } else {
            alert("Your brower doesn't support object URLs.");
        }
    });
    $(".upload_area").on("drop",function(e){
    	$(".dragenter_shadow").css("display","none");
    	/*var e=e||window.event;
    	var files;
    	if(event.type=="drop"){
    		files=event.dataTransfer.files;
    		//$("#uploadimg").files[0]=files;
    		alert(1);
    	}*/
    });
    $(".upload_area").on("dragover",function(){
    	$(".dragenter_shadow").css("display","block");
    });
    $(".upload_area").on("dragleave",function(){
    	$(".dragenter_shadow").css("display","none");
    });

    //上传 取消按钮事件
    $("#cancel_img").on("click",function(){
    	$("#create_pin").css("display", "none");
    	$("#image_upload").css("display", "block");
    });
    //上传 采集按钮事件
    $("#submit_img").on("click",function(){
        console.log($("#uploadimg")[0].files[0]);
        $.ajax({

        })
    });
});
