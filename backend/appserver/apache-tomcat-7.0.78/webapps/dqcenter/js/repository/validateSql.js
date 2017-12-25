var ValidateSql = {                                                                                                        
	                                                                                                                           
	//列表页面加载方法                                                                                                         
	loadPage : function() {                                                                                                    
		jQuery("#grid-table").jqGrid({                                                                                         
			url:'list',                                                                                                            
		    datatype: 'json',                                                                                                    
			mtype: "POST",                                                                                                       
			height: 250,                                                                                                           
			rownumbers: true,                                                                                                      
			rownumWidth:50,                                                                                                        
			colNames:['id','','validateName','sqlContent','triggerType','triggerId','connId'],                                         
			colModel:[                                                                                               
			    {name:'id',index:'id',width:90,hidden:true},
			    {name:'action',index:'action',width:25,hidden:false,fixed:true},                                                   
			    {name:'validateName',index:'validateName',width:90,editable:false},
			    {name:'sqlContent',index:'sqlContent',width:90,editable:false},
			    {name:'triggerType',index:'triggerType',width:90,editable:false},
			    {name:'triggerId',index:'triggerId',width:90,editable:false},
			    {name:'connId',index:'connId',width:90,editable:false},
			],                                                                                                                     
			                                                                                                                       
			viewrecords : false,                                                                                                   
			rowNum:10,                                                                                                             
			rowList:[10,20,30],                                                                                                    
			pager : "#grid-pager",                                                                                               
			multiselect: false,                                                                                                    
	        multiboxonly: false,                                                                                               
			altRows: true,                                                                                                         
			autowidth: true,                                                                                                       
			caption: "检验sql",                                                                                              
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
			$('#validateSql-input').removeData("bs.modal");                                              
			$('#validateSql-input').modal({                                                                
				remote:'input?timestamp=' + new Date().getTime(),                                                                    
				backdrop:'static'                                                                                                    
			});                                                                                                                    
			$('#btn_new').button('loading');                                                                                       
		});                                                                                                                      
		                                                                                                                         
		//修改按钮                                                                                                               
		$('#edit').click(function(){                                                                                             
			                                                                                                                       
			var rowIds = CommUtils.getJqgridSelected("grid-table");                                                              
			                                                                                                                       
			if (rowIds.length > 1 || rowIds.length == 0){                                                                          
				CommUtils.commAlert("validateSql-input", "修改记录时只能选择一条记录！");                
			}else{                                                                                                                 
				$('#validateSql-input').removeData("bs.modal");                                            
				$('#validateSql-input').modal({                                                              
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
				CommUtils.commAlert("validateSql-input", "请选择一条或多条记录！");                      
			}else{                                                                                                                 
				CommUtils.commDelete("validateSql-input", "确认您是否要删除所选中的记录？",rowIds);      
			}                                                                                                                      
		});                                                                                                                      
	},                                                                                                                         
	//修改页面加载方法                                                                                                         
	loadInputPage: function(){                                                                                                 
		$('#btn_new').button('reset');                                                                                           
		$('#btn_edit').button('reset');                                                                                          
		                                                                                                                         
		if ($("#editId").val()){                                                                                               
			$("#input-title").html("修改流程");                                                                                
		}else{                                                                                                                   
			$("#input-title").html("新增流程");                                                                                
		}                                                                                                                        
		$('#validateSql_fmt').validate({                                                                 
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
				}                                                                                                                    
			},messages:{				                                                                                                   
				validateName:{                                                                                                                 
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
		$('#save_btn').click(function(){                                                                                         
			var isValid = $('#validateSql_fmt').valid();                                                   
			if(isValid){                                                                                                           
				$.ajax({                                                                                                             
					type:'POST',                                                                                                       
					url:'save',                                                                                                        
					data:$('#validateSql_fmt').serialize(),                                                    
					dataType:'json',                                                                                                   
					success:function(json){                                                                                            
						if(json.status == "success"){                                                                                  
							$('#validateSql-input').load(contextPath + '/common/success.jsp',                      
									{msg:'操作已成功，#Ltemplate#"<b>'+$('#validateNameVal').val()+'"</b>保存成功',                                           
									 seconds:'3000',                                                                                           
									 tips:''},'');                                                                                             
							                                                                                                               
							$('#grid-table').trigger("reloadGrid");                                                                      
						}else{                                                                                                           
							$('#validateSql-input').load();                                                        
						}                                                                                                                
					}                                                                                                                  
				});                                                                                                                  
			}                                                                                                                      
		});                                                                                                                      
	}                                                                                                                          
}                                                                                                                           
