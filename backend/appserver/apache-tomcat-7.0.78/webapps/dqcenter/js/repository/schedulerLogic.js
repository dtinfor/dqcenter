var SchedulerLogic = {                                                                                                        
	                                                                                                                           
	//列表页面加载方法                                                                                                         
	loadPage : function() {                                                                                                    
		jQuery("#grid-table").jqGrid({                                                                                         
			url:'list',                                                                                                            
		    datatype: 'json',                                                                                                    
			mtype: "POST",                                                                                                       
			height: 250,                                                                                                           
			rownumbers: true,                                                                                                      
			rownumWidth:50,                                                                                                        
			colNames:['id','','计划名称','开始时间','结束时间','重复间隔','类型','运行间隔','周','月'],                                         
			colModel:[                                                                                               
			    {name:'id',index:'id',width:20,hidden:true},
			    {name:'action',index:'id',width:25,hidden:false,fixed:true},                                                   
			    {name:'schedulerName',index:'scheduler_Name',width:50,editable:false},
			    {name:'startTime',index:'start_Time',width:50,editable:false},
			    {name:'endTime',index:'end_Time',width:50,editable:false},
			    {name:'frequencyIntervl',index:'frequency_Intervl',width:30,editable:false},
			    {name:'userLogicType',index:'user_Logic_Type',width:20,editable:false ,formatter:logicTypeChange},
			    {name:'dailyLogic',index:'daily_Logic',width:30,editable:false},
			    {name:'weeklyLogic',index:'weekly_Logic',width:90,editable:false},
			    {name:'monthlyLogic',index:'monthly_Logic',width:90,editable:false},
			],                                                                                                                     
			                                                                                                                       
			viewrecords : false,                                                                                                   
			rowNum:10,                                                                                                             
			rowList:[10,20,30],                                                                                                    
			pager : "#grid-pager",                                                                                               
			multiselect: false,                                                                                                    
	        multiboxonly: false,                                                                                               
			altRows: true,                                                                                                         
			autowidth: true,                                                                                                       
			caption: "计划明细",                                                                                              
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
			$('#schedulerLogic-input').removeData("bs.modal");                                              
			$('#schedulerLogic-input').modal({                                                                
				remote:'input?timestamp=' + new Date().getTime(),                                                                    
				backdrop:'static'                                                                                                    
			});                                                                                                                    
			$('#btn_new').button('loading');                                                                                       
		});                                                                                                                      
		                                                                                                                         
		//修改按钮                                                                                                               
		$('#edit').click(function(){                                                                                             
			                                                                                                                       
			var rowIds = CommUtils.getJqgridSelected("grid-table");                                                              
			                                                                                                                       
			if (rowIds.length > 1 || rowIds.length == 0){                                                                          
				CommUtils.commAlert("schedulerLogic-input", "修改记录时只能选择一条记录！");                
			}else{                                                                                                                 
				$('#schedulerLogic-input').removeData("bs.modal");                                            
				$('#schedulerLogic-input').modal({                                                              
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
				CommUtils.commAlert("schedulerLogic-input", "请选择一条或多条记录！");                      
			}else{                                                                                                                 
				CommUtils.commDelete("schedulerLogic-input", "确认您是否要删除所选中的记录？",rowIds);      
			}                                                                                                                      
		});                                                                                                                      
	},  
	
	
	//修改页面加载方法                                                                                                         
	loadInputPage: function(){     

		//alert("input");
		$('#btn_new').button('reset');                                                                                           
		$('#btn_edit').button('reset');                                                                                          
		                                                                                                                         
		if ($("#editId").val()){                                                                                               
			$("#input-title").html("修改计划");                                                                                
		}else{                                                                                                                   
			$("#input-title").html("新增计划");                                                                                
		}                                                                                                                        
		$('#schedulerLogic_fmt').validate({
			errorPlacement: function(error, element) { //指定验证消息的位置
				error.appendTo( element.parent("div").parent("div").next("em") ); 
			} ,
			errorElement: 'div',                                                                                                   
			errorClass: 'help-block',                                                                                              
			focusInvalid: true,                                                                                                    
			rules:{                                                                                                                
				schedulerName:{                                                                                                           
					required:true, 
					remote:{                                                                                                               
						url:'validateExist',                                                                                             
						type:'post',                                                                                                     
						data:{                                                                                                           
							schedulerName:function(){                                                                                        
								return $('#schedulerNameVal').val();                                                                                    
							},                                                                                                             
							id:function(){                                                                                                 
								return $('#editId').val();                                                                                   
							}                                                                                                              
						}                                                                                                                
					}				                                                                                                           
				},
				startTime:{
					required:true
				}, 
				endTime:{
					required:true
				}, 
				frequencyIntervl:{
					required:true
				}, 
				weeklyLogic:{
					required:function(element) {
		                if ($("#userLogicType").val()==2) {
		                    return true;
		                } else {
		                    return false;
		                }
		            }
				}, 
				monthlyLogic:{
					required:function(element) {
		                if ($("#userLogicType").val()==4) {
		                    return true;
		                } else {
		                    return false;
		                }
		            }
				}, 
				dailyLogic:{
					required:true
				}
			},messages:{				                                                                                                   
				schedulerName:{                                                                                                                 
					required:"计划名称为必填项",                                                                                  
					remote:"#计划名称已存在"                                                                            
				},
				startTime:{
					required:"开始时间为必填项"
				},
				endTime:{
					required:"结束时间为必填项"
				},
				frequencyIntervl:{
					required:"间隔为必填项"
				},
				weeklyLogic:{
					required:"周必勾选"
				},
				monthlyLogic:{
					required:"月必勾选"
				},
				dailyLogic:{
					required:"日间隔为必填项"
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
			//alert("test="+$("#userLogicType").val());
			var isValid = $('#schedulerLogic_fmt').valid();    
			if(isValid){  
				$.ajax({                                                                                                             
					type:'POST',                                                                                                       
					url:'save',                                                                                                        
					data:$('#schedulerLogic_fmt').serialize(),                                                    
					dataType:'json',                                                                                                   
					success:function(json){                                                                                            
						if(json.status == "success"){                                                                                  
							$('#schedulerLogic-input').load(contextPath + '/common/success.jsp',                      
									{msg:'操作已成功，计划任务"<b>'+$('#schedulerNameVal').val()+'"</b>保存成功',                                           
									 seconds:'3000',                                                                                           
									 tips:''},'');                                                                                             
							                                                                                                               
							$('#grid-table').trigger("reloadGrid");                                                                      
						}else{                                                                                                           
							$('#schedulerLogic-input').load();                                                        
						}                                                                                                                
					}                                                                                                                  
				});                                                                                                                  
			}                                                                                                                      
		}); 
		
		 
		/*$('#dailyLogic').timepicker({
			minuteStep: 1,
			showSeconds: true,
			showMeridian: false
		}).next().on(ace.click_event, function(){
			$(this).prev().focus();
		});*/
		
//		$('#startTime').datetimepicker().next().on(ace.click_event, function(){
//			alart("asdfsafdsa");
//			$(this).prev().focus();
//		});
		
	}                                                                                                                          
}                                                                                                                           
