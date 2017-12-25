var Role = {
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
			colNames:['id','','角色名称', '角色编码', '状态', '创建人','创建时间','最后修改人','最后修改时间'],
			colModel:[
			    {name:'id',width:90,hidden:true},
			    {name:'action',index:'id',width:25,hidden:false,fixed:true},
			    {name:'roleName',index:'role_Name',width:90,editable:false},
			    {name:'roleCode',index:'role_Code',width:90,editable:false},
				{name:'isValid',index:'is_Valid', width:90,editable:false,formatter:statusChange},
				{name:'createUserName',index:'create_User_Name',width:90},
				{name:'createDate',index:'create_Date',width:90,formatter:dateFormatter},
				{name:'lastUpdateUserName',index:'LAST_UPDATE_USER_NAME',width:90},
				{name:'lastUpdateDate',index:'LAST_UPDATE_DATE',width:90,formatter:dateFormatter},
			], 
			viewrecords : false,
			rowNum:10,
			rowList:[10,20,30],
			pager : "#grid-pager",
			multiselect: false,
	        multiboxonly: false,
			altRows: true,
			autowidth: true,
			caption: "角色列表",
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
				'roleName':$("#roleName").val()
			};
			jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })
			.trigger("reloadGrid");
		});
	
		//新增按钮
		$('#new').click(function(){
			$('#role-input').removeData("bs.modal");
			$('#role-input').modal({
				remote:'input?timestamp=' + new Date().getTime(),
				backdrop:'static'
			});
			$('#btn_new').button('loading');
		});
		
		//修改按钮
		$('#edit').click(function(){
			
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("role-input", "修改记录时只能选择一条记录！");
			}else{
				$('#role-input').removeData("bs.modal");
				$('#role-input').modal({
					remote:'input?timestamp=' + new Date().getTime() + "&id=" + rowIds[0],
					backdrop:'static'
				});
				$('#btn_edit').button('loading');
			}
		});

		//选择菜单按钮
		$('#selectMenu').click(function(){
			var rowIds = CommUtils.getJqgridSelected("grid-table");
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("role-input", "请选择一条记录！");
			}else{
				$('#role-input').removeData("bs.modal");
				$('#btn_selectMenu').button('loading');
				$('#role-input').modal({
					remote:'selectMenu?timestamp=' + new Date().getTime() + "&id=" + rowIds[0],
					backdrop:'static'
				});
				$('#btn_selectMenu').button('loading');
			}
		});

		//删除按钮
		$('#delete').click(function(){
			var rowIds = CommUtils.getJqgridSelected("grid-table");
			if (rowIds.length == 0){
				CommUtils.commAlert("role-input", "请选择一条或多条记录！");
			}else{
				CommUtils.commDelete("role-input", "确认您是否要删除所选中的记录？",rowIds);
			}
		});
	},
	//修改页面加载方法
	loadInputPage: function(){
		
		$('#btn_new').button('reset');
		$('#btn_edit').button('reset');
		
		if ($("#editId").val()){
			$("#input-title").html("修改角色");
		}else{
			$("#input-title").html("新增角色");
		}
		
		$('#role_fmt').validate({
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
							roleName:function(){
								return $('#roleNameVal').val();
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
			var isValid = $('#role_fmt').valid();
			if(isValid){
				$.ajax({
					type:'POST',
					url:'save',
					data:$('#role_fmt').serialize(),
					dataType:'json',
					success:function(json){
						if(json.status == "success"){
							$('#role-input').load(contextPath + '/common/success.jsp',
									{msg:'操作已成功，角色"<b>'+$('#roleNameVal').val()+'"</b>保存成功',
									 seconds:'3000',
									 tips:''},'');
							
							$('#grid-table').trigger("reloadGrid");
						}else{
							$('#role-input').load();
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
						$('#role-input').load(contextPath + '/common/success.jsp',
								{msg:'操作已成功',
								 seconds:'3000',
								 tips:''},'');
					}else{
						$('#role-input').load();
					}
				}
			});
		});
	}
}