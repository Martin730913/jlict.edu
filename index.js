window.onload=function () {
	var oDiv=document.getElementById('Calendar');
	var oDate=new Date();
	var oYear=oDate.getFullYear();
	var isLeap=oYear%400==0?1:((oYear%100!=0&&oYear%4==0)?1:0);
	var aMonth=[31,28+isLeap,31,30,31,30,31,31,30,31,30,31];
	var oMonth=oDate.getMonth();
	var oDAte=oDate.getDate();
	var oDay=oDate.getDay();
	var oInput=oDiv.getElementsByTagName('input');
	var oDetails=document.getElementById('details');
	var aWeek=["日","一","二","三","四","五","六"];
	var aSpa=document.getElementById("head").getElementsByTagName("span");
	var oDiv1=document.getElementById("div1");
	var aImg=oDiv1.getElementsByTagName("img");
	var oDiv2=document.getElementById("div2");
	var aSpan=oDiv2.getElementsByTagName("span");
	var i=0;
	var oHead=document.getElementById("left_head");
	var timer=null;
	var arry=[
    '"AI智慧"共建人工',
    "关于做好17-18-2实验室安全",
    "教务处组织召开在线课程"
	];
	function body(){
		//建立星期栏
		var oTable=document.createElement("table");
		var oThead=document.createElement("thead");
		var oTbody=document.createElement("tbody");
		var oTro=document.createElement("tr");
		for (var i = 0; i<7;i++) {
			var oTdo=document.createElement("td");
			oTdo.innerHTML=aWeek[i];
			oTro.appendChild(oTdo);
		}
		oThead.appendChild(oTro);
		oTable.appendChild(oThead);
		//建立完整的日期
		var firstDay=new Date(oYear,oMonth,1);
		var dayOfweek=firstDay.getDay();
        for (var k=0; k <6; k++){
			var oTr=document.createElement("tr");
			for (var j = 0; j<7; j++) {
				var re=k*7+j;
				var rel=re-dayOfweek+1;
				var oTd=document.createElement("td");
				if (rel<=0||rel>aMonth[oMonth]) {
					oTd.innerHTML="";
				}
				else{
					oTd.innerHTML=rel;
					if (rel==oDAte&&oMonth==oDate.getMonth()&&oYear==oDate.getFullYear()) {
						oTd.style.color="#fff";
						oTd.style.background="red";
					}
				}
				oTr.appendChild(oTd);
			}
			oTbody.appendChild(oTr);
		}
		oTable.appendChild(oTbody);
		oDiv.appendChild(oTable);
		oDetails.innerHTML=oYear+"年"+(oMonth+1)+"月";
		//四个按钮功能
		for (var g= 0; g<oInput.length; g++) {
			oInput[g].index=g;
			oInput[g].onclick=function () {
				switch(this.index){
					case 0:
					oYear--;
					break;
					case 1:
					oYear=new Date().getFullYear();
					oMonth=new Date().getMonth();
					break;
					case 2:
					oYear++;
				}
				oDiv.removeChild(oTable);
				body();
		        oDetails.innerHTML=oYear+"年"+(oMonth+1)+"月";						
			}
		}
		aSpa[0].onclick=function(){
			oMonth--;
				if (oMonth<0) {
					oYear--;
					oMonth=11;
				}
			oDiv.removeChild(oTable);
			body();
			oDetails.innerHTML=oYear+"年"+(oMonth+1)+"月";
		}
		aSpa[1].onclick=function(){
			oMonth++;
				if (oMonth>11) {
					oYear++;
					oMonth=0;
				}
			oDiv.removeChild(oTable);
			body();
			oDetails.innerHTML=oYear+"年"+(oMonth+1)+"月";
		}
		//点击任意一天的功能
		var oTD=oTable.getElementsByTagName("td");
			for (var d = 0; d <oTD.length;d++) {
				oTD[d].index=d;
				oTD[d].onclick=function () {
					if (oTD[this.index].innerText>0){
					var Now="日期是："+oYear+'/'+(oMonth+1)+'/'+oTD[this.index].innerText;
					alert(Now);

				    }
				}
			}
	}
	body();

	timer=setInterval(autoPlay,4000);
	function autoPlay(){
		i++;
		if(i>=aSpan.length){
			i=0;
		}
		change(i);
	}
	for(var k=0;k<aSpan.length;k++){
		aSpan[k].index=k;
		aSpan[k].onmouseover=function(){
			clearInterval(timer);
			aImg[this.index].style.opacity="1";
			aImg[this.index].style.filter="alpha(opacity:100)";         
			change(this.index);
			
		}
		
	}

	function change(g){
		var iTime=null;
		var iTarget=10;
		var oOpacity=0;
		var iSpeed=0;
		for(var d=0;d<aImg.length;d++){
			aImg[d].style.opacity="0";
			aImg[d].style.filter="alpha(opacity=0)";         
		}
	  
		clearInterval(iTime);
		iTime=setInterval(function(){
			    oOpacity+=iTarget;
				iSpeed=Math.ceil(oOpacity)/100;
			    if(iSpeed>=1){
				   clearInterval(iTime);
					iSpeed=0;
			    }
			    else{
				    aImg[g].style.opacity=iSpeed;
				    aImg[g].style.filter="alpha(opacity:"+iSpeed*100+")";         
			    }
				
		},100)	
		for(var t=0;t<aSpan.length;t++){
			aSpan[t].className="";
		}
		oHead.innerHTML=arry[g];
		aSpan[g].className="active";
		i=g;
			
	}
	oDiv1.onmouseover=function(){
		clearInterval(timer);
	}
	oDiv1.onmouseout=function(){
		timer=setInterval(autoPlay,4000);
	}

}