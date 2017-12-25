var Post = {
	//加载页面时所要执行的函数
	loadPage:function(){
		Post.buildTree(false);
		
		//**************以下为表格操作***********************
		jQuery("#grid-table").jqGrid({
			url:'getChildrenById',
		    datatype: 'json',     
			mtype: "POST",
			height: 250,
			rownumbers: true,
			rownumWidth:50,
			colNames:['id','', '编号', '名称', '状态', '是否有子项',  '创建人','创建时间','最后修改人','最后修改时间'],
			colModel:[
			    {name:'id',index:'id',width:40,hidden:true},
			    {name:'action',index:'action',width:25,hidden:false,fixed:true},
			    {name:'postCode',index:'postCode',width:80,hidden:false},
				{name:'postName',index:'postName',width:90,editable:false},
				{name:'isValid',index:'isValid', width:50,editable:false,formatter:statusChange},
				{name:'hasChild',index:'hasChild', width:0,hidden:true,editable:false},
				{name:'createUserName',index:'createUserName',width:50},
				{name:'createDate',index:'createDate',width:90,formatter:dateFormatter},
				{name:'lastUpdateUserName',index:'lastUpdateUserName',width:60},
				{name:'lastUpdateDate',index:'lastUpdateDate',width:90,formatter:dateFormatter},
			], 
			viewrecords : false,
			rowNum:10,
			rowList:[10,20,30],
			pager : "#grid-pager",
			altRows: true,
			autowidth: true,
			caption: "岗位列表",
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
		//新建按钮
		$('#new').click(function(){
			$('#post-input').removeData("bs.modal");
			$('#btn_new').button('loading');
			$('#post-input').modal({
				remote:'input?timestamp=' + new Date().getTime(),
				backdrop:'static'
			});
			$('#btn_new').button('reset');
		});
		//修改按钮
		$('#edit').click(function(){
			
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("post-input", "修改记录时只能选择一条记录！");
			}else{
				$('#post-input').removeData("bs.modal");
				$('#post-input').modal({
					remote:'input?timestamp=' + new Date().getTime() + "&postId=" + rowIds[0],
					backdrop:'static'
				});
				$('#btn_edit').button('reset');
			}
		});
		//删除按钮
		$('#delete').click(function(){
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			if (rowIds.length == 0){
				CommUtils.commAlert("post-input", "请选择一条或多条记录！");
			}else{
				//文件夹不能删除
				var hdel = '0';
				$.each(rowIds,function(i,postid){
					var rowDatas = $("#grid-table").jqGrid('getRowData', postid);
					var haschild = rowDatas["hasChild"];
					var postname = rowDatas["postName"];
					if(haschild=='1'){
						hdel = '1';
						CommUtils.commAlert("post-input",postname+"有子节点，不能删除 ！");
						return false;
					}
				});
				if(hdel=='0'){
					CommUtils.commDelete("post-input", "确认您是否要删除所选中的记录？",rowIds,"post_tree");
				}
			}
		});
		//**************表格操作结束***********************
	},
	
	buildTree:function(multiSelect){
		if (!multiSelect){
			multiSelect = false;
		}
		var iconok = '';
		var iconmo = '';
		if(multiSelect){
			iconok = 'icon-ok';
			iconmo = 'icon-remove';
		}
		
		$("#postId").val('');
    	$("#oldpostCode").val('');
    	$("#oldpostLevel").val('');
    	
		var post_tree;
    	if (!multiSelect){
    		post_tree = $('#post_tree').jstree({
    			core : {
    				themes : {
    					name : false,
    					dots : false,
    					icons : false
    				},
    		    	data : {
    		    		type : "json",
    		    		method : "post",
    		    		url : contextPath + "/system/post/listForTree?timestamp=" + new Date().getTime()
    		    	}
    			}
    		});
    	}else{
    		post_tree = $('#post_tree').jstree({
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
    		    		url : contextPath + "/system/post/listForTree?showRoot=0&timestamp=" + new Date().getTime()
    		    	}
    			},
    			checkbox : {
    				three_state : false
    			}
    		});
    	}
    	
    	post_tree.bind('load_node.jstree', function() {   
			if ($("#postIds").val()){
				var checkNodeIds = $("#postIds").val().split(",");
				$("#post_tree").find("li").each(function(index,item) {
					for (var i = 0; i < checkNodeIds.length; i++) {
						if ($(item).attr("id") == checkNodeIds[i]) { 
							$('#post_tree').jstree("select_node", '#'+$(item).attr("id"), true);
						}
					}
				});
			}
	    })
	    .bind("select_node.jstree", function(e, data) { 
	    	if (data.node.original.id == "root_999"){
	    		$("#postId").val("");
	    	}else{
	    		$("#postId").val(data.node.original.id);
	    	}
        	$("#oldpostCode").val(data.node.original.postCode);
        	$("#oldpostLevel").val(data.node.original.level);
        	Post.loadSelected($("#postId").val());
        	
        	var postName = data.node.name;
		}) ;
	},
	//加载所选单项
	loadSelected:function(postId){
		var json = {
				'id':postId,
			};
		jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })
		.trigger("reloadGrid");
		
	},
	
	//加载新增修改弹出窗口
	loadInputPage: function(){
		
		if ($("#editId").val()){
			$("#input-title").html("修改岗位");
			
			//加载父节点编号显示，本身的编号放在文本框中
			 var postCode = $("#postCode").val();
	       	 var superCode= "";
	       	 var postOwnCode = "";
	       	 if(postCode.indexOf('.')>=0){
	       		 superCode = postCode.substring(0, postCode.lastIndexOf('.')+1);
	       		 postOwnCode = postCode.substring(postCode.lastIndexOf('.')+1,postCode.length);
	       	 }else{
	       		 postOwnCode = postCode;
	       	 }
	       	$("#superCode").html(superCode);
	       	$("#postOwnCode").val(postOwnCode);
	       	
	       //处理checkbox
	 		if ("1" == $("#oldisValid").val()){
	 			$("#isValid").attr("checked","checked");
	 		}else{
	 			$("#isValid").removeAttr("checked");
	 		}
		}else{
			$("#input-title").html("新增岗位");
			//获取母页面的信息
			var postSuperId = $("#postId").val();
			//如果是初始新建
			if(postSuperId==null || postSuperId==''){
				$("#hasChild").val("0");
				$("#postLevel").val("1");
			}else{
				var level = $("#oldpostLevel").val();
				var newlevel = getNumber(level)+1;
				var postCode = $("#oldpostCode").val();
				$("#superPostId").val(postSuperId);
				$("#hasChild").val("0");
				$("#postLevel").val(newlevel);
				if(postCode!=null && postCode!=''){
					//获取母页面的编号的内容，加到父节点编号显示出来
					$("#superCode").html(postCode+'.');
				}
			}
		}
		
		$('#post_fmt').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: true,
			rules:{
				postOwnCode:{
					required:true,
					number: true,
					remote:{//验证输入的编号是否重复
						url:'validateExist',
						type:'post',
						data:{
							postCode:function(){
								return $('#superCode').html()+$('#postOwnCode').val();
							},
							postId:function(){
								return $('#postId').val();
							}
						}
					}		
				},
				postName:{
					required:true
					
				}
			},
			messages:{
				postOwnCode:{
					required:"岗位编号为必填项",
					number: "岗位编号必须是数字",
					remote:"岗位编号已存在"
				},
				postName:{
					required: "岗位名称为必填项"
					
				}
			},
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error').addClass('has-info');
				$(e).remove();
			},
			errorPlacement: function(error, element) {
				if (element.is('input')){
					if ("clearfix" == element.parent().attr("class")){
						error.insertAfter(element.parent());
					}else{
						error.insertAfter(element);
					}
				}else{
					error.insertAfter(element);
				}
			}
		});

		$('#save_btn').click(function(){
			var superCode = $("#superCode").html();
	        var postOwnCode = $("#postOwnCode").val();
	        $("#postCode").val(superCode+postOwnCode);
	        
			var isValid = $('#post_fmt').valid();
			if(isValid){
				$.ajax({
					type:'POST',
					url:'save',
					data:$('#post_fmt').serialize(),
					dataType:'json',
					success:function(json){
						if(json.status == "success"){
							$('#post-input').load(contextPath + '/common/success.jsp',
									{msg:'操作已成功，岗位"<b>'+$('#postName').val()+'"</b>保存成功',
									 seconds:'3000',
									 tips:''},'');
							$('#grid-table').trigger("reloadGrid");
							CommUtils.commRefreshTree("post_tree");
						}else{
							$('#post-input').load();
						}
					}
				});
			}
		});
	}
		
}