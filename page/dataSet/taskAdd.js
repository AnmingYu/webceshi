layui.use(['table', 'layer', 'form', 'tree'], function() {
	
	
$(function(){

		

	var table = layui.table,
		form = layui.form,
		$ = layui.jquery
	//debugger;
	//获取数据集下对应模板的数据
	tempAttribute = $("#attribute").val();
	alert(tempAttribute + "#attribute");
	taskId = $('#gainTaskId').val();
	taskIntId = Number(taskId);
	taskSetId = JSON.stringify(taskIntId);
	alert(taskSetId + "taskSetId");
	console.log(taskId);
	console.log(taskIntId);
	console.log(taskSetId);
	var spotX = "";
	var spotY = "";
	var beginX = "";
	var beginY = "";
	var jsonDataSet = "";
	var fadfa = {};

	//当前页面获取到的form数据	
	var currentPageForm = [];
	var popupSplicetwo = "";
	//弹出层获取到的数据
	var popupPageForm = [];
	//数据类
	Data = function(item) {
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
		if(item.boxState == "1") {

			OInit.drawdiv["spotFrameFlag"] = 1;
		}
		if(item.boxState == "4") {
			OInit.drawdiv["spotFrameFlag"] = 0;
		}
		//存放点坐标
		OInit.spotObject = {};
		//alert(OInit.spotObject +"点坐标");
		return OInit;
	};
	MouseDown = function(data) {
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
				//debugger;
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
					console.log(parentDiv);
					console.log(parentDiv.appendChild(div));

				}
				var scrollTop = document.getElementById("drawDiv").scrollTop || document.documentElement.scrollTop;
				var scrollLeft = document.getElementById("drawDiv").scrollLeft || document.documentElement.scrollLeft;
				data.drawdiv["startX"] = evt.clientX + scrollLeft - 2;
				data.drawdiv["startY"] = evt.clientY + scrollTop - 2;
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
	//查询模板中属性
	//alert(222)
	$.ajax({
		type: "post",
		url: urlname + "task/selectTemJson",
		async: false,
		data: {
			datasetId: tempAttribute
		},
		success: function(data) {
			var jsonData = JSON.parse(data);
			if(jsonData.code == "0" || jsonData.code == 0) {
				console.log(JSON.stringify(JSON.message));
				console.log(jsonData.message);
				var tempData2 = jsonData.message;
				console.log(tempData2);
				tempData = JSON.parse(tempData2);
				console.log(tempData);
				console.log(tempData.length);
				finalData = [{
					"id": "root",
					"parent": "#"
				}];
				var dataList = new Array();
				$.each(tempData, function(i, item) {
					var curData;
					if(item.parent == 'root') {
						retry(item);
						dataList.push(item);
					}
				});
				function retry(param) {
					var curList = new Array();
					$.each(tempData, function(i, item) {
						if(item.parent == param.id) {
							retry(item);
							curList.push(item);
						}
					});
					param['children'] = curList;
				}
				finalData[0]['children'] = dataList;
				console.log(finalData);
				tempData = finalData;
			} else {
				alert("失败");
			}
		}
	});
	console.log(tempData);
	var root = tempData[0];

	$.each(root.children, function(index, item) {
		var context = "";
		context += '<div class="layui-form-item">';
		//context += '<label  class="layui-form-label">' + item.text + '</label >';
		if(item.boxState == 1) {
			var info = JSON.stringify(item).replace(/\"/g, "'");
			context += ' <button type="button" class="layui-btn layui-btn-primary" lay-filter="formDemo" id="' + item.tagName + '"  onclick="but(' + info + ')">' + item.text + ' <button>'
		}
		if(item.boxState == 4) {
			var info = JSON.stringify(item).replace(/\"/g, "'");
			context += ' <button type="button" class="layui-btn layui-btn-primary" lay-filter="formDemo" id="' + item.tagName + '"  onclick="but(' + info + ')">' + item.text + ' <button>'
		}
		if(item.boxState == 2) {
			context += '<label  class="layui-form-label">' + item.text + '</label >';
			context += '<div class="layui-input-block">';
			context += '<input type="text" name=' + item.tagName + ' lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input">';
			context += '</div>'
		}
		if(item.boxState == 3) {
			context += '<label  class="layui-form-label">' + item.text + '</label >';
			context += '<div class="layui-input-block">';
			context += '<select name="' + item.tagName + '">';
			$.each(item.children, function(childrenIndex, childrenItem) {
				context += ' <option value="' + childrenItem.tagName + '"name="' + childrenItem.tagName + '">' + childrenItem.text + '</option>';
			});
			context += '</select>'
			context += '</div>'
		} else if(item.boxState == "") {
			context += '<label  class="layui-form-label">' + item.text + '</label >';
			context += '<div class="layui-input-block">';
			context += '<input type="text" name=' + item.tagName + ' lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input">';
			context += '</div>'
		}
		context += '</div">';
		$("#attributeContainer").append(context);
		form.render('select');

	});

//	debugger;
	but = function(item) {
		console.log(item);
		console.log(JSON.stringify(item));
		alert(JSON.stringify(item) + "Anming");
		var data = new Data(item);
		butState = true;
		if(butState == true) {
			butState = false;
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
								document.getElementById(wId + index).style.width = retcWidth - 2 + "px";
								document.getElementById(wId + index).style.height = retcHeight - 2 + "px";
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
							console.log(item);
							var parameter = item[0];
							console.log(item.children);
							if(item.children != null || item.children != "") {
								$('#popupContainer').html("");
							}

							$.each(item.children, function(index, item) {

								console.log('item:');
								console.log(item);
								var content = "";
								//弹出层
								var newNodeLayer = layer.open({
									type: 1,
									title: ['属性信息', 'font-size:15px;', ],
									shade: false,
									btn: ['确定', '取消'],
									yes: function() {
										var temporary = {};
										temporary["startX"] = data.drawdiv["OriginalCoordinatesX"];
										temporary["startY"] = data.drawdiv["OriginalCoordinatesY"];
										temporary["spotCoordinateX"] = data.drawdiv["OriginalWidth"];
										temporary["spotCoordinateY"] = data.drawdiv["OriginalHeight"];
										data.frameObject[data.drawdiv["index"]] = temporary; 

										beginX = temporary.startX;
										beginY = temporary.startY;
										spotX = temporary.spotCoordinateX;
										spotY = temporary.spotCoordinateY;
										alert(temporary + "弹出层" + "spotCoordinateX : " + temporary.spotCoordinateX);
										console.log(temporary);
										//弹出层数据
										var coordinate = " ,beginX =" + beginX + " ,beginY= " + beginY + " ,spotX=" + spotX + " , spotY=" + spotY;
										var formContent = $('#form1').serialize();
										var groupData = formContent + coordinate;
										var popup = groupData.replace(/=/g, ":");
										var popups = popup.replace(/&/g, ",");
										popupSplice = popups.split(",");
										var dataw = {};
										console.log(popupSplice);
										$.each(popupSplice, function(i, item) {
											var keyValue = item.split(":");
											dataw[keyValue[0]] = keyValue[1];
										});
										//console.log(dataw);								
										popupPageForm.push(dataw);
										popupSplicetwo = popupSplicetwo + popupSplice + "\r\n";
										$("#contextShow").text(popupSplicetwo);
										//关闭弹出层
										layer.close(newNodeLayer);
									},
									btn2: function() {
										layer.closeAll();
									},
									skin: 'layui-layer-molv', //加上边框
									area: ['480px', '480px'], //宽高
									content: $("#popupsData")
								});
								content += '<div class="layui-form-item">';
								if(item.boxState == "1") {
									var info = JSON.stringify(item).replace(/\"/g, "'");
									content += ' <button type="button" class="layui-btn layui-btn-primary" lay-filter="formDemo" id="' + item.tagName + '"  onclick="but(' + info + ')">' + item.text + ' <button>'
								}
								if(item.boxState == "4") {
									var info = JSON.stringify(item).replace(/\"/g, "'");
									content += ' <button type="button" class="layui-btn layui-btn-primary" lay-filter="formDemo" id="' + item.tagName + '"  onclick="but(' + info + ')">' + item.text + ' <button>'
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
									content += '<select name="' + item.tagName + '">';
									if(item.children) {
										$.each(item.children, function(childrenIndex, childrenItem) {
											content += ' <option value="' + childrenItem.tagName + '" name="' + childrenItem.tagName + '">' + childrenItem.text + '</option>';
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

						}
						//画框
						else {
							console.log("画框");
							data.drawdiv["frameFlag"] = false;

							console.log(item);
							var parameter = item[0];
							console.log(item.children);
							if(item.children != null || item.children != "") {
								$('#popupContainer').html("");
							}
							$.each(item.children, function(index, item) {
								console.log('item:');
								console.log(item);
								var content = "";
								//弹出层
								var newNodeLayer = layer.open({
									type: 1,
									title: ['属性信息', 'font-size:15px;', ],
									shade: false,
									btn: ['确定', '取消'],
									yes: function() {
										var temporary = {};
										temporary["startX"] = data.drawdiv["OriginalCoordinatesX"];
										temporary["startY"] = data.drawdiv["OriginalCoordinatesY"];
										temporary["spotCoordinateX"] = data.drawdiv["OriginalWidth"];
										temporary["spotCoordinateY"] = data.drawdiv["OriginalHeight"];
										data.frameObject[data.drawdiv["index"]] = temporary; 

										beginX = temporary.startX;
										beginY = temporary.startY;
										spotX = temporary.spotCoordinateX;
										spotY = temporary.spotCoordinateY;
										alert(temporary + "弹出层" + "spotCoordinateX : " + temporary.spotCoordinateX);
										console.log(temporary);
										//弹出层数据
										var coordinate = "  " + beginX + " , " + beginY + " , " + spotX + " , " + spotY;
										
										var formContent = $('#form1').serialize();
										var groupData = formContent + coordinate;
										var popup = groupData.replace(/=/g, ":");
										var popups = popup.replace(/&/g, ",");
										popupSplice = popups.split(",");
										var dataw = {};
										console.log(popupSplice);
										$.each(popupSplice, function(i, item) {
											var keyValue = item.split(":");
											dataw[keyValue[0]] = keyValue[1];
										});
												
										popupPageForm.push(dataw);
										popupSplicetwo = popupSplicetwo + popupSplice + "\r\n";
										$("#contextShow").text(popupSplicetwo);
										
										//console.log(dataw);						
										//console.log(popupPageForm);																	   
										// console.log(JSON.stringify(popupPageForm));
										
										//关闭弹出层
										layer.close(newNodeLayer);
									},
									btn2: function() {
										layer.closeAll();
									},
									skin: 'layui-layer-molv', //加上边框
									area: ['480px', '480px'], //宽高
									content: $("#popupsData")
								});
								content += '<div class="layui-form-item">';
								if(item.boxState == "1") {
									var info = JSON.stringify(item).replace(/\"/g, "'");
									content += ' <button type="button" class="layui-btn layui-btn-primary" lay-filter="formDemo" id="' + item.tagName + '"  onclick="but(' + info + ')">' + item.text + ' <button>'
								}
								if(item.boxState == "4") {
									var info = JSON.stringify(item).replace(/\"/g, "'");
									content += ' <button type="button" class="layui-btn layui-btn-primary" lay-filter="formDemo" id="' + item.tagName + '"  onclick="but(' + info + ')">' + item.text + ' <button>'
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
									content += '<select name="' + item.tagName + '">';
									if(item.children) {
										$.each(item.children, function(childrenIndex, childrenItem) {
											content += ' <option value="' + childrenItem.tagName + '" name="' + childrenItem.tagName + '">' + childrenItem.text + '</option>';
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

						}
						document.onmousemove = null;
						document.onmouseup = null;
						console.log(item);
					}
				});
			};

		}
		//drawDiv 画框初始化
		InitDrawDivDraw(data);
		//drawDiv画框方法 点击
		MouseDown(data);

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

			//console.log(zzz + "===" + ccc + "===" + vvv + "===" + bbb);
			//console.log(OriginalCoordinatesX + "===" + OriginalCoordinatesY + "===" + OriginalWidth + "===" + OriginalHeight);

			// return;

		}
	}
	//debugger;
	//查询所有未完成数据ajax
	var e = 0;
	$.ajax({
		type: "post",
		url: urlname + "results/selectAllResult",
		async: true,
		data: {
			taskId: taskIntId
		},
		success: function(data) {
			jsonDataSet = JSON.parse(data);
			console.log(jsonDataSet.code);
			//接口返回数据
			if(jsonDataSet.code == "0" || jsonDataSet.code == 0) {
				console.log(jsonDataSet.message);
				taskData = jsonDataSet.message;
				//	alert(taskData.length + "YuAn");
				//判断图片是否存在
				console.log(taskData.length);
				if(taskData.length == "" || taskData == null) {
					$("#first-img").attr("src", "http://img05.tooopen.com/images/20140728/sy_67611752335.jpg");
				} else {
					if(taskData[e].annotationState != 0 || taskData[e].annotationState != "0") {
						$("#first-img").attr("src", "http://img05.tooopen.com/images/20140728/sy_67611752335.jpg");
					} else {
						console.log(taskData + "Yu");
						first_picture_url = urlname + taskData[e].picturePath;
						console.log(first_picture_url);
						$("#first-img").attr("src", first_picture_url);
						//dataStrip = taskData.length;
						//下一页
						$("#nextPagetaskAdd").click(function(event) {
							
							e++;
							console.log(e);
							if(e < taskData.length) {
								//当前任务中图片的序号
								alert(taskData.length + "Anming" + e);
								picturePath2 = taskData[e].picturePath;
								picture_url = urlname + picturePath2;
								resultId2 = taskData[e].resultId;
								$("#first-img").attr("src", picture_url);
								console.log(picturePath2);
								alert(resultId2 + "resultId2");
								//清空所有画框		
								$("div").remove(".div");
								//textarea标签中的内容清空
								$("#contextShow").text("");
								popupSplicetwo="";
								event.preventDefault();

							} else if(e > taskData.length) {
								alert("已经是最后一张图片");
								event.preventDefault();
							} else {
								alert("已经是最后一张图片");

								event.preventDefault();
							}

						});

						//确定
						$("#submitDataTaskAdd").on("click", function() {
							//页面数据currentPageForm  弹出层数据 popupPageForm
							alert(popupPageForm + "popupPageForm");
							console.log(popupPageForm);

							var currentPage = $('#form2').serialize();;
							var current = currentPage.replace(/=/g, ":");
							var current2 = current.replace(/&/g, ",");
							var currentSplice = current2.split(",");
							var datacurrent = {};
							$.each(currentSplice, function(i, item) {
								var keyValue = item.split(":");
								datacurrent[keyValue[0]] = keyValue[1];
							});

							datacurrent['popup'] = popupPageForm;
							console.log(popupPageForm);
							currentPageForm.push(datacurrent);
							var datacurrent = JSON.stringify(currentPageForm);
							console.log(datacurrent);
							resultId3 = taskData[e].resultId;
							state = taskData[e].annotationState;

							console.log(resultId3);
							alert(resultId3 + "Anming" + state);
							
							
							console.log('datacurrent : ' )
							console.log(datacurrent )

							//判断图片处理状态
							if(state == 0 || state == "0") {
								var states = 0;
								//更新结果表
								$.ajax({
									type: "post",
									url: urlname + "results/commitResult",
									async: true,
									data: {
										resultId: resultId3,
										resultJson: datacurrent,
										state: states
									},
									success: function(data) {
										jsonDataSet2 = JSON.parse(data);
										if(jsonDataSet2.code == "0" || jsonDataSet2.code == 0) {
											//alert("成功");
											e++;
											console.log(e);
											if(e < taskData.length) {
												//当前任务中图片的序号
												picturePath2 = taskData[e].picturePath;
												picture_url = urlname + picturePath2;
												resultId2 = taskData[e].resultId;
												$("#first-img").attr("src", picture_url);
												console.log(picturePath2);
												$("div").remove(".div");
												//textarea标签中的内容清空
												$("#contextShow").text("");
												popupSplicetwo="";
											} else if(e > taskData.length) {
												alert("已经是最后一张图片");
											} else {
												alert("已经是最后一张图片");
											}
										} else if(jsonDataSet2.code == "-1" || jsonDataSet2.code == -1) {
											alert("失败");
										} else if(jsonDataSet2.code == "-2" || jsonDataSet2.code == -2) {
											alert("无参数");
										} else if(jsonDataSet2.code == "-3" || jsonDataSet2.code == -3) {
											alert("无权限");
										} else if(jsonDataSet2.code == "-4" || jsonDataSet2.code == -4) {
											alert("用户已存在");
										} else if(jsonDataSet2.code == "-5" || jsonDataSet2.code == -5) {
											alert("创建图片保存异常");
										} else {
											alert("异常数据信息");
										}
									}
								});
							} else {
								alert("该照片的状态为已经处理状态,将不再进行处理");
							}
							// 停止活动事件
							event.preventDefault();
						});
					}
				}
			} else {
				alert("获取图片信息失败");
			}
		}
	});
		
});
});