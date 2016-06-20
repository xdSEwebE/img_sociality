/*定义一个全局对象positionMessage  属性如下
length:列数
hei: 数组,用来存放每列的当前高度
wid:每列的宽度
addHeight:当滚动条高度加页面高度大于这个值时,需要加入新的图片了*/


window.addEventListener('load', function() {
    var positionMessage = {};
        


    waterfall('img_page', 'img_box', 240);

    var main = document.getElementById("img_page");
    window.addEventListener('scroll', function() {
        if (checkHeight()) {
            putNum(main, 1);
        }
    }, false);


    //加载图片
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
                var img_box=document.createElement("div");
                img_box.className="img_box";
                var img_area=document.createElement("div");
                img_area.className="img_area";
                var img_a=document.createElement("a");
                var img_img=document.createElement("img");
                img_img.src="images/"+i+".jpg";
                var img_shadow=document.createElement("div");
                img_shadow.className="shadow";
                var img_infor=document.createElement("p");
                img_infor.innerHTML="jiesao";
                img_box.appendChild(img_area);
                img_area.appendChild(img_a);
                img_area.appendChild(img_infor);
                img_a.appendChild(img_img);
                img_a.appendChild(img_shadow);

                pd.appendChild(img_box)

                /*调试用*/
                
                img_img.onload = function() {
                    putInMain(img_box, main);
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
        //留给添加采集 组件的空间
        positionMessage.hei[0]=146;
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
