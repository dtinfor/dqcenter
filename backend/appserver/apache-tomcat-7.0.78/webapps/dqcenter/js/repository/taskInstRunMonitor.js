var TaskInstRunMonitor = {                                                                                                        
	                                                                                                                           
	//列表页面加载方法                                                                                                         
	loadPage : function() {                                                                                                    
		jQuery("#grid-table").jqGrid({                                                                                         
			url:'list',                                                                                                            
		    datatype: 'json',                                                                                                    
			mtype: "POST",                                                                                                       
			height: 250,                                                                                                           
			rownumbers: true,                                                                                                      
			rownumWidth:50,                                                                                                        
			colNames:['id','','日期','文件夹','工作流','任务','成功记录','记录-1','记录-2','记录-3','记录-4','记录-5','标识'],                                         
			colModel:[                                                                                               
			    {name:'id',index:'id',width:70,hidden:true},
			    {name:'action',index:'action',width:25,hidden:false,fixed:true},                                                   
			    {name:'initDate',index:'initDate',width:90,editable:false},
			    {name:'subjName',index:'subjName',width:150,editable:false},
			    {name:'workflowName',index:'workflowName',width:250,editable:false},
			   /* {name:'instanceId',index:'instanceId',width:90,editable:false},*/
			    {name:'instanceName',index:'instanceName',width:250,editable:false},
			    {name:'targSuccessRows',index:'targSuccessRows',width:90,editable:false},
			    {name:'prevSuccessRows1',index:'prevSuccessRows1',width:90,editable:false},
			    {name:'prevSuccessRows2',index:'prevSuccessRows2',width:90,editable:false},
			    {name:'prevSuccessRows3',index:'prevSuccessRows3',width:90,editable:false},
			    {name:'prevSuccessRows4',index:'prevSuccessRows4',width:90,editable:false},
			    {name:'prevSuccessRows5',index:'prevSuccessRows5',width:90,editable:false},
			   /* {name:'prevSuccessRows6',index:'prevSuccessRows6',width:90,editable:false},
			    {name:'prevSuccessRows7',index:'prevSuccessRows7',width:90,editable:false},
			    {name:'prevSuccessRows8',index:'prevSuccessRows8',width:90,editable:false},
			    {name:'prevSuccessRows9',index:'prevSuccessRows9',width:90,editable:false},
			    {name:'prevSuccessRows10',index:'prevSuccessRows10',width:90,editable:false},*/
			    {name:'rflag',index:'rflag',width:90,editable:false},
			],                                                                                                                     
			                                                                                                                       
			viewrecords : false,                                                                                                   
			rowNum:10,                                                                                                             
			rowList:[10,20,30],                                                                                                    
			pager : "#grid-pager",                                                                                               
			multiselect: false,                                                                                                    
	        multiboxonly: false,                                                                                               
			altRows: true,                                                                                                         
			autowidth: true,                                                                                                       
			caption: "校验结果",                                                                                              
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
				'initDate':$("#initDate").val() ,
				'workflowName':$("#workflowName").val() ,
				'subjName':$("#subjName").val() ,
				'instanceName':$("#instanceName").val() ,
				'rFlag':$("#rFlag").val() 
			};                                                                                                                     
			jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })               
			.trigger("reloadGrid");                                                                                              
		});                                                                                                                      
	                                                                                                                           
		//新增按钮                                                                                                               
		$('#new').click(function(){                                                                                              
			$('#taskInstRunMonitor-input').removeData("bs.modal");                                              
			$('#taskInstRunMonitor-input').modal({                                                                
				remote:'input?timestamp=' + new Date().getTime(),                                                                    
				backdrop:'static'                                                                                                    
			});                                                                                                                    
			$('#btn_new').button('loading');                                                                                       
		});                                                                                                                      
		                                                                                                                         
		//修改按钮                                                                                                               
		$('#edit').click(function(){                                                                                             
			                                                                                                                       
			var rowIds = CommUtils.getJqgridSelected("grid-table");                                                              
			                                                                                                                       
			if (rowIds.length > 1 || rowIds.length == 0){                                                                          
				CommUtils.commAlert("taskInstRunMonitor-input", "修改记录时只能选择一条记录！");                
			}else{                                                                                                                 
				$('#taskInstRunMonitor-input').removeData("bs.modal");                                            
				$('#taskInstRunMonitor-input').modal({                                                              
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
				CommUtils.commAlert("taskInstRunMonitor-input", "请选择一条或多条记录！");                      
			}else{                                                                                                                 
				CommUtils.commDelete("taskInstRunMonitor-input", "确认您是否要删除所选中的记录？",rowIds);      
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
		$('#taskInstRunMonitor_fmt').validate({                                                                 
			errorElement: 'div',                                                                                                   
			errorClass: 'help-block',                                                                                              
			focusInvalid: true,                                                                                                    
			rules:{                                                                                                                
				initDate:{                                                                                                           
					required:true,                                                                                                     
					remote:{                                                                                                               
						url:'validateExist',                                                                                             
						type:'post',                                                                                                     
						data:{                                                                                                           
							initDate:function(){                                                                                        
								return $('#initDateVal').val();                                                                                    
							},                                                                                                             
							id:function(){                                                                                                 
								return $('#editId').val();                                                                                   
							}                                                                                                              
						}                                                                                                                
					}				                                                                                                           
				}                                                                                                                    
			},messages:{				                                                                                                   
				initDate:{                                                                                                                 
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
			var isValid = $('#taskInstRunMonitor_fmt').valid();                                                   
			if(isValid){                                                                                                           
				$.ajax({                                                                                                             
					type:'POST',                                                                                                       
					url:'save',                                                                                                        
					data:$('#taskInstRunMonitor_fmt').serialize(),                                                    
					dataType:'json',                                                                                                   
					success:function(json){                                                                                            
						if(json.status == "success"){                                                                                  
							$('#taskInstRunMonitor-input').load(contextPath + '/common/success.jsp',                      
									{msg:'操作已成功，#Ltemplate#"<b>'+$('#initDateVal').val()+'"</b>保存成功',                                           
									 seconds:'3000',                                                                                           
									 tips:''},'');                                                                                             
							                                                                                                               
							$('#grid-table').trigger("reloadGrid");                                                                      
						}else{                                                                                                           
							$('#taskInstRunMonitor-input').load();                                                        
						}                                                                                                                
					}                                                                                                                  
				});                                                                                                                  
			}                                                                                                                      
		});                                                                                                                      
	}                                                                                                                          
}                                                                                                                           
