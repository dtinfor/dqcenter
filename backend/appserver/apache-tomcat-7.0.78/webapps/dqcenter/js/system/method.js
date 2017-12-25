var Method = {
	
	//列表页面加载方法
	loadPage : function() {
		jQuery("#grid-table").jqGrid({
			url:'list',
		    datatype: 'json',     
			mtype: "POST",
			height: 250,
			rownumbers: true,
			rownumWidth:50,
			colNames:['id','','联系人名称','部门','手机号码', 'Email','微信' ,'备注'],
			colModel:[
			    {name:'id',index:'id',width:25,hidden:true},
			    {name:'action',index:'id',width:25,hidden:false,fixed:true},
			    {name:'contactname',index:'contactname',width:90,hidden:false},
			    {name:'department',index:'department',width:90,hidden:false},
			    {name:'mobile',index:'mobile',width:90,editable:false},
			    {name:'email',index:'email',width:140,editable:false},
				{name:'wechat',index:'wechat', width:90,editable:false},
				{name:'remark',width:90,editable:false,sortable:false},
			], 
			
			viewrecords : false,
			rowNum:10,
			rowList:[10,20,30],
			pager : "#grid-pager",
			multiselect: false,
	        multiboxonly: false,
			altRows: true,
			autowidth: true,
			caption: "联系人列表",
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
				'mobile':$("#search_mobile").val()
			};
			jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })
			.trigger("reloadGrid");
		});
	
		//新增按钮
		$('#new').click(function(){
			$('#method-input').removeData("bs.modal");
			$('#method-input').modal({
				remote:'input?timestamp=' + new Date().getTime(),
				backdrop:'static'
			});
			$('#btn_new').button('loading');
		});
		
		//修改按钮
		$('#edit').click(function(){
			
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("method-input", "修改记录时只能选择一条记录！");
			}else{
				$('#method-input').removeData("bs.modal");
				$('#method-input').modal({                             
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
				CommUtils.commAlert("method-input", "请选择一条或多条记录！");
			}else{
				CommUtils.commDelete("method-input", "确认您是否要删除所选中的记录？",rowIds);
			}
		});
	},
	//修改页面加载方法
	loadInputPage: function(){
		
		$('#btn_new').button('reset');
		$('#btn_edit').button('reset');
		
		if ($("#editId").val()){
			$("#input-title").html("修改联系人");
		}else{
			$("#input-title").html("新增联系人");
		}
		
		jQuery.validator.addMethod("regex",function(value, element, params){  //扩展方法示例:　　　　　　　　　　　  
            var exp = new RegExp(params); //params rules的value传入的正则表达式  
            return exp.test(value);       //value  被验证的input传入的值  
        },"输入格式有误"); 
		
		$('#method_fmt').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: true,
			rules:{
				mobile:{
					required:true,
					regex: /^1[3|4|5|8][0-9]\d{8}$/,
					remote:{
						url:'validateExist',
						type:'post',
						data:{
							mobile:function(){
								return $('#mobile').val();
							},
							id:function(){
								return $('#editId').val();
							}
						}
					}
				},
				email:{
					required:true,
					email:true
				},
				contactname:{
					required:true,
					maxlength:100
				}
			},messages:{
				mobile:{
					required:"手机号码为必填项",
					remote:"手机号码已存在"
				},
				email:{
					required:"Email必须填写",
					email:"Email格式不正确"
				},contactname:{
					required:"联系人必须填写",
					maxlength:"最多只能填{0}个字符"
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
			var isValid = $('#method_fmt').valid();
			if(isValid){
				$.ajax({
					type:'POST',
					url:'save',
					data:$('#method_fmt').serialize(),
					dataType:'json',
					success:function(json){
						if(json.status == "success"){
							$('#method-input').load(contextPath + '/common/success.jsp',
									{msg:'操作已成功，联系人"<b>'+$('#contactname').val()+'"</b>保存成功',
									 seconds:'3000',
									 tips:''},'');
							
							$('#grid-table').trigger("reloadGrid");
						}else{
							$('#method-input').load();
						}
					}
				});
			}
		});
	}
}