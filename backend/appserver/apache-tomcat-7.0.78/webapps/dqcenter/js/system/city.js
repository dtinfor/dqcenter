var City = {
	//加载页面时所要执行的函数
	loadPage:function(){

		City.buildTree(false);
		
		//**************以下为表格操作***********************
		jQuery("#grid-table").jqGrid({
			url:'getChildrenById',
		    datatype: 'json',     
			mtype: "POST",
			height: 250,
			rownumbers: true,
			rownumWidth:50,
			colNames:['id','', '编号', '名称', '类型', '状态', '是否有子项',  '创建人','创建时间','最后修改人','最后修改时间'],
			colModel:[
			    {name:'id',index:'id',width:40,hidden:true},
			    {name:'action',index:'action',width:25,hidden:false,fixed:true},
			    {name:'cityCode',index:'cityCode',width:80,hidden:false},
				{name:'cityName',index:'cityName',width:90,editable:false},
				{name:'cityType',index:'cityType',width:50,editable:false},
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
			caption: "城市列表",
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
			var supercityType = $("#supercityType").val();
			if (supercityType=='3'){
				CommUtils.commAlert("city-input", "不能为区县新建行政单位！");
			}else{
				$('#city-input').removeData("bs.modal");
				$('#btn_new').button('loading');
				$('#city-input').modal({
					remote:'input?timestamp=' + new Date().getTime(),
					backdrop:'static'
				});
				$('#btn_new').button('reset');
			}
		});
		//修改按钮
		$('#edit').click(function(){
			
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("city-input", "修改记录时只能选择一条记录！");
			}else{
				$('#city-input').removeData("bs.modal");
				$('#city-input').modal({
					remote:'input?timestamp=' + new Date().getTime() + "&cityId=" + rowIds[0],
					backdrop:'static'
				});
				$('#btn_edit').button('reset');
			}
		});
		//删除按钮
		$('#delete').click(function(){
			var rowIds = CommUtils.getJqgridSelected("grid-table");    
			if (rowIds.length == 0){
				CommUtils.commAlert("city-input", "请选择一条或多条记录！");
			}else{
				//文件夹不能删除
				var hdel = '0';
				$.each(rowIds,function(i,cityid){
					var rowDatas = $("#grid-table").jqGrid('getRowData', cityid);
					var haschild = rowDatas["hasChild"];
					var cityname = rowDatas["cityName"];
					if(haschild=='1'){
						hdel = '1';
						CommUtils.commAlert("city-input",cityname+"有子节点，不能删除 ！");
						return false;
					}
				});
				if(hdel=='0'){
					CommUtils.commDelete("city-input", "确认您是否要删除所选中的记录？",rowIds,"city_tree");
				}
			}
		});
		//**************表格操作结束***********************
	},
	
	/*buildTree:function(multiSelect){
		if (!multiSelect){
			multiSelect = false;
		}
		var iconok = '';
		var iconmo = '';
		if(multiSelect){
			iconok = 'icon-ok';
			iconmo = 'icon-remove';
		}
		
		$("#cityId").val('');
    	$("#oldcityCode").val('');
    	$("#supercityType").val('');
    	
		var city_tree;
    	if (!multiSelect){
    		city_tree = $('#city_tree').jstree({
    			core : {
    				themes : {
    					name : false,
    					dots : false,
    					icons : false
    				},
    		    	data : {
    		    		type : "json",
    		    		method : "post",
    		    		url : contextPath + "/system/city/listForTree?timestamp=" + new Date().getTime()
    		    	}
    			}
    		});
    	}else{
    		city_tree = $('#city_tree').jstree({
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
    		    		url : contextPath + "/system/city/listForTree?showRoot=0&timestamp=" + new Date().getTime()
    		    	}
    			},
    			checkbox : {
    				three_state : false
    			}
    		});
    	}
    	
    	city_tree.bind('load_node.jstree', function() {   
			if ($("#cityIds").val()){
				var checkNodeIds = $("#cityIds").val().split(",");
				$("#city_tree").find("li").each(function(index,item) {
					for (var i = 0; i < checkNodeIds.length; i++) {
						if ($(item).attr("id") == checkNodeIds[i]) { 
							$('#city_tree').jstree("select_node", '#'+$(item).attr("id"), true);
						}
					}
				});
			}
	    })
	    .bind("select_node.jstree", function(e, data) { 
	    	if (data.node.original.id == "root_999"){
	    		$("#cityId").val("");
	    	}else{
	    		$("#cityId").val(data.node.original.id);
	    	}
        	$("#oldcityCode").val(data.node.original.cityCode);
        	$("#supercityType").val(data.node.original.level);
        	City.loadSelected($("#cityId").val());
        	
        	var cityName = data.node.name;
		}) ;
	},*/
	//加载所选单项
	loadSelected:function(cityId){
		var json = {
				'id':cityId,
			};
		jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })
		.trigger("reloadGrid");
		
	},
	
	//加载新增修改弹出窗口
	loadInputPage: function(){
		
		if ($("#editId").val()){
			$("#input-title").html("修改城市");
			
			//加载父节点编号显示，本身的编号放在文本框中
			 var cityCode = $("#cityCode").val();
	       	 var superCode= "";
	       	 var cityOwnCode = "";
	       	 if(cityCode.indexOf('.')>=0){
	       		 superCode = cityCode.substring(0, cityCode.lastIndexOf('.')+1);
	       		 cityOwnCode = cityCode.substring(cityCode.lastIndexOf('.')+1,cityCode.length);
	       	 }else{
	       		 cityOwnCode = cityCode;
	       	 }
	       	$("#superCode").html(superCode);
	       	$("#cityOwnCode").val(cityOwnCode);
	       	
	        //默认选中的城市类型
	       	var cityType = $("#oldcityType").val();
	         $("#cityType").children("option").each(function(){
	              var temp_value = $(this).val();
	              if(temp_value == cityType){
	                    $(this).attr("selected",true);
	              }
	         });
	       	
	       //处理checkbox
	 		if ("1" == $("#oldisValid").val()){
	 			$("#isValid").attr("checked","checked");
	 		}else{
	 			$("#isValid").removeAttr("checked");
	 		}
		}else{
			$("#input-title").html("新增城市");
			//获取母页面的信息
			var citySuperId = $("#cityId").val();
			//如果是初始新建
			var newcityType = '1';
			if(citySuperId==null || citySuperId==''){
				$("#hasChild").val("0");
			}else{
				
				var supercityType = $("#supercityType").val();
				newcityType = getNumber(supercityType)+1;
				var cityCode = $("#oldcityCode").val();
				$("#superCityId").val(citySuperId);
				$("#hasChild").val("0");
				$("#cityType").val(newcityType);
				if(cityCode!=null && cityCode!=''){
					//获取母页面的编号的内容，加到父节点编号显示出来
					$("#superCode").html(cityCode+'.');
				}
			}
			//默认选中的城市类型
			$("#cityType").children("option").each(function(){
	              var temp_value = $(this).val();
	              if(temp_value == newcityType){
	                    $(this).attr("selected",true);
	              }
	         });
		}
		
		$('#city_fmt').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: true,
			rules:{
				cityOwnCode:{
					required:true,
					number: true,
					remote:{//验证输入的编号是否重复
						url:'validateExist',
						type:'post',
						data:{
							cityCode:function(){
								return $('#superCode').html()+$('#cityOwnCode').val();
							},
							cityId:function(){
								return $('#cityId').val();
							}
						}
					}		
				},
				cityName:{
					required:true
					
				}
			},
			messages:{
				cityOwnCode:{
					required:"城市编号为必填项",
					number: "城市编号必须是数字",
					remote:"城市编号已存在"
				},
				cityName:{
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
	        var cityOwnCode = $("#cityOwnCode").val();
	        $("#cityCode").val(superCode+cityOwnCode);
	        
			var isValid = $('#city_fmt').valid();
			if(isValid){
				$.ajax({
					type:'POST',
					url:'save',
					data:$('#city_fmt').serialize(),
					dataType:'json',
					success:function(json){
						if(json.status == "success"){
							$('#city-input').load(contextPath + '/common/success.jsp',
									{msg:'操作已成功，城市"<b>'+$('#cityName').val()+'"</b>保存成功',
									 seconds:'3000',
									 tips:''},'');
							$('#grid-table').trigger("reloadGrid");
							CommUtils.commRefreshTree("city_tree");
						}else{
							$('#city-input').load();
						}
					}
				});
			}
		});
	}
	
}