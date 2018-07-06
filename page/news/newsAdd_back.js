$(function(){
		var data = [{
					"text": "测试人脸模板",
					"id": "root",
					"parent": "#"
				}, {
					"text": "肤色",
					"tagName": "complexion",
					"boxState": "3",
					"id": "1",
					"parent": "root"
				}, {
					"text": "部位",
					"tagName": "part",
					"boxState": "",
					"id": "2",
					"parent": "root"
				}, {
					"text": "黄色",
					"tagName": "color",
					"boxState": "2",
					"id": "3",
					"parent": "1"
				}, {
					"text": "黑色",
					"tagName": "black",
					"boxState": "2",
					"id": "4",
					"parent": "1"
				}, {
					"text": "白色",
					"tagName": "whiteness",
					"boxState": "2",
					"id": "5",
					"parent": "1"
				}, {
					"text": "脸部位置",
					"tagName": "location",
					"boxState": "1",
					"id": "5",
					"parent": "2"
				}];
			
			var finalData = [{
					"text": "测试人脸模板",
					"id": "root",
					"parent": "#"
				}];
			
			var   dataList = new Array();
			$.each(data, function(i,item) {
				 	var curData;
					if(item.parent == 'root'){
							retry(item);
							dataList.push(item);
					}
			});
			
			function retry(param){
				var curList = new Array();
				$.each(data,function(i,item){
					if(item.parent == param.id){
						retry(param.id);
						curList.push(item);
					}
				});
				param['children'] = curList;
			}
			
			finalData[0]['children'] = dataList;
			console.log(finalData);
})
	function ce(param){
			/*	for(var i = 0; i < tempData.length; i++) {
						id = tempData[i].id;
						tagName = tempData[i].tagName;
						textName = tempData[i].text;
						boxState = tempData[i].boxState;
						parent = tempData[i].parent;
						console.log(id);
						console.log(JSON.stringify(id));
						if(tempData[i].parent == "root") {
							console.log(tagName);
							console.log(textName);
							var context = "";
							context += '<div class="layui-form-item">';
							context += '<label  class="layui-form-label">' + textName + '</label >'
							

							for(var j = 0; j < tempData.length; j++) {
								if(tempData[j].parent == id && tempData[j].boxState == "1" && id != "root") {
									context += '<div class="layui-input-block">';
									context += '<input type="text" name=' + tagName + ' lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">';
									context += '</div>'
								} else if(tempData[j].parent == id && tempData[j].boxState == "2" && id != "root") {
									context += '<div class="layui-input-block">';
									context += '<select lay-filter="aihao">';
									context += ' <option value="' + tempData[j].text + '">' + tempData[j].text + '</option>';
									context += '</select>'
									context += '</div>'
								} else if(tempData[j].parent == id && tempData[j].boxState == "3" && id != "root") {
									context += '<div class="layui-input-block">';
									context += '<select name="interest" lay-filter="aihao">';
									context += ' <option value="' + textName + '">' + textName + '</option>';
									context += '</div>'
								} else if(tempData[j].parent == id && tempData[j].boxState == "" && id != "root") {
									$("#boxInput").append('<input lay-verify="required|phone" autocomplete="off" class="layui-input"  value="' + tagName + '" name=""/>');
									$('#boxInput').show();
									$("#inputId").show();
								}
							}
							context += '</div">';
							$("#attributeContainer").append(context);
						} else {

						}

					}*/
	}
