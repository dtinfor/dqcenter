var User = {
	//列表页面加载方法
	loadPage : function() {
		jQuery("#grid-table").jqGrid({
			url:'list',
		    datatype: 'json',     
			mtype: "POST",
			height: 250,
			rownumbers: true,
			rownumWidth:50,
			colNames:['id','','登录名', '姓名','Email', '状态','最后修改人','最后修改时间'],
			colModel:[
			    {name:'id',index:'id',width:90,hidden:true},
			    {name:'action',index:'id',width:25,hidden:false,fixed:true},
			    {name:'username',index:'username',width:90,editable:false},
			    {name:'realname',index:'realname',width:90,editable:false},
			    {name:'email',index:'email',width:140,editable:false},
			    {name:'isValid',index:'is_Valid', width:90,editable:false,formatter:statusChange},
				{name:'lastUpdateUserName',index:'LAST_UPDATE_USER_NAME',width:90},
				{name:'lastUpdateDate',index:'LAST_UPDATE_DATE',width:90,formatter:dateFormatter}
			], 
			viewrecords : false,
			rowNum:10,
			rowList:[10,20,30],
			pager : "#grid-pager",
			multiselect: false,
	        multiboxonly: false,
			altRows: true,
			autowidth: true,
			caption: "用户列表",
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
				'username':$("#search_username").val()
			};
			jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })
			.trigger("reloadGrid");
		});
	
		//新增按钮
		$('#new').click(function(){
			$('#user-input').removeData("bs.modal");
			$('#user-input').modal({
				remote:'input?timestamp=' + new Date().getTime(),
				backdrop:'static'
			});
			$('#btn_new').button('loading');
		});
		
		//修改按钮
		$('#edit').click(function(){
			
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("user-input", "修改记录时只能选择一条记录！");
			}else{
				$('#user-input').removeData("bs.modal");
				$('#user-input').modal({
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
				CommUtils.commAlert("user-input", "请选择一条记录！");
			}else{
				$('#user-input').removeData("bs.modal");
				$('#btn_selectMenu').button('loading');
				$('#user-input').modal({
					remote:'selectMenu?timestamp=' + new Date().getTime() + "&id=" + rowIds[0],
					backdrop:'static'
				});
				$('#btn_selectMenu').button('loading');
			}
		});
		
		//选择角色按钮
		$('#selectRole').click(function(){
			var rowIds = CommUtils.getJqgridSelected("grid-table");   
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("user-input", "请选择一条记录！");
			}else{
				$('#user-input').removeData("bs.modal");
				$('#btn_selectRole').button('loading');
				$('#user-input').modal({
					remote:'selectRole?timestamp=' + new Date().getTime() + "&id=" + rowIds[0],
					backdrop:'static'
				});
				$('#btn_selectRole').button('loading');
			}
		});
		
		//选择组织机构按钮
		$('#selectOrg').click(function(){
			var rowIds = CommUtils.getJqgridSelected("grid-table");   
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("user-input", "请选择一条记录！");
			}else{
				$('#user-input').removeData("bs.modal");
				$('#btn_selectOrg').button('loading');
				$('#user-input').modal({
					remote:'selectOrg?timestamp=' + new Date().getTime() + "&id=" + rowIds[0],
					backdrop:'static'
				});
				$('#btn_selectOrg').button('loading');
			}
		});
		
		//选择岗位按钮
		$('#selectPost').click(function(){
			var rowIds = CommUtils.getJqgridSelected("grid-table");   
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("user-input", "请选择一条记录！");
			}else{
				$('#user-input').removeData("bs.modal");
				$('#btn_selectPost').button('loading');
				$('#user-input').modal({
					remote:'selectPost?timestamp=' + new Date().getTime() + "&id=" + rowIds[0],
					backdrop:'static'
				});
				$('#btn_selectPost').button('loading');
			}
		});

		//删除按钮
		$('#delete').click(function(){
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			if (rowIds.length == 0){
				CommUtils.commAlert("user-input", "请选择一条或多条记录！");
			}else{
				CommUtils.commDelete("user-input", "确认您是否要删除所选中的记录？",rowIds);
			}
		});
	},
	//修改页面加载方法
	loadInputPage: function(){
		
		$('#btn_new').button('reset');
		$('#btn_edit').button('reset');
		
		if ($("#editId").val()){
			$("#input-title").html("修改用户");
		}else{
			$("#input-title").html("新增用户");
		}
		
		$('#user_fmt').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: true,
			rules:{
				username:{
					required:true,
					remote:{
						url:'validateExist',
						type:'post',
						data:{
							username:function(){
								return $('#username').val();
							},
							id:function(){
								return $('#editId').val();
							}
						}
					}				
				},
				realname:{
					required:true
				},
				email:{
					email:true
				}, 
				passwd: {
					required:true,
				      minlength: 6
			    },
				repasswd: {
			    	required:true,
				      equalTo: "#passwd",
				      minlength: 6
			    }
			},messages:{
				userName:{
					required:"帐号名称为必填项",
					remote:"帐号名称已存在"
				},
				realname:{
					required:"真实名为必填项"
				},
				email:{
					email:"Email格式不正确"
				},
				passwd: {
					required:'请输入密码',
					minlength: "密码最少六位"
			    },
				repasswd: {
			    	required:'请再次输入密码',
					equalTo: "两次输入的密码不相同",
					minlength: "密码最少六位"
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
			var isValid = $('#user_fmt').valid();
			if(isValid){
				$.ajax({
					type:'POST',
					url:'save',
					data:$('#user_fmt').serialize(),
					dataType:'json',
					success:function(json){
						if(json.status == "success"){
							$('#user-input').load(contextPath + '/common/success.jsp',
									{msg:'操作已成功，用户"<b>'+$('#username').val()+'"</b>保存成功',
									 seconds:'3000',
									 tips:''},'');
							
							$('#grid-table').trigger("reloadGrid");
						}else{
							$('#user-input').load();
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
		$("#userId").val(rowIds[0]);
		
		$('#save_selectMenu_btn').click(function(){
			
			$("#menuIds").val($('#menu_tree').jstree("get_selected"));
			$.ajax({
				type:'POST',
				url:'saveUserMenuRel',
				data:"userId="+$("#userId").val()+"&menuIds="+$("#menuIds").val(),
				dataType:'json',
				success:function(json){
					if(json.status == "success"){
						$('#user-input').load(contextPath + '/common/success.jsp',
								{msg:'操作已成功',
								 seconds:'3000',
								 tips:''},'');
					}else{
						$('#user-input').load();
					}
				}
			});
		});
	},
	//选择角色加载
	loadSelectRolePage: function(){
		
		$('#btn_selectRole').button('reset');
		
		Role.buildTree();
		
		var rowIds = CommUtils.getJqgridSelected("grid-table"); 
		$("#userId").val(rowIds[0]);
		
		$('#save_selectRole_btn').click(function(){
			$("#roleIds").val($('#role_tree').jstree("get_selected"));
			$.ajax({
				type:'POST',
				url:'saveUserRoleRel',
				data:"userId="+$("#userId").val()+"&roleIds="+$("#roleIds").val(),
				dataType:'json',
				success:function(json){
					if(json.status == "success"){
						$('#user-input').load(contextPath + '/common/success.jsp',
								{msg:'操作已成功',
								 seconds:'3000',
								 tips:''},'');
					}else{
						$('#user-input').load();
					}
				}
			});
		});
	},
	//选择组织机构加载
	loadSelectOrgPage: function(){
		
		$('#btn_selectOrg').button('reset');
		Org.buildTree(true);
		
		var rowIds = CommUtils.getJqgridSelected("grid-table"); 
		$("#userId").val(rowIds[0]);
		
		$('#save_selectOrg_btn').click(function(){
			$("#orgIds").val($('#org_tree').jstree("get_selected"));
			$.ajax({
				type:'POST',
				url:'saveUserOrgRel',
				data:"userId="+$("#userId").val()+"&orgIds="+$("#orgIds").val(),
				dataType:'json',
				success:function(json){
					if(json.status == "success"){
						$('#user-input').load(contextPath + '/common/success.jsp',
								{msg:'操作已成功',
								 seconds:'3000',
								 tips:''},'');
					}else{
						$('#user-input').load();
					}
				}
			});
		});
	},
	//选择岗位加载
	loadSelectPostPage: function(){
		
		$('#btn_selectPost').button('reset');
		
		Post.buildTree(true);
		
		var rowIds = CommUtils.getJqgridSelected("grid-table"); 
		$("#userId").val(rowIds[0]);
		
		$('#save_selectPost_btn').click(function(){
			$("#postIds").val($('#post_tree').jstree("get_selected"));
			$.ajax({
				type:'POST',
				url:'saveUserPostRel',
				data:"userId="+$("#userId").val()+"&postIds="+$("#postIds").val(),
				dataType:'json',
				success:function(json){
					if(json.status == "success"){
						$('#user-input').load(contextPath + '/common/success.jsp',
								{msg:'操作已成功',
								 seconds:'3000',
								 tips:''},'');
					}else{
						$('#user-input').load();
					}
				}
			});
		});
	}
}