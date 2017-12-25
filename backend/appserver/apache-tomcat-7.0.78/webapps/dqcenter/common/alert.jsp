<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<div class="modal-dialog">
	<div class="modal-content">
		<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-26" class="ui-dialog-title">
				<div class="widget-header widget-header-small">
					<h4 class="smaller">
						<i class="icon-ok">提示</i>
					</h4>
				</div>
			</span>
		</div>
		<div class="modal-body">
			${param.msg }<br/>
		</div>
		<div class="modal-footer">
			<button class="btn btn-danger btn-sm pull-right" data-dismiss="modal">关闭</button>
		</div>
	</div>
</div>
<script type="text/javascript">
	var myModal = $('.modal-dialog').parent('.modal');

	$(document).ready(function(){
		myModal.modal('show');

		myModal.on('hidden.bs.modal', function () {
			 $(this).removeData("bs.modal");
		});
		myModal.on('hide.bs.modal', function () {
			 $(this).removeData("bs.modal");
		})
	});
</script>
