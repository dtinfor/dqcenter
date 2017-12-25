var OpbTaskInstRun = {                                                                                                        
	                                                                                                                           
	//列表页面加载方法                                                                                                         
	loadPage : function() {                                                                                                    
		jQuery("#grid-table").jqGrid({                                                                                         
			url:'list',                                                                                                            
		    datatype: 'json',                                                                                                    
			mtype: "POST",                                                                                                       
			height: 250,                                                                                                           
			rownumbers: true,                                                                                                      
			rownumWidth:50,                                                                                                        
			colNames:['subjectId','','workflowId','workflowRunId','workletRunId','childRunId','instanceId','instanceName','taskId','taskType','startTime','endTime','runErrCode','runErrMsg','runStatusCode','taskName','runMode','versionNumber','serverId','serverName','fragmentId','serverNodeId','serverNodeName'],                                         
			colModel:[                                                                                               
			    {name:'subjectId',index:'subjectId',width:90,hidden:true},
			    {name:'action',index:'action',width:25,hidden:false,fixed:true},                                                   
			    {name:'workflowId',index:'workflowId',width:90,editable:false},
			    {name:'workflowRunId',index:'workflowRunId',width:90,editable:false},
			    {name:'workletRunId',index:'workletRunId',width:90,editable:false},
			    {name:'childRunId',index:'childRunId',width:90,editable:false},
			    {name:'instanceId',index:'instanceId',width:90,editable:false},
			    {name:'instanceName',index:'instanceName',width:90,editable:false},
			    {name:'taskId',index:'taskId',width:90,editable:false},
			    {name:'taskType',index:'taskType',width:90,editable:false},
			    {name:'startTime',index:'startTime',width:90,editable:false},
			    {name:'endTime',index:'endTime',width:90,editable:false},
			    {name:'runErrCode',index:'runErrCode',width:90,editable:false},
			    {name:'runErrMsg',index:'runErrMsg',width:90,editable:false},
			    {name:'runStatusCode',index:'runStatusCode',width:90,editable:false},
			    {name:'taskName',index:'taskName',width:90,editable:false},
			    {name:'runMode',index:'runMode',width:90,editable:false},
			    {name:'versionNumber',index:'versionNumber',width:90,editable:false},
			    {name:'serverId',index:'serverId',width:90,editable:false},
			    {name:'serverName',index:'serverName',width:90,editable:false},
			    {name:'fragmentId',index:'fragmentId',width:90,editable:false},
			    {name:'serverNodeId',index:'serverNodeId',width:90,editable:false},
			    {name:'serverNodeName',index:'serverNodeName',width:90,editable:false},
			],                                                                                                                     
			                                                                                                                       
			viewrecords : false,                                                                                                   
			rowNum:10,                                                                                                             
			rowList:[10,20,30],                                                                                                    
			pager : "#grid-pager",                                                                                               
			multiselect: false,                                                                                                    
	        multiboxonly: false,                                                                                               
			altRows: true,                                                                                                         
			autowidth: true,                                                                                                       
			caption: "SESSR运行日志",                                                                                              
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
				'ID':$("#id").val()                                                                                               
			};                                                                                                                     
			jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })               
			.trigger("reloadGrid");                                                                                              
		});                                                                                                                      
	                                                                                                                           
		//新增按钮                                                                                                               
		$('#new').click(function(){                                                                                              
			$('#opbTaskInstRun-input').removeData("bs.modal");                                              
			$('#opbTaskInstRun-input').modal({                                                                
				remote:'input?timestamp=' + new Date().getTime(),                                                                    
				backdrop:'static'                                                                                                    
			});                                                                                                                    
			$('#btn_new').button('loading');                                                                                       
		});                                                                                                                      
		                                                                                                                         
		//修改按钮                                                                                                               
		$('#edit').click(function(){                                                                                             
			                                                                                                                       
			var rowIds = CommUtils.getJqgridSelected("grid-table");                                                              
			                                                                                                                       
			if (rowIds.length > 1 || rowIds.length == 0){                                                                          
				CommUtils.commAlert("opbTaskInstRun-input", "修改记录时只能选择一条记录！");                
			}else{                                                                                                                 
				$('#opbTaskInstRun-input').removeData("bs.modal");                                            
				$('#opbTaskInstRun-input').modal({                                                              
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
				CommUtils.commAlert("opbTaskInstRun-input", "请选择一条或多条记录！");                      
			}else{                                                                                                                 
				CommUtils.commDelete("opbTaskInstRun-input", "确认您是否要删除所选中的记录？",rowIds);      
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
		$('#opbTaskInstRun_fmt').validate({                                                                 
			errorElement: 'div',                                                                                                   
			errorClass: 'help-block',                                                                                              
			focusInvalid: true,                                                                                                    
			rules:{                                                                                                                
				workflowId:{                                                                                                           
					required:true,                                                                                                     
					remote:{                                                                                                               
						url:'validateExist',                                                                                             
						type:'post',                                                                                                     
						data:{                                                                                                           
							workflowId:function(){                                                                                        
								return $('#workflowIdVal').val();                                                                                    
							},                                                                                                             
							id:function(){                                                                                                 
								return $('#editId').val();                                                                                   
							}                                                                                                              
						}                                                                                                                
					}				                                                                                                           
				}                                                                                                                    
			},messages:{				                                                                                                   
				workflowId:{                                                                                                                 
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
			var isValid = $('#opbTaskInstRun_fmt').valid();                                                   
			if(isValid){                                                                                                           
				$.ajax({                                                                                                             
					type:'POST',                                                                                                       
					url:'save',                                                                                                        
					data:$('#opbTaskInstRun_fmt').serialize(),                                                    
					dataType:'json',                                                                                                   
					success:function(json){                                                                                            
						if(json.status == "success"){                                                                                  
							$('#opbTaskInstRun-input').load(contextPath + '/common/success.jsp',                      
									{msg:'操作已成功，#Ltemplate#"<b>'+$('#workflowIdVal').val()+'"</b>保存成功',                                           
									 seconds:'3000',                                                                                           
									 tips:''},'');                                                                                             
							                                                                                                               
							$('#grid-table').trigger("reloadGrid");                                                                      
						}else{                                                                                                           
							$('#opbTaskInstRun-input').load();                                                        
						}                                                                                                                
					}                                                                                                                  
				});                                                                                                                  
			}                                                                                                                      
		});                                                                                                                      
	}                                                                                                                          
}                                                                                                                           
