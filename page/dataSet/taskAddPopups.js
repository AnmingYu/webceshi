layui.use(['table', 'layer', 'form', 'tree'], function() {
	var table = layui.table,
		form = layui.form,
		$ = layui.jquery
	//获取数据集下对应模板的数据
	var popupAttribute = $("#popupsByValue").val();
	var obj = JSON.parse(popupAttribute);
	console.log(JSON.stringify(obj));
	/*var parameter = obj[0];
	console.log(obj.children);*/
	$.each(obj.children, function(index, item) {
		console.log('item:');
		console.log(item);
		//alert(JSON.stringify(item));
		var content = "";
		content += '<div class="layui-form-item">';
		if(item.boxState == "1") {
			var info = JSON.stringify(item).replace(/\"/g, "'");
			console.log(info);
			content += ' <button type="button" class="layui-btn layui-btn-primary" lay-filter="formDemo" id="' + item.tagName + '"  onclick="pupopsBut(' + info + ')">' + item.text + ' <button>'
		}
		if(item.boxState == "4") {
			var info = JSON.stringify(item).replace(/\"/g, "'");
			content += ' <button type="button" class="layui-btn layui-btn-primary" lay-filter="formDemo" id="' + item.tagName + '"  onclick="pupopsBut(' + info + ')">' + item.text + ' <button>'
		}
		if(item.boxState == "2") {
			content += '<label  class="layui-form-label">' + item.text + '</label >';
			content += '<div class="layui-input-block">';
			content += '<input type="text" name=' + item.tagName + ' lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input">';
			content += '</div>'
		}
		if(item.boxState == "3") {
			content += '<label  class="layui-form-label">' + item.text + '</label >';
			content += '<div class="layui-input-block">';
			//content += '<input type="text" name=' + item.tagName + ' lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input">';
			content += '<select name="' + item.tagName + '">';
			if(item.children) {
				$.each(item.children, function(childrenIndex, childrenItem) {
					content += ' <option value="' + childrenItem.tagName + '">' + childrenItem.text + '</option>';
				});
			} else {
				content += ' <option >123</option>';
			}
			content += '</select>'
			content += '</div>'
		} else if(item.boxState == "") {
			content += '<label  class="layui-form-label">' + item.text + '</label >';
			content += '<div class="layui-input-block">';
			content += '<input type="text" name=' + item.tagName + ' lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input">';
			content += '</div>'
		}
		content += '</div >';
		$("#popupContainer").append(content);
		console.log(form);
		form.render('select');
	});
});

function pupopsBut(item) {
	console.log(item);
	console.log(JSON.stringify(item));
	alert(JSON.stringify(item) + "YuAnming");
	
	debugger;
	//数据类
	var Data = function() {
		var OInit = new Object();
		//各种标志位
		OInit.drawdiv = {};
		OInit.drawdiv["wId"] = "w";
		OInit.drawdiv["index"] = 0;
		OInit.drawdiv["startX"] = 0;
		OInit.drawdiv["startY"] = 0;
		OInit.drawdiv["flag"] = true;
		OInit.drawdiv["frameFlag"] = false;
		OInit.drawdiv["createFlag"] = 0;
		//临时存储坐标和宽高
		OInit.drawdiv["OriginalCoordinatesX"] = 0;
		OInit.drawdiv["OriginalCoordinatesY"] = 0;
		OInit.drawdiv["OriginalWidth"] = 0;
		OInit.drawdiv["OriginalHeight"] = 0;
		//存放框坐标
		OInit.frameObject = {};
		// 点和框的标志位，0代表描点，1代表画框，默认为0描点；
		OInit.drawdiv["spotFrameFlag"] = 1;
		//存放点坐标
		OInit.spotObject = {};
		return OInit;
	};

	var data = new Data();
	var temporary = {};
	temporary["startX"] = data.drawdiv["OriginalCoordinatesX"];
	temporary["startY"] = data.drawdiv["OriginalCoordinatesY"];
	temporary["spotCoordinateX"] = data.drawdiv["OriginalWidth"];
	temporary["spotCoordinateY"] = data.drawdiv["OriginalHeight"];
	data.frameObject[data.drawdiv["index"]] = temporary;

	//drawDiv 画框初始化
	var InitDrawDivDraw = function(data) {
		var firstImg = document.getElementById("first-img");
		var osHeight = firstImg.offsetHeight;
		var osWeight = firstImg.offsetWidth;
		var osLeft = firstImg.offsetLeft;
		var osTop = firstImg.offsetTop;
		var osHeightTop = osHeight + osTop;
		var osWeightw = osLeft + osWeight;

		$("#drawDiv").on("mousedown", function() {
			osHeight = firstImg.offsetHeight;
			osWeight = firstImg.offsetWidth;
			osLeft = firstImg.offsetLeft;
			osTop = firstImg.offsetTop;
			osHeightTop = osHeight + osTop;
			osWeightw = osLeft + osWeight;
			MouseDown(data);

			document.onmousemove = function(ev) {
				if(data.drawdiv["frameFlag"]) {
					var evt = ev || window.event;
					var wId = data.drawdiv["wId"];
					var index = data.drawdiv["index"];
					var startX = data.drawdiv["startX"];
					var startY = data.drawdiv["startY"];

					try {
						var scrollTop = document.getElementById("drawDiv").scrollTop || document.documentElement.scrollTop;
						var scrollLeft = document.getElementById("drawDiv").scrollLeft || document.documentElement.scrollLeft;

						var evtClientX = evt.clientX + scrollLeft;
						var evtClientY = evt.clientY + scrollTop;
						// console.log("evt.clientY==="+evt.clientY)

						var retcLeft = (startX - evtClientX > 0 ? evtClientX : startX);

						if(retcLeft < osLeft) {
							retcLeft = osLeft;
						}
						var retcTop = (startY - evtClientY > 0 ? evtClientY : startY);
						if(retcTop < osTop) {
							retcTop = osTop;
						}
						if(evtClientX > osWeightw) {
							// evtClientX=osWeightw-2;
							evtClientX = osWeightw;
						} else if(evtClientX < osLeft) {
							evtClientX = osLeft;
						}
						// else{
						//     evtClientX-=2;
						// }
						var retcWidth = Math.abs(startX - evtClientX);

						if(evtClientY > osHeightTop) {
							// evtClientY=osHeightTop-2;
							evtClientY = osHeightTop;
						} else if(evtClientY < osTop) {
							evtClientY = osTop;
						}
						// else{
						//     evtClientY-=2;
						// }
						var retcHeight = Math.abs(startY - evtClientY);

						document.getElementById(wId + index).style.marginLeft = retcLeft + "px";
						document.getElementById(wId + index).style.marginTop = retcTop + "px";
						document.getElementById(wId + index).style.width = retcWidth + "px";
						document.getElementById(wId + index).style.height = retcHeight + "px";

						getOriginalCoordinates(data, retcLeft, retcTop, retcWidth, retcHeight);
					} catch(e) {
						//alert(e);
					}
				}
			}
			//松开鼠标
			document.onmouseup = function() {

				//描点
				if(data.drawdiv["spotFrameFlag"] == 0) {
					data.drawdiv["flag"] = true;

				}
				//画框
				else {
					data.drawdiv["frameFlag"] = false;
					//弹出层
					var newNodeLayer = layer.open({
						type: 2,
						title: ['属性信息', 'font-size:15px;', ],
						shade: false,
						btn: ['确定', '取消'],
						maxmin: true,
						yes: function() {
							//保存已存在的画框
							var temporary = {};
							temporary["startX"] = data.drawdiv["OriginalCoordinatesX"];
							temporary["startY"] = data.drawdiv["OriginalCoordinatesY"];
							temporary["spotCoordinateX"] = data.drawdiv["OriginalWidth"];
							temporary["spotCoordinateY"] = data.drawdiv["OriginalHeight"];
							data.frameObject[data.drawdiv["index"]] = temporary;
							//关闭弹出层
							layer.close(newNodeLayer);
						},
						btn2: function() {
							layer.closeAll();
						},
						skin: 'layui-layer-molv', //加上边框
						area: ['500px', '500px'], //宽高
						content: "taskAddPopups.html",
						success: function(layero, index) {
							var body = layui.layer.getChildFrame('body', index);
							console.log(item);
							body.find("#popupsByValue").val(JSON.stringify(item));
							setTimeout(function() {
								layui.layer.tips('点击此处返回上层列表', '.layui-layer-setwin .layui-layer-close', {
									tips: 3
								});
							}, 500)
						}
					});
				}
				document.onmousemove = null;
				document.onmouseup = null;

				console.log(item);

				//保存下拉框
				/*var temporary = {};
						temporary["startX"] = data.drawdiv["OriginalCoordinatesX"];
						temporary["startY"] = data.drawdiv["OriginalCoordinatesY"];
						temporary["spotCoordinateX"] = data.drawdiv["OriginalWidth"];
						temporary["spotCoordinateY"] = data.drawdiv["OriginalHeight"];
						data.frameObject[data.drawdiv["index"]] = temporary;*/

			}
		});

	};
	InitDrawDivDraw(data);
	//drawDiv画框方法 点击
	var MouseDown = function(data) {

		var evt = event || window.event;
		try {
			//描点
			if(data.drawdiv["spotFrameFlag"] == 0) {
				var firstImg = document.getElementById("first-img");
				var osHeight = firstImg.offsetHeight;
				var osWeight = firstImg.offsetWidth;
				var osLeft = firstImg.offsetLeft;
				var osTop = firstImg.offsetTop;
				// 获取图片的原始宽度，高度
				var naturalWidth = firstImg.naturalWidth;
				var naturalHeight = firstImg.naturalHeight;
				//计算与原图的比例
				var scalex = naturalWidth / osWeight;
				var scaley = naturalHeight / osHeight;

				var index = data.drawdiv["index"];
				index++;
				var div = document.createElement("div");
				div.id = data.drawdiv["wId"] + index;
				div.className = "div";
				div.style.position = "absolute";
				div.style.ondragstart = "return false";
				div.style.border = "1px dashed red";
				var parentDiv = document.getElementById("drawDiv");
				parentDiv.appendChild(div);

				var scrollTop = document.getElementById("drawDiv").scrollTop || document.documentElement.scrollTop;
				var scrollLeft = document.getElementById("drawDiv").scrollLeft || document.documentElement.scrollLeft;
				var startX = evt.clientX + scrollLeft;
				var startY = evt.clientY + scrollTop;

				var spotObject = data.spotObject;
				for(var key in spotObject) {
					var identification = spotObject[key];
					if(identification.startX == startX && identification.startY == startY) {
						data.drawdiv["flag"] = false;
						console.log(identification);
					}

				}
				if(data.drawdiv["flag"]) {
					data.drawdiv["index"] = index;
					var oBox = document.getElementById("w" + data.drawdiv["index"]);
					oBox.style.marginLeft = startX + "px";
					oBox.style.marginTop = startY + "px";

					//原始坐标
					var spotCoordinateX = Math.floor((startX - osLeft) * scalex);
					var spotCoordinateY = Math.floor((startY - osTop) * scaley);

					// console.log("spotCoordinateX==="+spotCoordinateX+"==="+spotCoordinateY)

					var temporary = {};
					temporary["startX"] = startX;
					temporary["startY"] = startY;
					temporary["spotCoordinateX"] = spotCoordinateX;
					temporary["spotCoordinateY"] = spotCoordinateY;
					data.spotObject[index] = temporary;

					$("#w" + index).siblings("div").css({
						color: "#00ff00",
						borderColor: "#00ff00"
					});
				} else {
					div.remove();
				}
			}
			//画框
			else {
				data.drawdiv["frameFlag"] = true;
				//根据Flag是否重复决定是否需要创建新的div
				var createFlag = data.drawdiv["createFlag"];
				var frameObject = data.frameObject;
				for(var key in frameObject) {
					if(createFlag == key) {
						createFlag++;
						//设置之前div为绿色；待添加
					}
				}
				if(data.drawdiv["createFlag"] != createFlag || createFlag == 0) {
					if(createFlag == 0) {
						createFlag += 1;
					}
					data.drawdiv["createFlag"] = createFlag;
					var index = data.drawdiv["index"];
					index++;
					data.drawdiv["index"] = index;
					var div = document.createElement("div");
					div.id = data.drawdiv["wId"] + index;
					div.className = "div";
					div.style.position = "absolute";
					div.style.ondragstart = "return false";
					div.style.border = "1px dashed red";
					var parentDiv = document.getElementById("drawDiv");
					parentDiv.appendChild(div);

				}
				var scrollTop = document.getElementById("drawDiv").scrollTop || document.documentElement.scrollTop;
				var scrollLeft = document.getElementById("drawDiv").scrollLeft || document.documentElement.scrollLeft;
				data.drawdiv["startX"] = evt.clientX + scrollLeft;
				data.drawdiv["startY"] = evt.clientY + scrollTop;
				var oBox = document.getElementById("w" + data.drawdiv["index"]);
				oBox.style.marginLeft = data.drawdiv["startX"] + "px";
				oBox.style.marginTop = data.drawdiv["startY"] + "px";

				//对oBox大小归零
				oBox.style.width = 0 + "px";
				oBox.style.height = 0 + "px";

				$("#w" + index).siblings("div").css({
					color: "#00ff00",
					borderColor: "#00ff00"
				});
			}
			// console.log(data);
		} catch(e) {}

	}
	var getOriginalCoordinates = function(data, retcLeft, retcTop, retcWidth, retcHeight) {
		var firstImg = document.getElementById("first-img");
		// 获取图片的原始宽度，高度
		var naturalWidth = firstImg.naturalWidth;
		var naturalHeight = firstImg.naturalHeight;

		var osHeight = firstImg.offsetHeight;
		var osWeight = firstImg.offsetWidth;

		var firstImg = document.getElementById("first-img");
		var osLeft = firstImg.offsetLeft;
		var osTop = firstImg.offsetTop;

		var scalex = naturalWidth / osWeight;
		var scaley = naturalHeight / osHeight;

		var zzz = (retcLeft - osLeft) * scalex;
		var ccc = (retcTop - osTop) * scaley;
		var vvv = retcWidth * scalex;
		var bbb = retcHeight * scaley;
		//原始坐标
		var OriginalCoordinatesX = Math.floor((retcLeft - osLeft) * scalex);
		var OriginalCoordinatesY = Math.floor((retcTop - osTop) * scaley);
		var OriginalWidth = Math.floor(retcWidth * scalex);
		var OriginalHeight = Math.floor(retcHeight * scaley);

		data.drawdiv["OriginalCoordinatesX"] = OriginalCoordinatesX;
		data.drawdiv["OriginalCoordinatesY"] = OriginalCoordinatesY;
		data.drawdiv["OriginalWidth"] = OriginalWidth;
		data.drawdiv["OriginalHeight"] = OriginalHeight

		// console.log(zzz+"==="+ccc+"==="+vvv+"==="+bbb);
		// console.log(OriginalCoordinatesX+"==="+OriginalCoordinatesY+"==="+OriginalWidth+"==="+OriginalHeight);
		// return;
	}
}


	//弹出层
							/*var newNodeLayer = layer.open({
								type: 1,
								//type: 2,
								title: ['属性信息', 'font-size:15px;', ],
								shade: false,
								btn: ['确定', '取消'],
								maxmin: true,
								yes: function() {
									var temporary = {};
									temporary["startX"] = data.drawdiv["OriginalCoordinatesX"];
									temporary["startY"] = data.drawdiv["OriginalCoordinatesY"];
									temporary["spotCoordinateX"] = data.drawdiv["OriginalWidth"];
									temporary["spotCoordinateY"] = data.drawdiv["OriginalHeight"];
									data.frameObject[data.drawdiv["index"]] = temporary;
									//关闭弹出层
									layer.close(newNodeLayer);
								},
								btn2: function() {
									layer.closeAll();
								},
								skin: 'layui-layer-molv', //加上边框
								area: ['500px', '500px'], //宽高
								content: $('#popupsData')*/
							//content: taskAddPopups.html,,
							/*	success: function(layero, index) {
								form=layui.form()//的话 就加下面那句
									var body = layui.layer.getChildFrame('body', index);
									console.log(item);
									body.find("#popupValue").val(JSON.stringify(item));
									setTimeout(function() {
										layui.layer.tips('点击此处返回上层列表', '.layui-layer-setwin .layui-layer-close', {
											tips: 3
										});
									}, 500)
									form.render('checkbox');}*/

							//});