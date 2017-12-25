<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="navbar navbar-default" id="navbar">
	<script type="text/javascript">
	try {
		ace.settings.check('navbar', 'fixed')
	} catch (e) {
	}
	
	$(document).ready(function(){
		$("#sys_config").click(function () {
			window.location.href='${contextPath}/system/user/';
		});
		$("#rel_sys").click(function () {
			window.location.href='${contextPath}/page/business';
		});
	});
</script>	

	<div class="navbar-container" id="navbar-container">
		<div class="navbar-header pull-left">
			<a href="#" class="navbar-brand"> <small> </i>DQCenter预警系统</small> </a>
			<!-- /.brand -->
		</div>
		<!-- /.navbar-header -->

		<!-- #section:basics/navbar.dropdown -->
		<div class="navbar-header pull-right" role="navigation">
			<ul class="nav ace-nav">
<%--				<li class="purple" title="系统管理">--%>
<%--					<a href="${contextPath}/system/user/">--%>
<%--						<i class="icon-tasks"></i>--%>
<%--					</a>--%>
<%--				</li>--%>
				<li class="light-blue">
					<a data-toggle="dropdown" href="#" class="dropdown-toggle"> <img
							class="nav-user-photo" src=""
							alt="Jason's Photo" /> <span class="user-info"> <small>Welcome</small>
							<sec:authorize ifNotGranted="ROLE_ANONYMOUS">
								<sec:authentication property="principal.user.realname" /> 
							</sec:authorize>
							</span> <i class="icon-caret-down"></i> 
					</a>

					<ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-closer">
						<li class="divider"></li>
						<li>
							<a href="${contextPath}/j_spring_security_logout"> <i class="icon-off"></i> Logout </a>
						</li>
					</ul>
				</li>
			</ul>
			<!-- /.ace-nav -->
		</div>
		
		<!-- /section:basics/navbar.dropdown -->
		<div role="navigation" class="navbar-menu pull-left collapse navbar-collapse">
			<!-- #section:basics/navbar.nav -->
			<ul class="nav ace-nav navbar-nav" id="topMenu_ul">
			</ul>
			<!-- /section:basics/navbar.nav -->
		</div>
		
	</div>
	<!-- /.container -->
</div>