var selectId;
var gridTreeJson;

var Menu = {
	//加载页面时所要执行的函数
	loadPage:function(){
		Menu.buildGridTree();
		
		//新增按钮
		$('#new').click(function(){
			if (selectId == null ){
				CommUtils.commAlert("menu-input", "请选择一条记录！");
			}else{
				$('#menu-input').removeData("bs.modal");
				if (!selectId){
					selectId = "";
				}
				$('#menu-input').modal({
					remote:'inputNew?timestamp=' + new Date().getTime() + '&superId=' + selectId,
					backdrop:'static'
				});
				$('#btn_new').button('loading');
			}
		});
		//修改按钮
		$('#edit').click(function(){
			if (selectId == null ){
				CommUtils.commAlert("menu-input", "请选择一条记录！");
			}else{
				$('#menu-input').removeData("bs.modal");
				$('#menu-input').modal({
					remote:'inputEdit?menuId=' + selectId + '&timestamp=' + new Date().getTime(),
					backdrop:'static'
				});
				$('#btn_edit').button('loading');
			}
		});
		//删除按钮
		$('#delete').click(function(){
			if (selectId){
				var ids = [];
				ids.push(selectId);
				CommUtils.commDelete("menu-input", "确认您是否要删除所选中的记录？",ids);
			}else{
				CommUtils.commAlert("menu-input", "请选择一条或多条记录！");
			}
		});
	},
	
	//Menu Tree
	buildTree:function(){
		$("#menuId").val('');
    	
    	$('#menu_tree').jstree({
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
		    		url : contextPath + "/system/menu/allAvailableMenu?timestamp=" + new Date().getTime()
		    	}
			},
			checkbox : {
				three_state : true
			}
		})
		.bind('load_node.jstree', function() {   
			var checkNodeIds = $("#menuIds").val().split(",");
			$("#menu_tree").find("li").each(function(index,item) {
				for (var i = 0; i < checkNodeIds.length; i++) {
					if ($(item).attr("id") == checkNodeIds[i]) { 
						if ($('#menu_tree').jstree("is_parent", '#'+$(item).attr("id")) == false){
							$('#menu_tree').jstree("select_node", '#'+$(item).attr("id"), true);
						}
					}
				}
			});
	    });
	},
	//加载新增修改弹出窗口
	loadInputPage: function(){
		$('#btn_new').button('reset');
		$('#btn_edit').button('reset');
		
		if ($("#editId").val()){
			$("#input-title").html("修改菜单");
			
			//加载父节点编号显示，本身的编号放在文本框中
		}else{
			$("#input-title").html("新增菜单");
			//获取母页面的信息
			var menuSuperId = $("#menuId").val();
			//如果是初始新建
			if(menuSuperId==null || menuSuperId==''){
				$("#hasChild").val("0");
				$("#menuLevel").val("1");
			}else{
				var level = $("#oldmenuLevel").val();
				var newlevel = Menu.getNumber(level)+1;
				$("#superMenuId").val(menuSuperId);
				$("#hasChild").val("0");
				$("#menuLevel").val(newlevel);
			}
		}
		
		//处理checkbox
		var checkFlag = "";
		if ("1" == $("#isValid").val()){
			checkFlag = " checked='checked' ";
		}
		var checkBoxHtml = "<input name='isValid' class='ace ace-switch' type='checkbox' " 
			+ checkFlag + " ><span class='lbl'></span>";
	    $('#isValid').parent().html(checkBoxHtml);
		
		$('#menu_fmt').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: true,
			rules:{
				menuName:{
					required:true
				},
				menuCode:{
					required:true,
					remote:{
						url:'validateExistCode',
						type:'post',
						data:{
							roleCode:function(){
								return $('#menuCode').val();
							},
							id:function(){
								return $('#editId').val();
							}
						}
					}
				},
				menuOrder:{
					required:true
				}
			},
			messages:{
				menuName:{
					required: "菜单名称必填项"
					
				},
				menuCode:{
					required: "菜单编码必填项",
					remote: "菜单编码已存在"
				},
				menuOrder:{
					required:"菜单顺序必填项"
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
			var isValid = $('#menu_fmt').valid();
			if(isValid){
				$.ajax({
					type:'POST',
					url:'save',
					data:$('#menu_fmt').serialize(),
					dataType:'json',
					success:function(json){
						if(json.status == "success"){
							$('#menu-input').load(contextPath + '/common/success.jsp',
									{msg:'操作已成功，菜单"<b>'+$('#menuName').val()+'"</b>保存成功',
									 seconds:'3000',
									 tips:''},'');
							$('#grid-table').trigger("reloadGrid");
						}else{
							$('#menu-input').load();
						}
					}
				});
			}
		});
	},
	
	//获取数字格式
	getNumber:function(obj){
	   if (obj==null) return 0;
	   if (!Menu.checkFloat(obj)||obj+""==""){
	    return 0;
	   }else{
	        return parseFloat(""+obj);
	   }
	},
	//检查输入参数是否为浮点数
	checkFloat:function(str){
	    var rc=true;
	    oneDecimal=false;
	    if (str+"" == "undefined" || str == null || str==''){
	    rc=false;
	} else{
	    for(i=0;i<str.length;i++){
	        ch=str.charAt(i);
	        if(i==0 && ch=='-'){
	            continue;
	        }
	        if(ch=="." && !oneDecimal){
	        oneDecimal=true;
	            continue;
	        }
	        if(ch==","){
	            continue;
	        }
	        if ((ch< "0") || (ch >'9')){
	                rc=false;
	                break;
	            }
	        }
	    }
	    return rc;
	},
	//列表
	buildGridTree:function(){
		jQuery("#grid-table").jqGrid({
			url:"listForTree",
			datatype: 'json',     
			rowNum:10,
			rowList:[10,20,30],
			pager : "#grid-pager",
			mtype: "POST",
			height: 250,
			colNames: ["id","菜单名称","菜单顺序","菜单编码","菜单URL","上级菜单"],
			colModel: [
			    {name: "id",width:200,key:true,hidden:true},
			    {name: "name", width:100,sortable:false},
			    {name: "menuOrder",width:50,sortable:false},
			    {name: "menuCode",width:80,sortable:false},
			    {name: "menuPath",width:250,sortable:false},
			    {name: "parent",width:1,hidden:true}
			],
			treeGrid: true,
			treeGridModel: "adjacency",
			ExpandColumn: "name",
			treeIcons: {
				plus:'icon-plus',
				minus:'icon-minus'
			},
			caption: "菜单列表",
			autowidth: true,
			ExpandColClick: true,
			jsonReader: {
			    repeatitems: false,
			    root:"result"
			},
			onSelectRow: function(id){ 
				selectId = id;
			}
		});
	}
}

