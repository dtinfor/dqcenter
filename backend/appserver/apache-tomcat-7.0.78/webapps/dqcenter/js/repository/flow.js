var Flow = {
	//角色选择树
	buildTree : function (){
    	$('#role_tree').jstree({
			plugins:["checkbox", "wholerow"], 
			core : {
				themes : {
					name : false,
					dots : false,
					icons : false
				},
		    	data : {
		    		type : "json",
		    		method : "post",
		    		url : contextPath + "/system/role/listForTree?timestamp=" + new Date().getTime()
		    	}
			},
			checkbox : {
				three_state : true
			}
		})
		.bind('load_node.jstree', function() {   
			var checkNodeIds = $("#roleIds").val().split(",");
			$("#role_tree").find("li").each(function(index,item) {
				for (var i = 0; i < checkNodeIds.length; i++) {
					if ($(item).attr("id") == checkNodeIds[i]) { 
						if ($('#role_tree').jstree("is_parent", '#'+$(item).attr("id")) == false){
							$('#role_tree').jstree("select_node", '#'+$(item).attr("id"), true);
						}
					}
				}
			});
	    });
	},
	//列表页面加载方法
	loadPage : function() {
		jQuery("#grid-table").jqGrid({
			url:'list',
		    datatype: 'json',     
			mtype: "POST",
			height: 250,
			rownumbers: true,
			rownumWidth:50,
			colNames:['flow_id','','t_insu_id', 'code_number', 'operatingtime', 'is_del'],
			colModel:[
			    {name:'id',index:'id',width:90,hidden:true},
			    {name:'action',index:'action',width:25,hidden:false,fixed:true},
			    {name:'insuranceId',index:'insuranceId',width:25,hidden:false,fixed:true},
			    {name:'codeId',index:'codeId',width:90,editable:false},
			    {name:'operatingTime',index:'operatingTime',width:90,editable:false},
				{name:'isDel',index:'isDel', width:90,editable:false,formatter:statusChange},
			], 
			
			viewrecords : false,
			rowNum:10,
			rowList:[10,20,30],
			pager : "#grid-pager",
			multiselect: false,
	        multiboxonly: false,
			altRows: true,
			autowidth: true,
			caption: "流程列表",
			jsonReader : {   
		      root:"result",
		      total:'totalPages',
		      page:'page',
		      records:'rows'   
			},
			loadComplete : function() {
				var table = this;
				setTimeout(function(){
					updatePagerIcons(table);
				}, 0);
			},
			gridComplete : function(){
				var ids = jQuery("#grid-table").jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++){
					var cl = ids[i];
					checkbox = "<label><input name=\"grid-checkbox\" value=\"" 
						+ cl + "\"type=\"checkbox\" class=\"ace\"><span class=\"lbl\"></span></label>"; 
					jQuery("#grid-table").jqGrid('setRowData',ids[i],{action:checkbox});
				}	
			}
		});
		
		//查询按钮
		$('#search').click(function(){
			var json = {
				'ID':$("#id").val(),
			};
			jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })
			.trigger("reloadGrid");
		});
	
		//新增按钮
		$('#new').click(function(){
//			alert('new1');
//			$('#flow-input').removeData("bs.modal");
//			alert('new2');
//			$('#flow-input').modal({
//				remote:'input?timestamp=' + new Date().getTime(),
//				backdrop:'static'
//			});
//			alert('new3');
//			$('#btn_new').button('loading');
//			alert('new4');
			
			$('#flow-input').removeData("bs.modal");
			$('#flow-input').modal({
				remote:'input?timestamp=' + new Date().getTime(),
				backdrop:'static'
			});
			$('#btn_new').button('loading');
		});
		
		//修改按钮
		$('#edit').click(function(){
			
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("flow-input", "修改记录时只能选择一条记录！");
			}else{
				$('#flow-input').removeData("bs.modal");
				$('#flow-input').modal({
					remote:'input?timestamp=' + new Date().getTime() + "&id=" + rowIds[0],
					backdrop:'static'
				});
				$('#btn_edit').button('loading');
			}
		});

		

		//删除按钮
		$('#delete').click(function(){
			var rowIds = CommUtils.getJqgridSelected("grid-table");
			if (rowIds.length == 0){
				CommUtils.commAlert("flow-input", "请选择一条或多条记录！");
			}else{
				CommUtils.commDelete("flow-input", "确认您是否要删除所选中的记录？",rowIds);
			}
		});
	},
	//修改页面加载方法
	loadInputPage: function(){
		alert("asdfasfd");
		$('#btn_new').button('reset');
		$('#btn_edit').button('reset');
		
		if ($("#editId").val()){
			$("#input-title").html("修改流程");
		}else{
			$("#input-title").html("新增流程");
		}
		
		$('#flow_fmt').validate({
			
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: true,
			rules:{
				roleName:{
					required:true,
					remote:{
						url:'validateExist',
						type:'post',
						data:{
							insuranceId:function(){
								return $('#insuranceIdVal').val();
							},
							id:function(){
								return $('#editId').val();
							}
						}
					}				
				},
				roleCode:{
					required:true,
					remote:{
						url:'validateExistCode',
						type:'post',
						data:{
							roleCode:function(){
								return $('#roleCode').val();
							},
							id:function(){
								return $('#editId').val();
							}
						}
					}				
				}
			},messages:{
				roleName:{
					required:"角色名称为必填项",
					remote:"角色名称已存在"
				},
				roleCode:{
					required:"角色编码为必填项",
					remote:"角色编码已存在"
				}
			},
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
	
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error').addClass('has-info');
				$(e).remove();
			}
		});

		//保存按钮
		$('#save_btn').click(function(){
			var isValid = $('#flow_fmt').valid();
			alert('isValid='+isValid);
			if(isValid){
				$.ajax({
					type:'POST',
					url:'save',
					data:$('#flow_fmt').serialize(),
					dataType:'json',
					success:function(json){
						if(json.status == "success"){
							$('#flow-input').load(contextPath + '/common/success.jsp',
									{msg:'操作已成功，角色"<b>'+$('#insuranceIdVal').val()+'"</b>保存成功',
									 seconds:'3000',
									 tips:''},'');
							
							$('#grid-table').trigger("reloadGrid");
						}else{
							$('#flow-input').load();
						}
					}
				});
			}
		});
	},
	//选择菜单加载
	loadSelectMenuPage: function(){
		
		$('#btn_selectMenu').button('reset');
		
		Menu.buildTree();
		
		var rowIds = CommUtils.getJqgridSelected("grid-table"); 
		$("#roleId").val(rowIds[0]);
		
		$('#save_selectMenu_btn').click(function(){
			$("#menuIds").val($('#menu_tree').jstree("get_selected"));
			$.ajax({
				type:'POST',
				url:'saveRoleMenuRel',
				data:"roleId="+$("#roleId").val()+"&menuIds="+$("#menuIds").val(),
				dataType:'json',
				success:function(json){
					if(json.status == "success"){
						$('#flow-input').load(contextPath + '/common/success.jsp',
								{msg:'操作已成功',
								 seconds:'3000',
								 tips:''},'');
					}else{
						$('#flow-input').load();
					}
				}
			});
		});
	}
}