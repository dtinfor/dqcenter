var User = {
	//列表页面加载方法
	loadPage : function() {
		var dataStr = {  
						"totalPages":11,  
						"page":1,  
						"records":11,  
						"result":[  
							{"id":1, "productName":"苏州养老20+8","productType":"养老保险","eRatio":"0.20","pRatio":"0.08","eAddMoney":"0","pAddMoney":"0","caculateType":"四舍五入","precision":"2","idVaild":"有效","createUserName":"admin","createDate":"2014-04-11 10:35:00","lastUpdateUserName":"admin","lastUpdateDate":"2014-04-11 10:35:00"},  
						    {"id":3, "productName":"苏州医疗7+2","productType":"医疗保险","eRatio":"0.07","pRatio":"0.02","eAddMoney":"0","pAddMoney":"0","caculateType":"四舍五入","precision":"2","idVaild":"有效","createUserName":"admin","createDate":"2014-04-11 10:35:00","lastUpdateUserName":"admin","lastUpdateDate":"2014-04-11 10:35:00"},  
						    {"id":2, "productName":"苏州医疗7+0","productType":"医疗保险","eRatio":"0.07","pRatio":"0.00","eAddMoney":"0","pAddMoney":"0","caculateType":"四舍五入","precision":"2","idVaild":"有效","createUserName":"admin","createDate":"2014-04-11 10:35:00","lastUpdateUserName":"admin","lastUpdateDate":"2014-04-11 10:35:00"} ,
						    {"id":4, "productName":"苏州工伤1.5+0","productType":"工伤保险","eRatio":"0.015","pRatio":"0.00","eAddMoney":"0","pAddMoney":"0","caculateType":"四舍五入","precision":"2","idVaild":"无效","createUserName":"admin","createDate":"2014-04-11 10:35:00","lastUpdateUserName":"admin","lastUpdateDate":"2014-04-11 10:35:00"},  
						    {"id":5, "productName":"苏州失业1+0","productType":"失业保险","eRatio":"0.01","pRatio":"0.00","eAddMoney":"0","pAddMoney":"0","caculateType":"四舍五入","precision":"2","idVaild":"有效","createUserName":"admin","createDate":"2014-04-11 10:35:00","lastUpdateUserName":"admin","lastUpdateDate":"2014-04-11 10:35:00"},  
						    {"id":6, "productName":"苏州生育2.2+0","productType":"生育保险","eRatio":"0.022","pRatio":"0.00","eAddMoney":"0","pAddMoney":"0","caculateType":"四舍五入","precision":"2","idVaild":"有效","createUserName":"admin","createDate":"2014-04-11 10:35:00","lastUpdateUserName":"admin","lastUpdateDate":"2014-04-11 10:35:00"},
						    {"id":7, "productName":"苏州公积金10+10","productType":"住房公积金","eRatio":"0.10","pRatio":"0.10","eAddMoney":"0","pAddMoney":"0","caculateType":"四舍五入","precision":"2","idVaild":"有效","createUserName":"admin","createDate":"2014-04-11 10:35:00","lastUpdateUserName":"admin","lastUpdateDate":"2014-04-11 10:35:00"} ,
						    {"id":8, "productName":"苏州公积金8+8","productType":"住房公积金","eRatio":"0.08","pRatio":"0.08","eAddMoney":"0","pAddMoney":"0","caculateType":"四舍五入","precision":"2","idVaild":"有效","createUserName":"admin","createDate":"2014-04-11 10:35:00","lastUpdateUserName":"admin","lastUpdateDate":"2014-04-11 10:35:00"},  
						    {"id":9, "productName":"苏州补充公积金12+12","productType":"补充公积金","eRatio":"0.12","pRatio":"0.12","eAddMoney":"0","pAddMoney":"0","caculateType":"四舍五入","precision":"2","idVaild":"有效","createUserName":"admin","createDate":"2014-04-11 10:35:00","lastUpdateUserName":"admin","lastUpdateDate":"2014-04-11 10:35:00"},  
						    {"id":10, "productName":"苏州养老21+7","productType":"养老保险","eRatio":"0.21","pRatio":"0.07","eAddMoney":"0","pAddMoney":"0","caculateType":"四舍五入","precision":"2","idVaild":"有效","createUserName":"admin","createDate":"2014-04-11 10:35:00","lastUpdateUserName":"admin","lastUpdateDate":"2014-04-11 10:35:00"},
							{"id":11, "productName":"苏州大病保险","productType":"大病保险","eRatio":"0.00","pRatio":"0.00","eAddMoney":"0","pAddMoney":"10","caculateType":"四舍五入","precision":"2","idVaild":"有效","createUserName":"admin","createDate":"2014-04-11 10:35:00","lastUpdateUserName":"admin","lastUpdateDate":"2014-04-11 10:35:00"}  
						]  
						
					  };
		jQuery("#grid-table").jqGrid({
			datastr : dataStr,
		    datatype: 'jsonstring',     
			height: 360,
			width: 1280,
			rownumbers: true,
			rownumWidth:50,
			colNames:['id','','产品名称','产品类型','企业比例','个人比例','企业附加金额','个人附加金额','进位方式','小数精度','是否有效','创建人','创建时间','修改人','修改时间'],
			colModel:[
			    {name:'id',index:'id',width:90,hidden:true},
			    {name:'action',index:'action',width:15,hidden:false},
			    {name:'productName',index:'productName',width:150,editable:false},
			    {name:'productType',index:'productType',width:60,editable:false},
			    {name:'eRatio',index:'eRatio',width:40,editable:false},
			    {name:'pRatio',index:'pRatio',width:40,editable:false},
			    {name:'eAddMoney',index:'eAddMoney',width:60,editable:false},
			    {name:'pAddMoney',index:'pAddMoney',width:60,editable:false},
			    {name:'caculateType',index:'caculateType',width:60,editable:false},
			    {name:'precision',index:'precision',width:40,editable:false},
			    {name:'idVaild',index:'idVaild',width:60,editable:false},
			    {name:'createUserName',index:'createUserName',width:40,editable:false},
			    {name:'createDate',index:'createDate',width:90,editable:false},
			    {name:'lastUpdateUserName',index:'lastUpdateUserName',width:40,editable:false},
			    {name:'lastUpdateDate',index:'lastUpdateDate',width:90,editable:false}
			], 
			viewrecords : false,
			rowNum:10,
			rowList:[10,20,30],
			pager : "#grid-pager",
			multiselect: false,
	        multiboxonly: false,
			altRows: true,
			autowidth: false,
			autoScroll: true,
			caption: "社保公积金产品列表",
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
//			$('#user-input').removeData("bs.modal");
			$('#user-input').modal({
				remote:'inputNew?timestamp=' + new Date().getTime(),
				backdrop:'static',
				dialogWidth: '1000',
				height: '324324'
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
			window.location = contextPath + '/agreement/list';
			if (rowIds.length > 1 || rowIds.length == 0){
				//User.commAlert("#user-input", "请选择一条记录!!");
			}else{
//				$('#user-input').removeData("bs.modal");
//				$('#btn_selectMenu').button('loading');
				
//				window.location = (contextPath + '/agreement/list?timestamp=' + new Date().getTime() + "&id=" + rowIds[0]);
				
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
			//var isValid = $('#user_fmt').valid();
//			alert(isValid);
			if(isValid){
				$.ajax({
					type:'POST',
					url:'save',
					data:$('#user_fmt').serialize(),
					dataType:'json',
					success:function(json){
						if(json.status == "success"){
							$('#user-input').load(contextPath + '/common/success.jsp',
									{msg:'操作已成功，供应商 产品  "<b>'+$('#username').val()+'"</b>保存成功',
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