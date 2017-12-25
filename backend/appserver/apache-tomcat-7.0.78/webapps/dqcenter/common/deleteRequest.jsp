<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<div class="modal-dialog">
	<div class="modal-content">
		<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-26" class="ui-dialog-title">
				<div class="widget-header widget-header-small">
					<h4 class="smaller">
						<i class="icon-ok">警告</i>
					</h4>
				</div>
			</span>
		</div>
		<div class="modal-body">
			${param.msg }<br/>
		</div>
		<div class="modal-footer">
			<input type="hidden" id="delIds" value="${param.delIds }">
			<input type="hidden" id="modalId" value="${param.modalId }">
			<input type="hidden" id="gridTableId" value="${param.gridTableId }">
			<input type="hidden" id="deleteUrl" value="${param.deleteUrl }">
			<input type="hidden" id="treeId" value="${param.treeId }">
			<button class="btn btn-success btn-sm pull-left" type="button" id="confirm">确定</button>
			<button class="btn btn-danger btn-sm pull-right" data-dismiss="modal">取消</button>
		</div>
	</div>
</div>
<script type="text/javascript">
	var myModal = $('.modal-dialog').parent('.modal');
	
	$(document).ready(function(){
		
		$('#confirm').click(function(){

			var delIds = $("#delIds").val();
			var modalId = $("#modalId").val();
			var gridTableId = $("#gridTableId").val();
			var deleteUrl = $("#deleteUrl").val();
			var treeId = $("#treeId").val();

			$.ajax({
				type:'POST',
				url:deleteUrl,
				data:"delIds=" + delIds,
				dataType:'json',
				success:function(json){
					if(json.status == "success"){
						$(document.getElementById(modalId)).load(contextPath + '/common/success.jsp',
								{msg:'操作已成功!',
								 seconds:'3000',
								 tips:''},'');
						if (gridTableId){
							$(document.getElementById(gridTableId)).trigger("reloadGrid");
						}
						if (treeId){
							CommUtils.commRefreshTree(treeId);
						}
					}else{
						if(json.status=="fail"){
							$(document.getElementById(modalId)).load(contextPath + '/common/alert.jsp',
									{msg:json.msg,
									 seconds:'3000',
									 tips:''},'');
						}
						$(document.getElementById(modalId)).load();
					}
				}
			});
		});
		
		myModal.modal('show');

		myModal.on('hidden.bs.modal', function () {
			 $(this).removeData("bs.modal");
		});
		myModal.on('hide.bs.modal', function () {
			 $(this).removeData("bs.modal");
		})
	});
</script>
