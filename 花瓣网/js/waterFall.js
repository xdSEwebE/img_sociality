/*定义一个全局对象positionMessage  属性如下
length:列数
hei: 数组,用来存放每列的当前高度
wid:每列的宽度
addHeight:当滚动条高度加页面高度大于这个值时,需要加入新的图片了*/


window.addEventListener('load', function() {
    var positionMessage = {};
    var num = 0;
    var maxNum = 97;
    waterfall('img_page', 'box', 230);

    //换一种写法...
    //已知共存了97张图片,已经加入了20张

    var main = document.getElementById("img_page");
    window.addEventListener('scroll', function() {
        if (checkHeight()) {
            putNum(main, 1);
        }
    }, false);
    //加载10张图片
    function putNum(main, onceNum) {
        //可以一次加入一堆,也可以依次加入一个,这里随便怎么写
        var pd = document.createDocumentFragment();
        for (var i = 0; i < onceNum; i++) {
            (function() {
                /*$.ajax({
                    url:"",
                    type:"GET",
                    datatype:"JSON",
                    success:function(data){   },
                    error:function(e,data){console.log(data)}
                })*/
                var box = document.createElement("div");
                box.className = "box viewin";
                pd.appendChild(box);
                var pic = document.createElement("div");
                pic.className = "pic";
                box.appendChild(pic);

                var heart_btn=document.createElement("div");
                heart_btn.className="heart_btn heart_btn_show";
                //data-selected 需要后台给出值  这里测试用 设为false  代表用户没有 喜爱
                //喜爱需要变为红色按钮
                heart_btn.dataset.selected="false";
                var heart=document.createElement("i");
                heart.className="heart";
                heart_btn.appendChild(heart);
                pic.appendChild(heart_btn);

                var a = document.createElement("a");
                //a.href="";
                pic.appendChild(a);

                var img = document.createElement("img");
                img.src = "images/" + num + ".jpg";
                a.appendChild(img);

                var img_shadow = document.createElement("div");
                img_shadow.className="img_shadow cover";
                a.appendChild(img_shadow);

                var img_infor_p = document.createElement("p");
                img_infor_p.className = "img_infor";
                img_infor_p.innerHTML = "这里是图片介绍这里是图片介绍这里是图片介绍这里是图片介绍这里是图片介绍这里是图片介绍这里是图片介绍"
                pic.appendChild(img_infor_p);

                var author_infor_div = document.createElement("div");
                author_infor_div.className = "author_infor";
                pic.appendChild(author_infor_div);

                var author_head_a = document.createElement("a");
                author_head_a.className = "author_head";
                author_infor_div.appendChild(author_head_a);

                var author_name_p = document.createElement("p");
                author_name_p.className = "author_name";
                author_name_p.innerHTML = "作者名称";
                author_infor_div.appendChild(author_name_p)

                var img2 = document.createElement("img");
                img2.src = "img_test/author_test.jpg";
                author_head_a.appendChild(img2);

                /*调试用*/
                num++;
                if (num == maxNum + 1) { num = 0; }


                img.onload = function() {
                    putInMain(box, main);
                }
            })();
        }
        main.appendChild(pd)
    }

    function waterfall(parent, classname, wid) {
        var main = document.getElementById(parent);
        var mWidth = main.offsetWidth;
        //num为列数
        var num = Math.floor(mWidth / wid);
        //console.log(num);

        //设置列数,存入全局对象,并将其初始化
        positionMessage.length = num;
        positionMessage.hei = new Array(positionMessage.length);
        positionMessage.wid = wid;
        positionMessage.top = main.offsetTop;

        if (window.getComputedStyle) {
            for (var node = main; node.parentNode != document.body; node = node.parentNode) {
                //console.log(node.parentNode.nodeName);
                if (getComputedStyle(node.parentNode).position != "static") {
                    positionMessage.top += node.parentNode.offsetTop;
                }
            }
        } else {
            for (var node = main; node.parentNode != document.body; node = node.parentNode) {
                if (node.parentNode.currentStyle.position === "static") {
                    positionMessage.top += node.parentNode.offsetTop;
                }
            }
        }

        for (var i = 0; i < positionMessage.length; i++) {
            positionMessage.hei[i] = 0;
        }
        //console.log(positionMessage);//测试

        //修改main盒子的样式,使其居中
        main.style.width = wid * num + 'px';
        main.style.margin = "0 auto";
        //main.style.cssText="width:"+wid*num+"px;margin:0 auto;";

        putNum(main, 20);
    }
    //将生成的box放在该有的位置(通过positionMessage获得) 并更新positionMessage
    function putInMain(element, parent) {
        var minHei = Math.min.apply(null, positionMessage.hei);
        //console.log(minHei);
        var index = findIndex(minHei);
        element.style.position = "absolute";
        element.style.left = index * positionMessage.wid + 'px';
        element.style.top = minHei + 'px';


        //修改 positionMessage
        positionMessage.addHeight = minHei;
        //console.log(i+'所加位置的高度:'+positionMessage.addHeight);
        positionMessage.hei[index] += element.offsetHeight;

        parent.style.height = (Math.max.apply(null, positionMessage.hei) + 250) + 'px'
            //console.log("添加的元素高度:"+element.offsetHeight);
            //console.log(i+'加完之后当列的高度:'+positionMessage.hei[index]	);
            //console.log(positionMessage.hei);
    }
    //寻找高度最小的列 的索引值
    function findIndex(min) {
        for (var i = 0; i < positionMessage.length; i++) {
            if (positionMessage.hei[i] == min) return i;
        }
    }
    //判断是否需要加入图片
    function checkHeight() {
        //滚动条的高度
        var scrollHei = document.body.scrollTop || document.documentElement.scrollTop;
        var clientHei = document.documentElement.clientHeight || document.body.clientHeight;
        return (positionMessage.addHeight + positionMessage.top + 250 < scrollHei + clientHei) ? true : false;
    }
}, false);
