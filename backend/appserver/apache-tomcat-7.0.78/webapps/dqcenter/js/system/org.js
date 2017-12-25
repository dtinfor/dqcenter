var Org = {
	//加载页面时所要执行的函数
	loadPage:function(){
		//**************以下为树形操作***********************
		Org.buildTree(false);
		//**************树形操作结束***********************
		
		//**************以下为表格操作***********************
		jQuery("#grid-table").jqGrid({
			url:'getChildrenById',
		    datatype: 'json',     
			mtype: "POST",
			height: 250,
			rownumbers: true,
			rownumWidth:50,
			colNames:['id', '','编号', '名称', '类型', '城市', '状态', '是否有子项',  '创建人','创建时间','最后修改人','最后修改时间'],
			colModel:[
			    {name:'id',index:'id',width:40,hidden:true},
			    {name:'action',index:'action',width:25,hidden:false,fixed:true},
			    {name:'orgCode',index:'orgCode',width:80,hidden:false},
				{name:'orgName',index:'orgName',width:90,editable:false},
				{name:'orgType',index:'orgType',width:50,editable:false},
				{name:'city_id',index:'city_id',width:50,editable:false},
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
			caption: "组织机构列表",
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
			$('#org-input').removeData("bs.modal");
			$('#btn_new').button('loading');
			$('#org-input').modal({
				remote:'input?timestamp=' + new Date().getTime(),
				backdrop:'static'
			});
			$('#btn_new').button('reset');
		});
		//修改按钮
		$('#edit').click(function(){
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("org-input", "修改记录时只能选择一条记录！");
			}else{
				$('#org-input').removeData("bs.modal");
				$('#org-input').modal({
					remote:'input?timestamp=' + new Date().getTime() + "&orgId=" + rowIds[0],
					backdrop:'static'
				});
				$('#btn_edit').button('reset');
			}
		});
		//删除按钮
		$('#delete').click(function(){
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			if (rowIds.length == 0){
				CommUtils.commAlert("org-input", "请选择一条或多条记录！");
			}else{
				//文件夹不能删除
				var hdel = '0';
				$.each(rowIds,function(i,orgid){
					var rowDatas = $("#grid-table").jqGrid('getRowData', orgid);
					var haschild = rowDatas["hasChild"];
					var orgname = rowDatas["orgName"];
					if(haschild=='1'){
						hdel = '1';
						CommUtils.commAlert("org-input",orgname+"有子节点，不能删除 ！");
						return false;
					}
				});
				if(hdel=='0'){
					CommUtils.commDelete("org-input", "确认您是否要删除所选中的记录？",rowIds,"org_tree");
				}
			}
		});
		
		//**************表格操作结束***********************
	},
	
	buildTree:function(multiSelect){
		if (!multiSelect){
			multiSelect = false;
		}
		
		$("#orgId").val('');
    	$("#oldorgCode").val('');
    	$("#oldorgLevel").val('');
    	
    	var org_tree;
    	if (!multiSelect){
    		org_tree = $('#org_tree').jstree({
    			core : {
    				themes : {
    					name : false,
    					dots : false,
    					icons : false
    				},
    		    	data : {
    		    		type : "json",
    		    		method : "post",
    		    		url : contextPath + "/system/org/listForTree?timestamp=" + new Date().getTime()
    		    	}
    			}
    		});
    	}else{
    		org_tree = $('#org_tree').jstree({
    			plugins:["checkbox", "wholerow" ], 
    			core : {
    				themes : {
    					name : false,
    					dots : false,
    					icons : false
    				},
    		    	data : {
    		    		type : "json",
    		    		method : "post",
    		    		url : contextPath + "/system/org/listForTree?showRoot=0&timestamp=" + new Date().getTime()
    		    	}
    			},
    			checkbox : {
    				three_state : false
    			}
    		});
    	}
    	
		org_tree.bind('load_node.jstree', function() {   
			console.log('load_node.jstree 完成!');
			if ($("#orgIds").val()){
				var checkNodeIds = $("#orgIds").val().split(",");
				$("#org_tree").find("li").each(function(index,item) {
					for (var i = 0; i < checkNodeIds.length; i++) {
						if ($(item).attr("id") == checkNodeIds[i]) { 
							$('#org_tree').jstree("select_node", '#'+$(item).attr("id"), true);
						}
					}
				});
			}
	    })
	    .bind("select_node.jstree", function(e, data) { 
	    	if (data.node.original.id == "root_999"){
	    		$("#orgId").val("");
	    	}else{
	    		$("#orgId").val(data.node.original.id);
	    	}
	    	console.log(data.node.original.id+' 点击!');
        	$("#oldorgCode").val(data.node.original.orgCode);
        	$("#oldorgLevel").val(data.node.original.level);
        	Org.loadSelected($("#orgId").val());
        	
        	var orgName = data.node.name;
		}) ;
	},
	//加载所选单项
	loadSelected:function(orgId){
		var json = {
				'id':orgId
			};
		jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })
		.trigger("reloadGrid");
		
	},
	
	//加载新增修改弹出窗口
	loadInputPage: function(){
		//初始化城市下拉框
		Org.initPro();
		
		if ($("#editId").val()){
			$("#input-title").html("修改组织机构");
			
			//加载父节点编号显示，本身的编号放在文本框中
			 var orgCode = $("#orgCode").val();
	       	 var superCode= "";
	       	 var orgOwnCode = "";
	       	 if(orgCode.indexOf('.')>=0){
	       		 superCode = orgCode.substring(0, orgCode.lastIndexOf('.')+1);
	       		 orgOwnCode = orgCode.substring(orgCode.lastIndexOf('.')+1,orgCode.length);
	       	 }else{
	       		 orgOwnCode = orgCode;
	       	 }
	       	$("#superCode").html(superCode);
	       	$("#orgOwnCode").val(orgOwnCode);
	       	
	       	//默认选中的城市(有ajax异步情况，故该段代码作废)
	       	/*
	       	var proviceId = $("#oldProviceId").val();
	       	var cityId = $("#oldCityId").val();
	         $("#proviceId").children("option").each(function(){
	              var temp_value = $(this).val();
	              if(temp_value == proviceId){
	                    $(this).attr("selected",true);
	              }
	         });
	         $("#cityId").children("option").each(function(){
	              var temp_value = $(this).val();
	              if(temp_value == cityId){
	                    $(this).attr("selected",true);
	              }
	         });
	         */
	       	
	       	//默认选中的组织机构类型
	       	var orgType = $("#oldorgType").val();
	         $("#orgType").children("option").each(function(){
	              var temp_value = $(this).val();
	              if(temp_value == orgType){
	                    $(this).attr("selected",true);
	              }
	         });
	         
	       //处理是否有效checkbox
	 		if ("1" == $("#oldisValid").val()){
	 			$("#isValid").attr("checked","checked");
	 		}else{
	 			$("#isValid").removeAttr("checked");
	 		}
		}else{
			$("#input-title").html("新增组织机构");
			//获取母页面的信息
			var orgSuperId = $("#orgId").val();
			//如果是初始新建
			if(orgSuperId==null || orgSuperId==''){
				$("#hasChild").val("0");
				$("#orgLevel").val("1");
			}else{
				var level = $("#oldorgLevel").val();
				var newlevel = getNumber(level)+1;
				var orgCode = $("#oldorgCode").val();
				$("#superOrgId").val(orgSuperId);
				$("#hasChild").val("0");
				$("#orgLevel").val(newlevel);
				if(orgCode!=null && orgCode!=''){
					//获取母页面的编号的内容，加到父节点编号显示出来
					$("#superCode").html(orgCode+'.');
				}
			}
		}
		
		$('#org_fmt').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: true,
			rules:{
				orgOwnCode:{
					required:true,
					number: true,
					remote:{//验证输入的编号是否重复
						url:'validateExist',
						type:'post',
						data:{
							orgCode:function(){
								return $('#superCode').html()+$('#orgOwnCode').val();
							},
							orgId:function(){
								return $('#orgId').val();
							}
						}
					}		
				},
				orgName:{
					required:true
					
				}
			},
			messages:{
				orgOwnCode:{
					required:"组织机构编号为必填项",
					number: "组织机构编号必须是数字",
					remote:"组织机构编号已存在"
				},
				orgName:{
					required: "组织机构名称必填项"
					
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
	        var orgOwnCode = $("#orgOwnCode").val();
	        $("#orgCode").val(superCode+orgOwnCode);
	        
			var isValid = $('#org_fmt').valid();
			if(isValid){
				$.ajax({
					type:'POST',
					url:'save',
					data:$('#org_fmt').serialize(),
					dataType:'json',
					success:function(json){
						if(json.status == "success"){
							$('#org-input').load(contextPath + '/common/success.jsp',
									{msg:'操作已成功，组织机构"<b>'+$('#orgName').val()+'"</b>保存成功',
									 seconds:'3000',
									 tips:''},'');
							$('#grid-table').trigger("reloadGrid");
							CommUtils.commRefreshTree("org_tree");
						}else{
							$('#org-input').load();
						}
					}
				});
			}
		});
	},
	
	initPro:function() {
		var proviceId = $("#oldProviceId").val();
       	var cityId = $("#oldCityId").val();
		 var option1 = '';
		 $.getJSON("getAllCity",function(tt) {
			var jsonData = $.parseJSON(tt.result);
		  $.each(jsonData, function(index, indexItems) {
			  if(indexItems.id == proviceId){
		          option1 += "<option value=" + indexItems.id + " selected='selected'>"+ indexItems.name + "</option>";
		          /*修改页面，初始加载*/
		          selectCity(jsonData);
			  }else{
				  option1 += "<option value=" + indexItems.id + ">"+ indexItems.name + "</option>";
			  }
		  });
		  $("#proviceId").append(option1);
		  $("#proviceId").bind("change", function() {
		   selectCity(jsonData);
		  })
		 });
		 function selectCity(data) {
		  var option2 = '';
		  var selectedIndex = $("#proviceId :selected").val();
		  if(selectedIndex==null || selectedIndex=='-1'){
			  selectedIndex = proviceId;
		  }
		  $("#cityId").empty();
		  if($("#proviceId :selected").val() == -1){
		   $("#cityId").append("<option value=\"-1\">请选择城市</option>");
		  }
		  $.each(data, function(index, indexItems) {
		   var proName = indexItems.name;
		   $.each(indexItems.items, function(index, indexItems) {
			   
		    if (indexItems.superId != selectedIndex) {
		     return;
		    } else {
		    	  if(indexItems.id == cityId){
		    		  option2 += "<option value=" + indexItems.id + " selected='selected'>"+ indexItems.name + "</option>";
				  }else{
					  option2 += "<option value=" + indexItems.id + ">"+ indexItems.name + "</option>";
				  }
		    }
		   })
		  });
		  $("#cityId").append(option2);
		 };
	}
}