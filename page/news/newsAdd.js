layui.use(['table', 'layer', 'form', 'tree'], function() {
	var table = layui.table,
		form = layui.form,
		$ = layui.jquery,
		templateLayer

	//设置选着模板 空模板 0

	//弹出框
	$("#newBtnNewsAdd").on("click", function() {
		miaoshu = 0;
		templateLayer = layer.open({
			type: 1,
			title: ['模板名称', 'font-size:18px;', ],
			shade: false,
			skin: 'layui-layer-molv', //加上边框
			area: ['500px', '400px'], //宽高
			content: $("#layformNewsAdd")
		});
	});

	$.ajax({
		type: "post",
		url: urlname + "template/selectTemName.action ",
		async: false,
		success: function(data) {
			var jsonData = JSON.parse(data);
			console.log(jsonData);
			if(jsonData.code == "0" || jsonData.code == 0) {
				for(var j = 0; j < jsonData.message.length; j++) {
					str = jsonData.message[j];
					$("#existtemp").append('<option value="">' + str + '</option>');
				}
				renderForm();
			} else {
				alert("模板不存在");
			}
		}

	});

	var treeData = [];

	$("#treeName").jstree({
		'core': {
			'data': treeData,
			'check_callback':function(operation, node, parent, position, more){
				/*console.log(operation);
				console.log(node);
				console.log(parent);
				console.log(position);
				debugger;*/
					if(operation == 'rename_node'){
							var curId = node.id;
							$.each(treeData, function(i,item){
								console.log(item);
									if(item.id == curId){
										item['text'] = position;
									}
									treeData[i] = item;
							})
					}
					if(operation=='delete_node'){
						var curId = node.id;
						$.each(treeData, function(i,item){
							/*console.log(item.id);
							console.log(treeData);*/
									if(item.id == curId){
										debugger;
										//JSON.stringify(treeData).remove(i);
										//treeData.remove(i);//删除下标为i的对象 
									treeData.splice(i,1);//从start的位置开始向后删除delCount个元素
									console.log(treeData);
									}
									//treeData[i] = item;
							})
					}
					console.log(treeData);
					//$('#treeName').jstree(true).settings.core.data = treeData;
					//$('#treeName').jstree(true).refresh();
			}
		},
		"contextmenu": {
			select_node: true,
			show_at_node: true,
			items: {
				"新建设备": {
					"label": "新建数据",
					"icon": "glyphicon glyphicon-plus",
					"action": function(data) {
						var inst = $.jstree.reference(data.reference),
							obj = inst.get_node(data.reference),
							new_node = {};

						console.log(inst);
						console.log(obj);
						//新建节点弹出层
						var newNodeLayer = layer.open({
							type: 1,
							title: ['输入参数', 'font-size:18px;', ],
							shade: false,
							skin: 'layui-layer-molv', //加上边框
							area: ['550px', '480px'], //宽高
							content: $("#laycanshu")
						});
					
						//获取节点的状态
							value="";
							form.on('select(lableName)', function(data) {
								console.log(data.value); //得到被选中的值
								value = data.value;
							});
						
						$("#determineName").off("click");
						$("#determineName").on("click", function() {
							new_node.text = $("#attribute").val();
							new_node.tagName = $("#EnglishName").val();
							new_node.boxState = value;
							new_node.id = $("#customId").val();
							new_node.parent = obj.id;
							console.log(new_node);
							treeData.push(new_node);
							$('#treeName').jstree(true).settings.core.data = treeData;
							$('#treeName').jstree(true).refresh();
							
							//关闭弹出层
							layer.close(newNodeLayer);
						});
					}

				},
				"修改名称": {
					"separator_before": false,
					"separator_after": false,
					"_disabled": false, //(this.check("rename_node", data.reference, this.get_parent(data.reference), "")),  
					"label": "修改名称",
					"shortcut_label": 'F2',
					"icon": "glyphicon glyphicon-leaf",
					"action": function(data) {
						var inst = $.jstree.reference(data.reference),
							obj = inst.get_node(data.reference);
						inst.edit(obj);
					}
				},
				"参数数据": {
					"separator_before": false,
					"icon": false,
					"separator_after": false,
					"_disabled": false, //(this.check("delete_node", data.reference, this.get_parent(data.reference), "")),  
					"label": "删除数据",
					"icon": "glyphicon glyphicon-remove",
					"action": function(data) {
						var inst = $.jstree.reference(data.reference),
							obj = inst.get_node(data.reference);
						if(inst.is_selected(obj)) {
							inst.delete_node(inst.get_selected());
						} else {
							inst.delete_node(obj);
						}
					}
				}
			}
		},
		"plugins": ["contextmenu"]
	});

	//确定
	$("#queding").off();
	$("#queding").on("click", function() {
		//根节点数据
		var rootData = {};
		rootData.text = $('#mingcheng').val();
		rootData.id = "root";
		rootData.parent = "#";
		treeData.push(rootData);
		console.log(treeData);
		
		//关闭新建模板的弹出层
		layer.close(templateLayer);
		//刷新树
		$('#treeName').jstree(true).settings.core.data = treeData;
		$('#treeName').jstree(true).refresh();
		console.log(treeData);
	});

	//取消
	$("#quxiao").on("click", function() {
		$("#mingcheng").val("");

	});
	//设置选着模板 空模板
	source2 = 0;
	form.on('radio(emptyAn)', function(data) {

		//alert(data.value);
		source2 = data.value;
	});
	//设置选着模板 现有模板 1
	form.on('radio(existingAn)', function(data) {

		
		source2 = data.value;
	});

	$("#saveBtnNewAdd").on("click", function() {
		if(treeData==null||treeData==""){
			alert("没有模板信息");
		}else{
			//$('#treeName').jstree(true).refresh();
		nodeData=treeData;
		console.log(nodeData);
		//alert(treeData+"Yu");
		//var ref = $('#treeName').jstree(true).get_json();
		$('#treeName').jstree(true).select_all();
		var ref=$('#treeName').jstree(true).get_selected(true);
		
		console.log($('#treeName').jstree(true).get_selected(true));
		//alert(ref);
		console.log(ref);
		var dumJson = [];
		createJson(nodeData);

		function createJson(san) {
			$.each(san, function(index, item) {
				//retryTest(item);
				dumJson.push(item);
			});
		}
		//过滤
		function retryTest(param) {
			$.each(param, function(i, item) {
				//console.log(i);
				if(i != 'id' && i != 'data' && i != 'tagName' && i!='boxState'&& i != 'text' && i != 'children') {
					delete param[i];
				}
			});
			if(param.children) {
				$.each(param.children, function(index, item) {
					retryTest(item);
				});
			}
		}

		console.log(dumJson);

		//var dataStr=JSON.stringify(dumJson);
		//json转xml
		//dumxml = json2xml(dumJson);
		
		//json数据序列化
		dumJsontwo = JSON.stringify(dumJson);
		
		console.log(dumJsontwo);
		
		//alert(dumJsontwo);
		//将字符串转换成二进制形式，中间用空格隔开
		function strToBinary(str) {
			var result = [];
			var list = str.split("");
			for(var i = 0; i < list.length; i++) {
				if(i != 0) {
					result.push(" ");
				}
				var item = list[i];
				bing = item.charCodeAt().toString(2);
				result.push(bing);
			}
			return result.join("");
		};

		//二进制流数据
		binaryJson = strToBinary(dumJsontwo.UrlEncode());

		//获取当前时间
		timestamp = (new Date()).valueOf();

		/*//空模板
		source = sourcetempalte;*/
		source = source2;
		//模板描述
		templateDescribe = $("#DescribeAnming").val();
		
		
		//userId
		userId = 1;
		//企业编码
		companyid = 1;
		//用户组
		userGroup = "科度科技";
		//权限
		authority = 99;
		//草稿
		templateState = 1,
         rootName=$('#mingcheng').val();
         //alert(rootName);
			console.log(timestamp);
		console.log(templateDescribe);
		//JSON.stringify(dumJson);
		var template = {
			templateName: rootName,
			templateDescribe: templateDescribe,
			source: source,
			userId: userId,
			companyid: companyid,
			userGroup: userGroup,
			authority: authority,
			creationTime: timestamp,
			templateState: templateState,
			//xmlStructure: binaryJson
			saveXmlStructure: dumJsontwo

		}
		$.ajax({
			type: "post",
			url: urlname + "template/template.action",
			contentType: 'application/json', //默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。  
			dataType: "json", //预期服务器返回的数据类型  
			data: JSON.stringify(template),
			success: function(data) {

				console.log(data.code);
				if(data.code == "0" || data.code == 0) {
					alert("成功");
				   // window.history.back(-1);
				} else if(data.code == "-4" || data.code == -4) {
					alert("用户名已存在");
				} else if(data.code == -1 || data.code == "-1") {
					alert("失败");
				} else if(data.code == -2 || data.code == "-2") {
					alert("无参数");
				} else if(data.code == -3 || data.code == "-3") {
					alert("没有权限");
				} else {
					alert("其他問題");
				}
			}
		});
		}
		
	});

});

function renderForm() {
	layui.use('form', function() {
		var form = layui.form;
		form.render();
	});
}