
window.onload = function() {
	initData();
}

function initData() {
	showNowTime();
	showSelectedTime();
}

/**
 * 设置当前时间显示
 * 格式为 YYYY 年 MM 月 DD 日 星期 D HH:mm:ss
 * 2008-10-10 Monday 07:10:30 PM
 */

function showNowTime() {
	var showDateE = document.getElementById("dateMake");
	var getDate = function() {
		var nowDate = new Date();
		showDateE.innerHTML = getFormateTime(nowDate);
	};
	getDate();
	setInterval(getDate, 1000);
}

function getFormateTime (useDate) {
	var year = useDate.getFullYear();
	var month = useDate.getMonth();
	var nDate = useDate.getDate();
	var weekD = useDate.getDay();
	var hours = useDate.getHours();
	var minutes = useDate.getMinutes();
	var seconds = useDate.getSeconds();
	return  formatDate(getDateYMD(year, month, nDate), getWeekNum(weekD), getDetailTime(hours, minutes, seconds));
}


function formatDate(YMD, Week, HMS) {
	return YMD + "  " + Week + "  " + HMS;
}

//获取年月日
function getDateYMD(Y, M, D) {
	return Y+"年" + filledNum(M+1) + "月" + filledNum(D) + "日";
}

//获取当前周几
function getWeekNum(weekday) {
	return "星期" + "日一二三四五六".charAt(weekday);
}

function getDetailTime(H, M, S) {
	return filledNum(H)+":" + filledNum(M) + ":" + filledNum(S);
}

//补全日期位数
function filledNum(value) {
	if(value < 10) {
		return "0"+value.toString();
	}
	return value.toString();
}

/**
 * 选择日期
 */

function showSelectedTime() {
	initUseData("year-select", 2000, 2032);
	initUseData("month-select", 1, 12);
	var dayss = new Date(2000,1,0);
	initUseData("day-select", 1, dayss.getDate());
	initUseData("hour-select", 0, 23);
	initUseData("minite-select", 0, 59);
	initUseData("second-select", 0, 59);
	getCurrentSeleteTime();
	showPaddingTimeMessge();
	 
	var selectEs = document.querySelectorAll(".sectionItem select");
	for (var i=0, len = selectEs.length; i<len; i++) {
		var currentSelect = selectEs[i];
		currentSelect.onchange = function() {
			if(this.id == "year-select" || this.id == "month-select") {
				initDatedays();
			}
			showPaddingTimeMessge();
		}
	}
}
//计算组合时间格式内容
function showPaddingTimeMessge() {
	var pe = document.getElementById("result-wrapper");
	var selectTime = getCurrentSeleteTime();
	var message = "现在距离  " + getFormateTime(selectTime) + "  " + calcutePaddingDMS(selectTime);
	pe.innerHTML = message;
}

function calcutePaddingDMS(selectTime) {
	
	var nowdate = new Date();
	var nowTimes = nowdate.getTime();
	var selectTimes = selectTime.getTime();
	var paddTimes = nowTimes - selectTimes;
	var flag = (paddTimes > 0);
	var resultStr = (flag ? "已经过去 ":"还有 ") + handlertimes(paddTimes);
	return  resultStr;
}
//有时间戳转化成 天/时/分/秒
function handlertimes(times) {
	
	var abstimes = Math.abs(times);	
	var days = 0;
	var hours = 0;
	var minites = 0;
	var seconds = 0;
	
	var dayMesc = (1000*60*60*24);
	var hourMesc = (1000*60*60);
	var minMesc = (1000*60);
	
	days = parseInt(abstimes / dayMesc);
	hours = parseInt((abstimes%dayMesc) / hourMesc);
	minites = parseInt((abstimes%hourMesc) / minMesc);
    seconds = parseInt((abstimes%minMesc) / 1000);
    var message = "";
    
    console.log(days);
    console.log(hours);
    console.log(minites);
    console.log(seconds);
    
   	if(days > 0) {
   		message += (days + " 天");
   	}
   	
   	if(hours > 0) {
   		message += (hours + " 小时");
   	}
   	
   	if(minites > 0) {
   		message += (minites + " 分");
   	}
   	
   	if(seconds > 0) {
   		message += (seconds + " 秒");
   	}
   	
   	return message;
}

//获取当前选中的时间
function getCurrentSeleteTime() {
	var yearS = document.getElementById("year-select");
	var years = yearS.value;
	var monthS = document.getElementById("month-select");
	var months = monthS.value;
	var dayS = document.getElementById("day-select");
	var days = dayS.value;
	var hourS = document.getElementById("hour-select");
	var hours = hourS.value;
	var miniteS = document.getElementById("minite-select");
	var minites = miniteS.value;
	var secondS = document.getElementById("second-select");
	var seconds = secondS.value;
	
	var selectDate = new Date(years, (months-1), days, hours, minites, seconds);
	return selectDate;
}

//修改年份 月份后 更新该月份有多少天
function initDatedays() {
	var dayS = document.getElementById("day-select");
	var days = dayS.value;
	initUseData("day-select", 1, getCurrentYMHaveDays());
	dayS = document.getElementById("day-select");
	if(dayS.length < days) {
		dayS.value = 1;
	} else {
		dayS.value = days;
	}
}

//初始化创建option数据
function initUseData(id, min, max) {
	var ifragement = document.createDocumentFragment();
	var yearSE = document.getElementById(id);
	yearSE.innerHTML = "";
	for (var i=min; i<=max; i++) {
		var option = document.createElement("option");
		option.setAttribute("value", i);
		var note = document.createTextNode(i.toString());
		option.appendChild(note);
		ifragement.appendChild(option);
	}
	yearSE.appendChild(ifragement);
}

//获取当前年份月份下 有多少天
function getCurrentYMHaveDays() {
	var yearS = document.getElementById("year-select");
	var years = yearS.value;
	var monthS = document.getElementById("month-select");
	var months = monthS.value;
	var dayss = new Date(years,months,0);
	return dayss.getDate();
}

