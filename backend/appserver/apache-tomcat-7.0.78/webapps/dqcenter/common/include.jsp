<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
	<title>DQCenter预警系统</title>
	<meta name="description" content="Minimal empty page" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<!-- 插件的CSS文件必须引入在include.jsp之前，否则将导致样式错乱 -->
	
	<!-- jqgrid插件CSS样式 -->
	<link rel="stylesheet" href="${contextPath}/assets/css/jquery-ui-1.10.3.full.min.css" />
	<link rel="stylesheet" href="${contextPath}/assets/css/datepicker.css" />
	<link rel="stylesheet" href="${contextPath}/assets/css/ui.jqgrid.css" />
	
	<!-- 表单CSS样式 -->
	<link rel="stylesheet" href="${contextPath}/assets/css/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" href="${contextPath}/assets/css/chosen.css" />
	<link rel="stylesheet" href="${contextPath}/assets/css/datepicker.css" />
	<link rel="stylesheet" href="${contextPath}/assets/css/bootstrap-timepicker.css" />
	<link rel="stylesheet" href="${contextPath}/assets/css/daterangepicker.css" />
	<link rel="stylesheet" href="${contextPath}/assets/css/colorpicker.css" />
	
	<!-- bootstrap框架基础CSS及字体 -->
	<link href="${contextPath}/assets/css/bootstrap.min.css" rel="stylesheet" />
	<link rel="stylesheet" href="${contextPath}/assets/css/font-awesome.min.css" />
	
	<!-- ace主题基础样式及字体 -->
	<link rel="stylesheet" href="${contextPath}/assets/css/ace.min.css" />
	<link rel="stylesheet" href="${contextPath}/assets/css/ace-rtl.min.css" />
	<link rel="stylesheet" href="${contextPath}/assets/css/ace-skins.min.css" />
	<!--[if lte IE 8]>
	  <link rel="stylesheet" href="${contextPath}/assets/css/ace-ie.min.css" />
	<![endif]-->
	<!--[if IE 7]>
	  <link rel="stylesheet" href="${contextPath}/assets/css/font-awesome-ie7.min.css" />
	<![endif]-->
	<link rel="stylesheet" href="${contextPath}/assets/css/ace-fonts.css" />
	
	<!--[if !IE]> -->
	<script type="text/javascript">
		window.jQuery || document.write("<script src='${contextPath}/assets/js/jquery-2.0.3.min.js'>"+"<"+"/script>");
	</script>
	<!-- <![endif]-->
	<!--[if IE]>
	<script type="text/javascript">
	 window.jQuery || document.write("<script src='${contextPath}/assets/js/jquery-1.10.2.min.js'>"+"<"+"/script>");
	</script>
	<![endif]-->
	
	<!-- ace scripts -->
	<script src="${contextPath}/assets/js/ace-extra.min.js"></script>
	<script src="${contextPath}/assets/js/ace-elements.min.js"></script>
	<script src="${contextPath}/assets/js/ace.min.js"></script>
	<!--[if lt IE 9]>
	<script src="${contextPath}/assets/js/html5shiv.js"></script>
	<script src="${contextPath}/assets/js/respond.min.js"></script>
	<![endif]-->
	
	<script type="text/javascript">
		if("ontouchend" in document) document.write("<script src='${contextPath}/assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
	</script>
	<script src="${contextPath}/assets/js/bootstrap.min.js"></script>
	<script src="${contextPath}/assets/js/bootbox.min.js"></script>
	<script src="${contextPath}/assets/js/typeahead-bs2.min.js"></script>
	<%-- <script src="${contextPath}/assets/js/typeahead-bs2.min.js"></script> --%>
	
	<!-- jqgrid插件 -->
	<%-- <script src="${contextPath}/assets/js/date-time/moment.min.js"></script>
	<script src="${contextPath}/assets/js/date-time/bootstrap-datetimepicker.js"></script> --%>
	<script src="${contextPath}/assets/js/date-time/bootstrap-datepicker.min.js"></script>
	<script src="${contextPath}/assets/js/jqGrid/jquery.jqGrid.min.js"></script>
	<script src="${contextPath}/assets/js/jqGrid/i18n/grid.locale-en.js"></script>
	
	<!-- 表单控制插件 -->
	<script src="${contextPath}/assets/js/jquery-ui-1.10.3.custom.min.js"></script>
	<script src="${contextPath}/assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="${contextPath}/assets/js/chosen.jquery.min.js"></script>
	<script src="${contextPath}/assets/js/fuelux/fuelux.spinner.min.js"></script>
	<script src="${contextPath}/assets/js/date-time/bootstrap-datepicker.min.js"></script>
	<script src="${contextPath}/assets/js/date-time/bootstrap-timepicker.min.js"></script>
	<script src="${contextPath}/assets/js/date-time/moment.min.js"></script>
	<script src="${contextPath}/assets/js/date-time/daterangepicker.min.js"></script>
	<script src="${contextPath}/assets/js/bootstrap-colorpicker.min.js"></script>
	<script src="${contextPath}/assets/js/jquery.knob.min.js"></script>
	<script src="${contextPath}/assets/js/jquery.autosize.min.js"></script>
	<script src="${contextPath}/assets/js/jquery.inputlimiter.1.3.1.min.js"></script>
	<script src="${contextPath}/assets/js/jquery.maskedinput.min.js"></script>
	<script src="${contextPath}/assets/js/bootstrap-tag.min.js"></script>
	
	<script src="${contextPath}/assets/js/jquery.validate.min.js"></script>
	
	<!-- 树形插件 -->
	<script type="text/javascript" src="${contextPath}/plugins/jstree/js/jstree.js"></script>
	<link rel="stylesheet" href="${contextPath}/plugins/jstree/css/jstree.css" />
	<!-- 自定义JS -->
	<script src="${contextPath}/js/common.js"></script>
	
	