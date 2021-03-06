var Connection = {
	
	//列表页面加载方法
	loadPage : function() {
		jQuery("#grid-table").jqGrid({
			url:'list',
		    datatype: 'json',     
			mtype: "POST",
			height: 250,
			rownumbers: true,
			rownumWidth:50,
			colNames:['id','','数据源名称','类型','URL','用户名'], 
			colModel:[
			    {name:'id',index:'id',width:25,hidden:true},
			    {name:'action',index:'id',width:25,hidden:false,fixed:true},
			    {name:'connName',index:'conn_Name',width:90,hidden:false},
			    {name:'dbType',index:'db_Type',width:90,hidden:false},
			    {name:'connUrl',index:'conn_Url',width:90,editable:false},
			    {name:'dbUser',index:'db_User',width:90,editable:false},
			], 
			
			viewrecords : false,
			rowNum:10,
			rowList:[10,20,30],
			pager : "#grid-pager",
			multiselect: false,
	        multiboxonly: false,
			altRows: true,
			autowidth: true,
			caption: "数据源列表",
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
				'connName':$("#search_connName").val()
			};
			jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })
			.trigger("reloadGrid");
		});
	
		//新增按钮
		$('#new').click(function(){
			$('#conn-input').removeData("bs.modal");
			$('#conn-input').modal({
				remote:'input?timestamp=' + new Date().getTime(),
				backdrop:'static'
			});
			$('#btn_new').button('loading');
		});
		
		//修改按钮
		$('#edit').click(function(){
			
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("conn-input", "修改记录时只能选择一条记录！");
			}else{
				$('#conn-input').removeData("bs.modal");
				$('#conn-input').modal({                             
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
				CommUtils.commAlert("conn-input", "请选择一条或多条记录！");
			}else{
				CommUtils.commDelete("conn-input", "确认您是否要删除所选中的记录？",rowIds);
			}
		});
	},
	//修改页面加载方法
	loadInputPage: function(){
		$('#btn_new').button('reset');
		$('#btn_edit').button('reset');
		
		if ($("#editId").val()){
			$("#input-title").html("修改数据源");
		}else{
			$("#input-title").html("新增数据源");
		}
		
		$('#repositoryConnection_fmt').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: true,
			rules:{
				connName:{
					required:true,
					remote:{
						url:'validateExist',
						type:'post',
						data:{
							connName:function(){
								return $('#connName').val();
							},
							id:function(){
								return $('#editId').val();
							}
						}
					}				
				},
				connUrl:{required:true}
				,dbUser:{required:true}
				,dbPwd:{required:true}
			},messages:{
				connName:{
					required:"数据库名称为必填项",
					remote:"数据库已存在"
				}
				,connUrl:{required:"URL必填"}
				,dbUser:{required:"用户名必填"}
				,dbPwd:{required:"密码必填"}
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
			var isValid = $('#repositoryConnection_fmt').valid();
			if(isValid){
				$.ajax({
					type:'POST',
					url:'save',
					data:$('#repositoryConnection_fmt').serialize(),
					dataType:'json',
					success:function(json){
						if(json.status == "success"){
							$('#conn-input').load(contextPath + '/common/success.jsp',
									{msg:'操作已成功，数据源"<b>'+$('#connName').val()+'"</b>保存成功',
									 seconds:'3000',
									 tips:''},'');
							
							$('#grid-table').trigger("reloadGrid");
						}else{
							$('#conn-input').load();
						}
					}
				});
			}
		});
	}
}