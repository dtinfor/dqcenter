var ValidateCust = {
	
	//列表页面加载方法
	loadPage : function() {
		jQuery("#grid-table").jqGrid({
			url:'list',
		    datatype: 'json',     
			mtype: "POST",
			height: 250,
			rownumbers: true,
			rownumWidth:50,
			colNames:['ID','','验证名称', '验证SQL', '触发类型','triggerType', '', '验证目标', '连接'],
			colModel:[  
			    {name:'id',index:'id',width:90,hidden:true},
			    {name:'action',index:'id',width:25,hidden:false,fixed:true},
			    {name:'validateName',index:'validate_Name',width:90,hidden:false,fixed:true},
			    {name:'sqlContent',index:'sql_Content',width:90,editable:false},
			    {name:'action_triggerType',index:'trigger_Type',width:90,editable:false},
			    {name:'triggerType',index:'trigger_Type',hidden:true},
			    {name:'scheduleId',index:'scheduleId',width:90,hidden:true},
			    {name:'remark',index:'remark',width:90,editable:false},
			    {name:'connId',index:'conn_Id',width:90,editable:false},
			], 
			
			viewrecords : false,
			rowNum:10,
			rowList:[10,20,30],
			pager : "#grid-pager",
			multiselect: false,
	        multiboxonly: false,
			altRows: true,
			autowidth: true,
			caption: "定制校验",
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
					var curRowData = $("#grid-table").jqGrid('getRowData', cl); 
					
					checkbox = "<label><input name=\"grid-checkbox\" value=\"" 
						+ cl + "\"type=\"checkbox\" class=\"ace\"><span class=\"lbl\"></span></label>"; 
					var triggerType_val = "";
					if(curRowData["triggerType"]=="1"){
						triggerType_val = "跟随";
					}else if(curRowData["triggerType"]=="0"){
						triggerType_val = "定时";
					}
					jQuery("#grid-table").jqGrid('setRowData',ids[i],{action:checkbox,action_triggerType:triggerType_val});
				}	
			}
		});
		
		//查询按钮
		$('#search').click(function(){
			var json = {
				'validateName':$("#validateName").val()
			};
			jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })
			.trigger("reloadGrid");
		});
	
		//新增按钮
		$('#new').click(function(){
			$('#validateCust-input').removeData("bs.modal");
			$('#validateCust-input').modal({
				remote:'input?timestamp=' + new Date().getTime(),
				backdrop:'static'
			});
			$('#btn_new').button('loading');
		});
		
		//修改按钮
		$('#edit').click(function(){
			
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("validateCust-input", "修改记录时只能选择一条记录！");
			}else{
				$('#validateCust-input').removeData("bs.modal");
				$('#validateCust-input').modal({                               
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
				CommUtils.commAlert("validateCust-input", "请选择一条或多条记录！");
			}else{
				CommUtils.commDelete("validateCust-input", "确认您是否要删除所选中的记录？",rowIds);
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
		
		
		ValidateCust.buildTree(false);
//		buildTree(false);
		
		//是否可用
		var enabled=$("#ishidenabled").val();
		if(enabled=='true'){
			 $("input[type=radio][name=enabled][value='1']").attr("checked",'checked');
		}else{
			 $("input[type=radio][name=enabled][value='0']").attr("checked",'checked');
		}
		
		$('#validateCust_fmt').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: true,
			rules:{
				validateName:{
					required:true,
					remote:{
						url:'validateExist',
						type:'post',
						data:{
							validateName:function(){
								return $('#validateNameVal').val();
							},
							id:function(){
								return $('#editId').val();
							}
						}
					}				
				},connId:{
					required:true
				},remark:{
					required:true
				},sqlContent:{
					required:true
				}
			},messages:{
				validateName:{  
					required:"验证名称为必填项",
					remote:"验证名称已存在" 
				},connId:{
					required:"数据源必选"
				},remark:{
					required:"验证目标必选"
				},sqlContent:{
					required:"验证Sql必填"
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
			var isValid = $('#validateCust_fmt').valid();
			if(isValid){
				$.ajax({
					type:'POST',
					url:'save',
					data:$('#validateCust_fmt').serialize(),
					dataType:'json',
					success:function(json){
						if(json.status == "success"){
							$('#validateCust-input').load(contextPath + '/common/success.jsp',
									{msg:'操作已成功，"<b>'+json.result.validateName+'"</b>保存成功',
									 seconds:'3000',
									 tips:''},'');
							
							$('#grid-table').trigger("reloadGrid");
						}else{
							$('#validateCust-input').load();
						}
					}
				});
			}
		});
		
		//新增按钮                                                                                                               
		$('#btn_var_new').click(function(){                                                                                              
			$('#validateSqlVar-input').removeData("bs.modal");                                              
			$('#validateSqlVar-input').modal({                                                                
				remote:contextPath+'/repository/validateSqlVar/input?isnew=true&timestamp=' + new Date().getTime(),                                                                    
				backdrop:'static'                                                                                                    
			});                                                                                                                    
		});
		
		//选择消息接收人信息
		$('#btn_user_new').click(function(){                         
			$('#validateSqlVar-input').removeData("bs.modal");                                              
			$('#validateSqlVar-input').modal({    
				remote:contextPath+'/contactMethod/chose?timestamp=' + new Date().getTime(),
				backdrop:'static'                                                                                                    
			});                                                                                                                    
		});
		
	},
	buildTree:function(multiSelect){
		if (!multiSelect){
			multiSelect = false;
		}
		
    	var var_tree;
    	if (!multiSelect){
    		var_tree = $('#val_tree').jstree({
    			core : {
    				themes : {
    					name : false,
    					dots : false,
    					icons : false
    				},
    		    	data : {
    		    		type : "json",
    		    		method : "post",
    		    		url : contextPath + "/repository/validateSqlVar/listForTree?showRoot=0&timestamp=" + new Date().getTime()
    		    	}
    			}
    		});
    	}else{
    	}
    	
//    	org_tree = $('#treeDemo').jstree({
//			plugins:["checkbox", "wholerow" ], 
//			core : {
//				themes : {
//					name : false,
//					"theme": "classic",
//					dots : false,
//					icons : false
//				},
//		    	data : {
//		    		type : "json",
//		    		method : "post",
//		    		url : contextPath + "/repository/validateSqlVar/listForTree?showRoot=0&timestamp=" + new Date().getTime()
//		    	}
//			},
//			checkbox : {
//				three_state : false
//			}
//		});
    	
		var_tree.bind('load_node.jstree', function() {   
			console.log('load_node.jstree 完成!');
			$("#val_tree").find("li").each(function(index,item) {
				$(this).attr("title", $(this).find("a:first").text());
			});
	    }).bind("changed.jstree", function(e, data) {
	    	if (data.node.original.level == "2"){
	    		var node = $(event.target).closest("li");
	    		node.attr("val", data.node.original.value);
	    	}
        	
		}).bind("dblclick.jstree", function(event) {
	    	var node = $(event.target).closest("li");
	    	var id = node[0].id; //id of the selected node
	    	var val = node.attr("val");
	    	if (val != undefined && val!=""){
	    		//$("#sqlContent").val($("#sqlContent").val()+"  #{"+val+"}");
	    		insertText($("#sqlContent")[0],"#{"+val+"}");
	    	}
		}) ;
		
		$("#btn_var_ref").bind("click", function(){
			$('#val_tree').jstree(true).refresh();
		});
	},
	loadInputPage_new: function(){  //参数变量新增                                                                                               
		                                                                                                                         
		$('#validateSqlVar_fmt').validate({                                                                 
			errorElement: 'div',                                                                                                   
			errorClass: 'help-block',                                                                                              
			focusInvalid: true,                                                                                                    
			rules:{                                                                                                                
				sqlId:{                                                                                                           
					required:true,                                                                                                     
					remote:{                                                                                                               
						url:'validateExist',                                                                                             
						type:'post',                                                                                                     
						data:{                                                                                                           
							sqlId:function(){                                                                                        
								return $('#sqlIdVal').val();                                                                                    
							},                                                                                                             
							id:function(){                                                                                                 
								return $('#editId').val();                                                                                   
							}                                                                                                              
						}                                                                                                                
					}				                                                                                                           
				}                                                                                                                    
			},messages:{				                                                                                                   
				sqlId:{                                                                                                                 
					required:"#Ltemplate#为必填项",                                                                                  
					remote:"#Ltemplate#已存在"                                                                            
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
		$('#save_btn_new').click(function(){                                                                                         
			var isValid = $('#validateSqlVar_fmt').valid();                                                   
			if(isValid){                                                                                                           
				$.ajax({                                                                                                             
					type:'POST',                                                                                                       
					url:contextPath + '/repository/validateSqlVar/save',                                                                                                        
					data:$('#validateSqlVar_fmt').serialize(),                                                    
					dataType:'json',                                                                                                   
					success:function(json){                                                                                            
						if(json.status == "success"){                                                                                  
							$('#validateSqlVar-input').load(contextPath + '/common/success.jsp',                      
									{msg:'操作已成功，#Ltemplate#"<b>'+$('#sqlIdVal').val()+'"</b>保存成功',                                           
									 seconds:'3000',                                                                                           
									 tips:''},'');                                                                                             
							
							$('#val_tree').jstree(true).refresh();
						}                                                                                                               
					}                                                                                                                  
				});                                                                                                                  
			}                                                                                                                      
		});                                                                                                                      
	}                                         
}