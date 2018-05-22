
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
		var year = nowDate.getFullYear();
		var month = nowDate.getMonth();
		var nDate = nowDate.getDate();
		var weekD = nowDate.getDay();
		var hours = nowDate.getHours();
		var minutes = nowDate.getMinutes();
		var seconds = nowDate.getSeconds();
		showDateE.innerHTML = formatDate(getDateYMD(year, month, nDate), getWeekNum(weekD), getDetailTime(hours, minutes, seconds))
	};
	getDate();
	setInterval(getDate, 1000);
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
	var weekStr = "星期日";
	switch(weekday) {
		case 0:
			weekStr = "星期日";
			break;
		case 1:
			weekStr = "星期一";
			break;
		case 2:
			weekStr = "星期二";
			break;
		case 3:
			weekStr = "星期三";
			break;
		case 4:
			weekStr = "星期四";
			break;
		case 5:
			weekStr = "星期五";
			break;
		case 6:
			weekStr = "星期六";
			break;
	}
	return weekStr;
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
	 
	var selectEs = document.querySelectorAll(".sectionItem select");
//	console.log(selectEs);
	for (var i=0, len = selectEs.length; i<len; i++) {
		var currentSelect = selectEs[i];
		currentSelect.onchange = function() {
			getCurrentSeleteTime();
		}
	}
}

function getCurrentSeleteTime() {
	initDatedays();
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
	
	
	console.log(years+"-"+months+"-"+days+" "+hours+":"+minites+":"+seconds);
}

function initDatedays() {
	var yearS = document.getElementById("year-select");
	var years = yearS.value;
	var monthS = document.getElementById("month-select");
	var months = monthS.value;
	var dayS = document.getElementById("day-select");
	var days = dayS.value;
	
	var dayss = new Date(years,months,0);
	initUseData("day-select", 1, dayss.getDate());
	dayS = document.getElementById("day-select");
	if(dayS.length < days) {
		dayS.value = 1;
	} else {
		dayS.value = days;
	}
	
}

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
