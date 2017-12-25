	var pathName = document.location.pathname;
	var index = pathName.substr(1).indexOf("/");
	var contextPath = pathName.substr(0,index+1);

	/**
	 * 替换jqgrid的分页样式
	 * @author Leo.liu
	 */
	function updatePagerIcons(table) {
		var replacement = {
			'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
			'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
			'ui-icon-seek-next' : 'icon-angle-right bigger-140',
			'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
		};
		$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
			var icon = $(this);
			var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

			if ($class in replacement)
				icon.attr('class', 'ui-icon ' + replacement[$class]);
		})
	}

	/**
	 * 替换JQGRID的图标样式
	 * @author Leo.liu
	 */
	function aceSwitch( cellvalue, options, cell ) {
		setTimeout(function(){
			$(cell) .find('input[type=checkbox]')
					.wrap('<label class="inline" />')
				.addClass('ace ace-switch ace-switch-5')
				.after('<span class="lbl"></span>');
		}, 0);
	}
	
	Date.prototype.format =function(format){
		var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
		}
		if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
		(this.getFullYear()+"").substr(4- RegExp.$1.length));
		for(var k in o)if(new RegExp("("+ k +")").test(format))
		format = format.replace(RegExp.$1,
		RegExp.$1.length==1? o[k] :
		("00"+ o[k]).substr((""+ o[k]).length));
		return format;
	}
	
	function dateFormatter(cellvalue, options, rowObject) {
		var returnValue = "";
		if (cellvalue){
			var dateValue = new Date(cellvalue);
			returnValue = dateValue.format("yyyy-MM-dd hh:mm:ss");
		}
		return returnValue;
	}
	
	function statusChange(cellvalue, options, rowObject) {
		var statusCn = '';
		if ($.trim(cellvalue).length > 0) { // 判断元素是否为空
			if (cellvalue == 1) {
				statusCn = '有效';
			} else {
				statusCn = '无效';
			}
		} else {
			statusCn = '无效';
		}
		return statusCn;
	}
	
	String.prototype.endWith=function(str){
		if(str==null||str==""||this.length==0||str.length>this.length)
		  return false;
		if(this.substring(this.length-str.length)==str)
		  return true;
		else
		  return false;
		return true;
	};
	
	//获取数字格式
	function getNumber(obj){
	   if (obj==null) return 0;
	   if (!checkFloat(obj)||obj+""==""){
	    return 0;
	   }else{
	        return parseFloat(""+obj);
	   }
	}
	//检查输入参数是否为浮点数
	function checkFloat(str){
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
	}
	
	var CommUtils = {
		//取Jqgrid的checkbox中的值 
		getJqgridSelected : function(elementId){
			var ids = [];
			var checkboxs = $(document.getElementById(elementId)).find("input[type=checkbox].ace:checked");
			$.each(checkboxs, function (index, element) {
				ids.push($(element).val());
			});
			return ids;
		},
		
		commAlert : function(modalId,msg){
			$(document.getElementById(modalId)).load(contextPath + "/common/alert.jsp",{msg:msg,seconds:'3000',tips:''},'');
		},
		
		commDelete : function (modalId,msg,delIds,treeId){
			delIds = delIds.join(",");     
			$(document.getElementById(modalId)).load(contextPath + "/common/deleteRequest.jsp",
					{msg:msg,
					 delIds:delIds,
					 modalId:modalId,
					 treeId:treeId,
					 gridTableId:"grid-table",
					 deleteUrl:"delete",
					 seconds:'3000',
					 tips:''}
					,''
			);
		},
		
		commRefreshTree : function (elementId){
			$(document.getElementById(elementId)).jstree("refresh");
		}
	}