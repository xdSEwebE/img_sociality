window.addEventListener('load', function() {

    var head_page_box = document.getElementById("head_page_box");
    var returnTop = document.getElementById("returnTop");
    window.addEventListener("scroll", function() {
        //滑动时 背景图的移动
        var sTop = document.body.scrollTop || document.documentElement.scrollTop;

        if (sTop >= 0 && sTop <= 500) {
            head_page_box.style.backgroundPosition = "center " + sTop / 2 + "px";
            returnTop.style.display = "none";
        }

        //返回顶部按钮的实现
        if (sTop > 500) {
            returnTop.style.display = "block";
        }
    });
    returnTop.addEventListener('click', function() {
        var fscroll = document.body.scrollTop || document.documentElement.scrollTop;
        var time = 200;
        var flash = 10;
        var times = parseInt(time / flash);
        var nowtimes = times;

        var scrollchange = setInterval(function() {
            var st = document.body.scrollTop || document.documentElement.scrollTop;
            if (st > 0) {
                if (document.body.scrollTop) {
                    document.body.scrollTop = fscroll * nowtimes / times;
                } else if (document.documentElement.scrollTop) {
                    document.documentElement.scrollTop = fscroll * nowtimes / times;
                }
                nowtimes--;
            } else {
                clearInterval(scrollchange);
            }
        }, flash);
    }, false);

    //封装起来
    (function() {
        /*登录注册按钮添加事件*/
        var register_btn = document.getElementById("register_btn");
        var login_btn = document.getElementById("login_btn");

        var login_close = document.getElementById("login_close");
        var ls_box = document.getElementById("ls_box");

        var login_frame = document.getElementById("login_frame");
        var forgetPassword = document.getElementById("forgetPassword");
        var toSignup = document.getElementById("toSignup");
        var toLogin = document.getElementById("toLogin");
        var login_page = document.getElementById("login_page");
        var signup_page = document.getElementById("signup_page");


        register_btn.addEventListener("click", function() {
            ls_box.style.display = "block";
            signup_page.style.display = "block";
        }, false);
        login_btn.addEventListener("click", function() {
            ls_box.style.display = "block";
            login_page.style.display = "block";
        }, false);

        /*登录注册页面关闭按钮的事件*/

        login_close.addEventListener("click", function() {
            ls_box.style.display = "none";
            signup_page.style.display = "none";
            login_page.style.display = "none";
        }, false);
        /*登录注册页面的旋转效果*/


        forgetPassword.addEventListener("click", function() {
            alert("暂时未实现");
        }, false);


        toSignup.addEventListener("click", function() {
            login_frame.className += " switching1";
            login_frame.addEventListener("webkitAnimationEnd", funToSi1, false);
        }, false);

        function funToSi1() {
            login_page.style.display = "none";
            signup_page.style.display = "block";
            login_frame.className = login_frame.className.replace(" switching1", " switching2");
            login_frame.removeEventListener("webkitAnimationEnd", funToSi1, false);
            login_frame.addEventListener("webkitAnimationEnd", funToSi2, false);
        }

        function funToSi2() {
            login_frame.className = login_frame.className.replace(" switching2", "");
            login_frame.removeEventListener("webkitAnimationEnd", funToSi2, false);
        }

        toLogin.addEventListener("click", function() {
            login_frame.className += " switching1";
            login_frame.addEventListener("webkitAnimationEnd", funToLo1, false);
        }, false);

        function funToLo1() {
            signup_page.style.display = "none";
            login_page.style.display = "block";
            login_frame.className = login_frame.className.replace(" switching1", " switching2");
            login_frame.removeEventListener("webkitAnimationEnd", funToLo1, false);
            login_frame.addEventListener("webkitAnimationEnd", funToLo2, false);
        }

        function funToLo2() {
            login_frame.className = login_frame.className.replace(" switching2", "");
            login_frame.removeEventListener("webkitAnimationEnd", funToLo2, false);
        }
    }());
    
},false)
