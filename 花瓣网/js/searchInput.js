window.addEventListener('load',function(){
	window.addEventListener('scroll',checkInputHeight,false);
	function checkInputHeight(){
		var title_search_input=document.getElementById("title_search_input");
		var input2_height=title_search_input.offsetTop;
		if(window.getComputedStyle){
            for(let node=title_search_input ;getComputedStyle(node.parentNode).position!="static";node=node.parentNode){
                input2_height +=node.parentNode.offsetTop;
            }    
        }else{
            for(let node=title_search_input ;node.parentNode.currentStyle.position==="static";node=node.parentNode){
                input2_height +=node.parentNode.offsetTop;
            } 
        }
        var scrollHei=document.body.scrollTop || document.documentElement.scrollTop;
		if(scrollHei+10>input2_height){
			document.getElementById("menu_bar").className="menu_bar2";
		}else{
			document.getElementById("menu_bar").className="menu_bar1";
		}
	}




},false)