var User = {
	//列表页面加载方法
	loadPage : function() {
		jQuery("#grid-table").jqGrid({
			
//			url:'list',
//		    datatype: 'json',
		    
		    data : [ {
		    	
		    	id : "13387210",
				编号 : "编号",
				供应商名称 : "供应商名称",
				客户 : "客户",
				协议 : "协议"

				
			}, {
				id : "13387210",
				编号 : "编号",
				供应商名称 : "供应商名称",
				客户 : "客户",
				协议 : "协议"
					
			}

			],
			datatype : "local",
			
			
			mtype: "POST",
			height: 250,
			rownumbers: true,
			rownumWidth:50,
//			供应商名称、产品名称、产品价格、有效期、是否追溯、产品支付方式
			colNames:['id','','编号','供应商名称', '客户','协议'],
			colModel:[
			    {name:'id',index:'id',width:90,hidden:true},
			    {name:'action',index:'action',width:16},
			    {name:'编号',index:'编号',width:100,editable:true},
			    {name:'供应商名称',index:'产品名称',width:90,editable:false},
			    {name:'客户',index:'客户',width:90,editable:false},
			    {name:'协议',index:'协议',width:90,editable:false}
			], 
			viewrecords : false,
			rowNum:10,
			rowList:[10,20,30],
			pager : "#grid-pager",
			multiselect: false,
	        multiboxonly: false,
			altRows: true,
			autowidth: true,
			caption: "项目书列表",
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
				'username':$("#search_username").val(),
			};
			jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })
			.trigger("reloadGrid");
		});
	
		//新增按钮
		$('#new').click(function(){
			$('#user-input').removeData("bs.modal");
			$('#user-input').modal({
				remote:'inputNew?timestamp=' + new Date().getTime(),
				backdrop:'static'
			});
//			$('#btn_new').button('loading');
		});
		
		//修改按钮
		$('#edit').click(function(){
			
			var rowIds = getJqgridSelected("grid-table");
			
			if (rowIds.length > 1 || rowIds.length == 0){
				User.commAlert("#user-input", "修改记录时只能选择一条记录！");
			}else{
				$('#user-input').removeData("bs.modal");
				$('#user-input').modal({
					remote:'inputNew?timestamp=' + new Date().getTime() + "&id=" + rowIds[0],
					backdrop:'static'
				});
				$('#btn_edit').button('loading');
			}
		});

		//保存
		$('#selectMenu').click(function(){
			var rowIds = getJqgridSelected("grid-table");
			window.location = contextPath + '/salagent/list';
			if (rowIds.length > 1 || rowIds.length == 0){
				//User.commAlert("#user-input", "请选择一条记录!!");
			}else{
//				$('#user-input').removeData("bs.modal");
//				$('#btn_selectMenu').button('loading');
				
				window.location = (contextPath + '/salagent/list?timestamp=' + new Date().getTime() + "&id=" + rowIds[0]);
				
//				$('#user-input').modal({
//					remote:'salagent/product/list?timestamp=' + new Date().getTime() + "&id=" + rowIds[0],
//					backdrop:'static'
//				});
//				$('#btn_selectMenu').button('loading');
			}
		});
		
		//选择角色按钮
		$('#selectRole').click(function(){
			var rowIds = getJqgridSelected("grid-table");   
			if (rowIds.length > 1 || rowIds.length == 0){
				User.commAlert("#user-input", "请选择一条记录！");
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
			var rowIds = getJqgridSelected("grid-table");   
			if (rowIds.length > 1 || rowIds.length == 0){
				User.commAlert("#user-input", "请选择一条记录！");
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
			var rowIds = getJqgridSelected("grid-table");   
			if (rowIds.length > 1 || rowIds.length == 0){
				User.commAlert("#user-input", "请选择一条记录！");
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
			var rowIds = getJqgridSelected("grid-table");    
			if (rowIds.length == 0){
				User.commAlert("#user-input", "请选择一条或多条记录！");
			}else{
				User.commDelete("#user-input", "确认您是否要删除所选中的记录？",rowIds);
			}
		});
	},
	//修改页面加载方法
	loadInputPage: function(){
		
		$('#btn_new').button('reset');
		$('#btn_edit').button('reset');
		
		if ($("#editId").val()){
			$("#input-title").html("修改");
		}else{
			$("#input-title").html("新增");
		}
		
		$('#user_fmt-').validate({
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
			$('#user-input').removeData("bs.modal");
			
			$('#user-input').modal({
				remote:'inputNew2?timestamp=' + new Date().getTime(),
				backdrop:'static'
			});
			
			
			
		});
	},
	//选择菜单加载
	loadSelectMenuPage: function(){
		
		$('#btn_selectMenu').button('reset');
		
		Menu.buildTree(true);
		
		$('#menu_tree').on('loaded', function (evt) {
			var $sel = $('#menu_tree').find('.tree-item');
			var menuids = $('#oldMenuIds').val();
			$.each($sel, function (index, value) {
				var data = $(value).data();
				if (menuids.indexOf(data.id) != -1){
					$(this).attr("class","tree-item tree-selected");
					$(this).find("i").attr("class","icon-ok");
				}
			});
			
			//设置已经选ID
			var $sel = $('#menu_tree').find('.tree-selected');
			var data = [];
			$.each($sel, function (index, value) {
				var i = $(value).data();
				data.push(i);
			});
			var ids = [];
			var superIds = [];
			$.each(data, function (index, value) {
				ids.push(value.id);
				superIds.push(value.superId);
			});
			$("#menuIds").val(ids.join(","));
			
			//取父节点ID，删除数组中的重复数据
			var newSuperIds = [];
			for(var i = 0,len = superIds.length;i < len;i++){ 
				! RegExp(superIds[i],"g").test(newSuperIds.join(",")) && (newSuperIds.push(superIds[i])); 
			} 
			$("#menuSuperIds").val(newSuperIds.join(","));
		});
		
		$('#menu_tree').on('click', function (evt, data) {
			var $sel = $('#menu_tree').find('.tree-selected');
			var data = [];
			$.each($sel, function (index, value) {
				var i = $(value).data();
				data.push(i);
			});
			var ids = [];
			var superIds = [];
			$.each(data, function (index, value) {
				ids.push(value.id);
				superIds.push(value.superId);
			});
			$("#menuIds").val(ids.join(","));
			
			//取父节点ID，删除数组中的重复数据
			var newSuperIds = [];
			for(var i = 0,len = superIds.length;i < len;i++){ 
				! RegExp(superIds[i],"g").test(newSuperIds.join(",")) && (newSuperIds.push(superIds[i])); 
			} 
			$("#menuSuperIds").val(newSuperIds.join(","));
		});
		
		var rowIds = getJqgridSelected("grid-table"); 
		$("#userId").val(rowIds[0]);
		
		$('#save_selectMenu_btn').click(function(){
			$.ajax({
				type:'POST',
				url:'saveUserMenuRel',
				data:"userId="+$("#userId").val()+"&menuIds="+$("#menuIds").val()+"&menuSuperIds="+$("#menuSuperIds").val(),
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
		
		$('#role_tree').on('loaded', function (evt) {
			var $sel = $('#role_tree').find('.tree-item');
			var roleids = $('#oldRoleIds').val();
			$.each($sel, function (index, value) {
				var data = $(value).data();
				if (roleids.indexOf(data.id) != -1){
					$(this).attr("class","tree-item tree-selected");
					$(this).find("i").attr("class","icon-ok");
				}
			});
			
			//设置已经选 ID
			var $sel = $('#role_tree').find('.tree-selected');
			var data = [];
			$.each($sel, function (index, value) {
				var i = $(value).data();
				data.push(i);
			});
			var ids = [];
			$.each(data, function (index, value) {
				ids.push(value.id);
			});
			$("#roleIds").val(ids.join(","));
		});
		
		$('#role_tree').on('click', function (evt, data) {
			var $sel = $('#role_tree').find('.tree-selected');
			var data = [];
			$.each($sel, function (index, value) {
				var i = $(value).data();
				data.push(i);
			});
			var ids = [];
			$.each(data, function (index, value) {
				ids.push(value.id);
			});
			$("#roleIds").val(ids.join(","));
		});
		
		var rowIds = getJqgridSelected("grid-table"); 
		$("#userId").val(rowIds[0]);
		
		$('#save_selectRole_btn').click(function(){
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
		
		$('#org_tree').on('loaded', function (evt) {
			var $sel = $('#org_tree').find('.tree-item');
			var orgids = $('#oldOrgIds').val();
			$.each($sel, function (index, value) {
				var data = $(value).data();
				if (orgids.indexOf(data.id) != -1){
					$(this).attr("class","tree-item tree-selected");
					$(this).find("i").attr("class","icon-ok");
				}
			});
		});
		
		$('#org_tree').on('click', function (evt, data) {
			var $sel = $('#org_tree').find('.tree-selected');
			var data = [];
			$.each($sel, function (index, value) {
				var i = $(value).data();
				data.push(i);
			});
			var ids = [];
			$.each(data, function (index, value) {
				ids.push(value.id);
			});
			$("#orgIds").val(ids.join(","));
		});
		
		var rowIds = getJqgridSelected("grid-table"); 
		$("#userId").val(rowIds[0]);
		
		$('#save_selectOrg_btn').click(function(){
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
		
		$('#post_tree').on('loaded', function (evt) {
			var $sel = $('#post_tree').find('.tree-item');
			var postids = $('#oldPostIds').val();
			$.each($sel, function (index, value) {
				var data = $(value).data();
				if (postids.indexOf(data.id) != -1){
					$(this).attr("class","tree-item tree-selected");
					$(this).find("i").attr("class","icon-ok");
				}
			});
		});
		
		$('#post_tree').on('click', function (evt, data) {
			var $sel = $('#post_tree').find('.tree-selected');
			var data = [];
			$.each($sel, function (index, value) {
				var i = $(value).data();
				data.push(i);
			});
			var ids = [];
			$.each(data, function (index, value) {
				ids.push(value.id);
			});
			$("#postIds").val(ids.join(","));
		});
		
		var rowIds = getJqgridSelected("grid-table"); 
		$("#userId").val(rowIds[0]);
		
		$('#save_selectPost_btn').click(function(){
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
	},
	commAlert:function(modalId,msg){
		$(modalId).load(contextPath + '/common/alert.jsp',{msg:msg,seconds:'3000',tips:''},'');
	},
	commDelete:function(modalId,msg,delIds){
		delIds = delIds.join(",");      
		$(modalId).load(contextPath + '/common/deleteRequest.jsp',
				{msg:msg,
				 delIds:delIds,
				 modalId:modalId,
				 gridTableId:"#grid-table",
				 deleteUrl:"delete",
				 seconds:'3000',
				 tips:''}
				,'');
	}
}