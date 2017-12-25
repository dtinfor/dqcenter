var ValidateSqlVar = {                                                                                                        
	                                                                                                                           
	//列表页面加载方法                                                                                                         
	loadPage : function() {                                                                                                    
		jQuery("#grid-table").jqGrid({
			url:'list',                                                                                                            
		    datatype: 'json',                                                                                                    
			mtype: "POST",                                                                                                       
			height: 250,                                                                                                           
			rownumbers: true,                                                                                                      
			rownumWidth:50,                                                                                                        
			colNames:['id','','验证名称','所用库连接','sqlId','变量名称','参考值'],                                         
			colModel:[                                                                                               
			    {name:'id',width:90,hidden:true},
			    {name:'action',index:'id',width:25,hidden:false,fixed:true},                                                   
			    {name:'validateName',index:'validate_Name',width:90,editable:false},
			    {name:'connName',index:'conn_Name',width:90,editable:false},
			    {name:'sqlId',index:'sql_Id',width:90,editable:false,hidden:true},
			    {name:'varName',index:'var_Name',width:90,editable:false},
			    {name:'varValue',index:'var_Value',width:90,editable:false},
			],                                                                                                                     
			                                                                                                                       
			viewrecords : false,                                                                                                   
			rowNum:10,                                                                                                             
			rowList:[10,20,30],                                                                                                    
			pager : "#grid-pager",                                                                                               
			multiselect: false,                                                                                                    
	        multiboxonly: false,                                                                                               
			altRows: true,                                                                                                         
			autowidth: true,                                                                                                       
			caption: "参数变量",                                                                                              
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
				'varName':$("#varName").val()                                                                                               
			};                                                                                                                     
			jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })               
			.trigger("reloadGrid");                                                                                              
		});                                                                                                                      
	                                                                                                                           
		//新增按钮                                                                                                               
		$('#new').click(function(){                                                                                              
			$('#validateSqlVar-input').removeData("bs.modal");                                              
			$('#validateSqlVar-input').modal({                                                                
				remote:'input?timestamp=' + new Date().getTime(),                                                                    
				backdrop:'static'                                                                                                    
			});                                                                                                                    
			$('#btn_new').button('loading');                                                                                       
		});                                                                                                                      
		                                                                                                                         
		//修改按钮                                                                                                               
		$('#edit').click(function(){                                                                                             
			                                                                                                                       
			var rowIds = CommUtils.getJqgridSelected("grid-table");                                                              
			                                                                                                                       
			if (rowIds.length > 1 || rowIds.length == 0){                                                                          
				CommUtils.commAlert("validateSqlVar-input", "修改记录时只能选择一条记录！");                
			}else{                                                                                                                 
				$('#validateSqlVar-input').removeData("bs.modal");                                            
				$('#validateSqlVar-input').modal({                                                              
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
				CommUtils.commAlert("validateSqlVar-input", "请选择一条或多条记录！");                      
			}else{                                                                                                                 
				CommUtils.commDelete("validateSqlVar-input", "确认您是否要删除所选中的记录？",rowIds);      
			}                                                                                                                      
		});                                                                                                                      
	},                                                                                                                         
	//修改页面加载方法                                                                                                         
	loadInputPage: function(){                                                                                                 
		$('#btn_new').button('reset');                                                                                           
		$('#btn_edit').button('reset');                                                                                          
		                                                                                                                         
		if ($("#editId").val()){                                                                                               
			$("#input-title").html("修改参数变量");                                                                                
		}else{                                                                                                                   
			$("#input-title").html("新增参数变量");                                                                                
		}
		
		//是否可用
		var enabled=$("#ishidenabled").val();
		if(enabled=='1'){
			 $("input[type=radio][name=enabled][value='1']").attr("checked",'checked');
		}else{
			 $("input[type=radio][name=enabled][value='0']").attr("checked",'checked');
		}
		
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
		$('#save_btn').click(function(){                                                                                         
			var isValid = $('#validateSqlVar_fmt').valid();                                                   
			if(isValid){                                                                                                           
				$.ajax({                                                                                                             
					type:'POST',                                                                                                       
					url:'save',                                                                                                        
					data:$('#validateSqlVar_fmt').serialize(),                                                    
					dataType:'json',                                                                                                   
					success:function(json){                                                                                            
						if(json.status == "success"){                                                                                  
							$('#validateSqlVar-input').load(contextPath + '/common/success.jsp',                      
									{msg:'操作已成功，变量"<b>'+$('#validateName').val()+'"</b>保存成功',                                           
									 seconds:'3000',                                                                                           
									 tips:''},'');                                                                                             
							                                                                                                               
							$('#grid-table').trigger("reloadGrid");                                                                      
						}else{                                                                                                           
							$('#validateSqlVar-input').load();                                                        
						}                                                                                                                
					}                                                                                                                  
				});                                                                                                                  
			}                                                                                                                      
		});                                                                                                                      
	}                                                                                                                          
}                                                                                                                           
