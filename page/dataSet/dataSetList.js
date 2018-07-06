layui.use(['table', 'layer'], function() {
	
	var table = layui.table,
		$ = layui.jquery
	
    dataSetId=0;
	dataSetName = $('#searchContext').val(),
	//第一个实例
	table.render({
		elem: '#Anmingdemo',
		//width: 930,
		cellMinWidth : 95,
		height : "full-125",
		url: urlname + "dataset/searchDataSetTask.action", //数据接口
		page: true, //开启分页
		where:{
			dataTask: dataSetName,
		},
		limit: 10,
		limits: [10, 20, 50, 100],
		id: 'testReloadDataSet',
		response: {
			countName: 'total' //数据总数的字段名称，默认：count
				,
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
					field: 'dataSetTask',
					title: '数据集名称',
					width: 240
				}, {
					field: 'dataSetDescribe',
					title: '数据集描述',
					event: 'setSign',
					width: 240,
					sort: false
				}, {
					field: 'creationTime',
					title: '创建时间',
					width: 240
				}, {
					field: 'username',
					title: '用户名',
					width: 240

				}, {
					field: 'authority',
					title: '权限',
					width: 240

				}, {
					fixed: 'right',
					title: '操作',
					width: 300,
					align: 'center',
					toolbar: '#barDemo'
				}
			]
		]
	});
	
	$("#newBtn").on("click", function() {
		addNews(true);
	});
	//搜索
	$("#searchBtn").on("click", function() {

		var demoReload = $("#searchContext");
		table.reload('testReloadDataSet', {
			where: {
				dataTask: demoReload.val(),
			},
			page: {
				curr: 1 // 重新从第 1 页开始
			}
		});

	});

  //监听单元格事件
  table.on('tool(test)',function(obj){
  	var data=obj.data;
  	console.log(data);
  	if(obj.event === 'edit'){
  		//创建任务
  		dataSetId=data.id;
  		newDataSet(true);
  	}else if(obj.event==="detail"){
  		 //layer.msg('ID：'+ data.id + ' 的查看操作');
  		 //查看任务
  		 dataSetId=data.id;
  		// alert(dataSetId);
  		 taskList(true);
  	}
  	
  });
  function taskList(edit) {
		var index = layui.layer.open({
			title: "添加模板",
			type: 2,
			content: "taskList.html",
			success: function(layero, index) {
				var body = layui.layer.getChildFrame('body', index);
				if(edit) {
					body.find("#dataId").val(dataSetId);
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
  function newDataSet(edit) {
		var index = layui.layer.open({
			title: "添加任务数据",
			type: 2,
			content: "dataSetNewTask.html",
			success: function(layero, index) {
				var body = layui.layer.getChildFrame('body', index);
				if(edit) {
					body.find("#dataSetId").val(dataSetId);
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
  
	function addNews(edit) {
		var index = layui.layer.open({
			title: "添加模板",
			type: 2,
			content: "dataSetAdd.html",
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