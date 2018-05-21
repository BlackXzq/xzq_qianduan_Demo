

window.onload = function() {
	initData();
}


function initData() {
	showName();
	showSelectedOption();
	getLiElementBackColor();
	fadeInOut();
}

//实现demo1 中显示输入内容
function showName() {
	var subBtn = document.querySelector("#submit-btn");
	var textEl = document.querySelector("#name");
	var that = this;
	subBtn.onclick = function() {
		that.showNameMessage(textEl.value);
	}
	document.onkeydown = function(event) {
		if(document.activeElement.id == "name") {
			if(event.keyCode == "13") {
				showNameMessage(textEl.value);
			} else if(event.keyCode == "27") {
				textEl.value = "";
			}
		}
	}
	
}

function showNameMessage(message) {
	var pel = document.querySelector("#showName");
	var textEl = document.querySelector("#name");
	pel.innerHTML = "输入内容是： " + message;
	textEl.blur();
}

/*
 * 设置显示相应的内容区域
 * */

function showSelectedOption() {
	var schoolE = document.querySelector("#school");
	var companyE = document.querySelector("#company");
	var schoolSE = document.querySelector("#school-select");
	var companySE = document.querySelector("#company-select");
	
	schoolE.onchange = function() {
		if(this.checked) {
			schoolSE.style.display = "block";
			companySE.style.display = "none";
		}
	}
	
	companyE.onchange = function() {
		if(this.checked) {
			schoolSE.style.display = "none";
			companySE.style.display = "block";
		}
	}
}
/**
 * 获取li标签的背景颜色
 */
function getLiElementBackColor() {
	var ulE = document.querySelector(".palette");
	var getP = document.querySelector(".color-picker");
	ulE.onclick = function(event) {
		var currentLi = event.target;
		if(currentLi.nodeName.toLowerCase() == "li") {
			var value = currentLi.style.backgroundColor;
			getP.innerHTML = value;
			getP.style.backgroundColor = value;
		}
	}
}
/**
 * 淡出淡入处理
 */
function fadeInOut() {
	var btn = document.querySelector("#fade-btn");
	var backDiv = document.querySelector("#fade-obj");
	var fadeout = true;
	var num = 100;
	
	btn.onclick = function() {
		var intervalTimer = setInterval(function(){
			btn.disabled = true;
			if(fadeout) {
				num--;
			} else {
				num++;
			}
			backDiv.style.opacity = num/100;
			if (num<=0 || num>=100) {
				clearInterval(intervalTimer);
				btn.disabled = false;
				if(num<=0) {
					fadeout = false;
					btn.innerHTML = "淡入";
				} else {
					fadeout = true;
					btn.innerHTML = "淡出";
				}
			}
		}, 50);
	}
}
