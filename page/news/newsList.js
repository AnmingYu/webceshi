layui.use(['table', 'layer'], function() {
	var table = layui.table,
		$ = layui.jquery
	//第一个实例
	
	tempalteName = $('#searchContextnewsList').val(),
		//alert(tempalteName);
	
	table.render({
		elem: '#demo',

		cellMinWidth : 95,
		height : "full-125",
		url: urlname + "template/templateSearch.action", //数据接口
		page: true, //开启分页
		where: {
			temName: tempalteName,
		},
		limit: 10,
		limits: [10, 20, 50, 100],
		id: 'testReload',
		response: {
			countName: 'total', //数据总数的字段名称，默认：count
			dataName: 'message' //数据列表的字段名称，默认：data
		},
		cols: [
			[ //表头
				{
					field: 'id',
					title: '序号',
					width: 200,
					sort: true,
					fixed: 'left'
				}, {
					field: 'templateName',
					title: '模板名称',
					width: 240
				}, {
					field: 'templateDescribe',
					title: '模板描述',
					event: 'setSign',
					width: 240,
					sort: false
				}, {
					field: 'creationTime',
					title: '创建时间',
					width: 240
				}, {
					field: 'userId',
					title: '用户名',
					width: 240

				}, {
					field: 'authority',
					title: '权限',
					width: 240

				}, {
					field: 'templateState',
					title: '模板状态',
					width: 240
				}, {
					fixed: 'right',
					width: 300,
					align: 'center',
					toolbar: '#barDemo'
				}
			]
		]
	});
	$("#searchBtnNewsList").on("click", function(){
		var demoReload = $("#searchContextnewsList");
		
		table.reload('testReload', {
			where: {
					temName: demoReload.val()
			},
			page:{
				curr:1 // 重新从第 1 页开始
			}
		});
	});
	
	var table = layui.table;
	//监听工具条

	table.on('tool(test)', function(obj) {

		var data2 = obj.data;
		//alert(data2.templateName);
		if(obj.event === 'detail') {
			$.ajax({
				type: "post",
				url: urlname + "template/templateChoice.action",
				async: false,
				data: {
					templateName: data2.templateName
				},
				success: function(data) {
					var jsonData = JSON.parse(data);
					if(jsonData.code == 0 || jsonData.code == "0") {
						//alert(jsonData.message);
						layer.msg('查看数据：<br>' + JSON.stringify(jsonData.message))
					}

				}
			});
		}

	});

	$("#searchBtnNewsList").on("click", function() {
		var search = $("#searchContextnewsList").val();

	});

	$("#newBtnNewsList").on("click", function() {
		addNews(true);
	});

	function addNews(edit) {
		var index = layui.layer.open({
			title: "添加模板",
			type: 2,
			content: "newsAdd.html",
			success: function(layero, index) {
				var body = layui.layer.getChildFrame('body', index);
				if(edit) {
					body.find(".newsName").val(edit.newsName);
					body.find(".abstract").val(edit.abstract);
					body.find(".thumbImg").attr("src", edit.newsImg);
					body.find("#news_content").val(edit.content);
					body.find(".newsStatus select").val(edit.newsStatus);
					body.find(".openness input[name='openness'][title='" + edit.newsLook + "']").prop("checked", "checked");
					body.find(".newsTop input[name='newsTop']").prop("checked", edit.newsTop);
					//form.render();
				}
				setTimeout(function() {
					layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
						tips: 3
					});
				}, 500)
			}
		})
		layui.layer.full(index);
		//改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
		$(window).on("resize", function() {
			layui.layer.full(index);
		})
	}
});