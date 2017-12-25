<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="main-container" id="main-container">
	<script type="text/javascript">
		try{ace.settings.check('main-container' , 'fixed')}catch(e){}
	</script>
		<a class="menu-toggler" id="menu-toggler" href="#">
			<span class="menu-text"></span>
		</a>

		<div class="sidebar" id="sidebar">
			<script type="text/javascript">
				try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
			</script>

			<div class="sidebar-shortcuts" id="sidebar-shortcuts">
				<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
					<button class="btn btn-success">
						<i class="icon-signal"></i>
					</button>

					<button class="btn btn-info">
						<i class="icon-pencil"></i>
					</button>

					<button class="btn btn-warning" id="rel_sys">
						<i class="icon-filter"></i>
					</button>

					<button class="btn btn-danger" id="sys_config">
						<i class="icon-home"></i>
					</button>
				</div>

				<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
					<span class="btn btn-success"></span>

					<span class="btn btn-info"></span>

					<span class="btn btn-warning"></span>

					<span class="btn btn-danger"></span>
				</div>
			</div><!-- #sidebar-shortcuts -->

			<ul class="nav nav-list" id="leftMenu_ul">
				
			</ul><!-- /.nav-list -->

			<div class="sidebar-collapse" id="sidebar-collapse">
				<i class="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
			</div>

			<script type="text/javascript">
				try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
			</script>
		</div>
	</div><!-- /.main-container-inner -->
	<script type="text/javascript">
		jQuery(function($){
			$.ajax({
			    type: "post",
			    url: "${contextPath }/system/menu/availableMenu",
			    dataType: "json",
			    success: function(json){
			    	treeObject = null;
			    	var tree_data= $.parseJSON(json.result);
			    	buildLeftMenu(tree_data);
		     } ,
		     error: function () {
		         alert("error");
		         }
			 });
		});
		
		//构建菜单
		function buildLeftMenu(json){
			$.each(json, function (index, item) {
				
				//top菜单
				var _top_li = $("<li class=\"light-blue\"/>").appendTo($("#topMenu_ul"));
				var _top_li_a = $("<a href=\"javascript:void(0);\" onclick=\"showSubMenu(this)\" val='"+item.id+"'></a>").appendTo($(_top_li));
				if (item.menuPath != null && item.menuPath != ''){
					//$(_top_li_a).attr("href","${contextPath }" + item.menuPath);			
				}
				if (item.iconCode != null && item.iconCode != ''){
					$("<i class='"+item.iconCode+"'></i>").appendTo($(_top_li_a));	
				}
				$(_top_li_a).append(item.name);
				
				//左边菜单
				var _li = $("<li class=\"active open subtopclass\" id='subtop_"+item.id+"' style=\"display:none;\" />").appendTo($("#leftMenu_ul"));
				var _li_a = $("<a href=\"#\" class=\"dropdown-toggle\"/>").appendTo($(_li));
				if (item.menuPath != null && item.menuPath != ''){
					$(_li_a).attr("href","${contextPath }" + item.menuPath);			
				}
				var _li_a_i = $("<i class=\"icon-desktop\"></i>").appendTo($(_li_a));
				if (item.iconCode != null && item.iconCode != ''){
					$(_li_a_i).attr("class",item.iconCode);			
				}
				$("<span class=\"menu-text\">" + item.name + "</span>").appendTo($(_li_a));
				$("<b class=\"arrow icon-angle-down\"></b>").appendTo($(_li_a));
				
				
				
				//组织子菜单
				var children = item.additionalParameters.children;
				
				var _child_ul = $("<ul class=\"submenu\"/>").appendTo($(_li));
					
				$.each(children, function (index, childItem) {
					var _child_ul_li = $("<li/>").appendTo($(_child_ul));
					var _child_ul_li_a = $("<a href=\"#\">" + childItem.name + "</a>").appendTo($(_child_ul_li));
					if (childItem.menuPath != null && childItem.menuPath != ''){
						$(_child_ul_li_a).attr("href","${contextPath}" + childItem.menuPath);			
					}
					var _child_ul_li_a_i = $("<i class=\"icon-double-angle-right\"></i>").appendTo($(_child_ul_li_a));
					if (childItem.iconCode != null && childItem.iconCode != ''){
						$(_child_ul_li_a_i).attr("class",childItem.iconCode);			
					}
				});
			});
			
			//展开当前URL的菜单栏
			var nowUrl = window.location.href;
			$.each($("#leftMenu_ul").find("a"), function (index, _a) {
				var aUrl = $(_a).attr("href");
				if (nowUrl.endWith(aUrl)>0){
					$(_a).parent().parent().parent().css("display","");
					$(_a).parent().parent().css("display","");
					$(_a).parent().attr("class","active");
				}
			});
		}
		
		function showSubMenu(t){
			var subid = "subtop_"+$(t).attr("val");
			
			$(".subtopclass").each(function () {
				if($(this).attr("id")==subid){
					$(this).css("display","block");
				}else{
					$(this).css("display","none");
				}
			});
		}
	</script>
