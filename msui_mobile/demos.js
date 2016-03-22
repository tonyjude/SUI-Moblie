$(function () {
  'use strict';
  $(document).on("pageInit", "#page-city-picker", function(e) {
	$("#city-picker").cityPicker({
		//value: ['天津', '河东区']
	   // value: ['四川', '内江', '东兴区']
	});
  });
		
	function getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
		return currentdate;
	}	

	$("#x_date").html(getNowFormatDate);

	$(document).on("click", ".my-btn", function() {
		$.openPanel("#panel-js-demo");
	});

	$(".x-subform-delete").each(function(i, obj){
		$(obj).on('click', function(){
			$($(this).parents(".x-subform-line")[0]).remove();
		});
	});


	/*花呗信息点击添加纪录*/
	$(".x-subform-btn-add").each(function(i, obj){
		$(obj).on('click', function(e){
			e.preventDefault();
			var x_subfom = $('<div class="x-subform-line expand">');
			var x_subfom_cell_1 = $('<div class="x-subform-cell"></div>');
			
			var x_subform_label = $('<div class="x-subform-label"></div>');
			var x_subform_delete = $('<a class="x-subform-delete"></a>');
				x_subform_delete.html('<i class="icon icon-remove"></i>');
			var x_subform_label_text = $('<div class="x-subform-label-text"></div>');
				x_subform_label_text.html('额度（元）<span class="f-required" style="display: inline;">*</span>');
			var x_subform_cell_widget = $('<div class="x-subform-cell-widget x-number"></div>');
			
				var temp_quota = i == 0 ? ' name="huabei_quota[]" ' :  ' name="jiebei_quota[]" ';
				x_subform_cell_widget.html('<input type="number" '+ temp_quota +'  placeholder="请输入数字">');
			x_subform_label.append(x_subform_delete);
			x_subform_label.append(x_subform_label_text);
			x_subform_label.append(x_subform_cell_widget);
			
			x_subfom_cell_1.append(x_subform_label);
			
			var x_subfom_cell_2 = $('<div class="x-subform-cell"></div>');
			var temp_balance = i == 0 ? ' name="huabei_balance[]" ' : ' name="jiebei_balance[]" ' ;
			x_subfom_cell_2 = $('<div class="x-subform-label">\
					  <div class="x-subform-label-text" >\
						当前余额\
						<span class="f-required" style="display: inline;">*</span>\
					  </div>\
					</div>\
					<div class="x-subform-cell-widget x-number"><input '+ temp_balance +' style="border: 1px solid #e6e9ed;" type="number" placeholder="请输入数字"></div>');
			
			var x_subfom_cell_3 = $('<div class="x-subform-cell"></div>');
			var temp_times = i == 0 ? ' name="huabei_open_times[]" ' : ' name="jiebei_open_times[]" ';
			x_subfom_cell_3.html('<div class="x-subform-label">\
					  <div class="x-subform-label-text">\
						开通时间（月）\
						<span class="f-required" style="display: inline;">\
						  *\
						</span>\
					  </div>\
					</div>\
					<div class="x-subform-cell-widget x-number">\
					  <input type="number" '+ temp_times +' placeholder="请输入数字">\
					</div>');
					
			var x_subfom_cell_4 = $('<div class="x-subform-cell"></div>');
			var temp_overdue = i == 0 ? ' name="huabei_overdue[]" ' : ' name="jiebei_overdue[]" ';
			x_subfom_cell_4.html('<div class="x-subform-label">\
					  <div class="x-subform-label-text">\
						逾期次数\
						<span class="f-required" style="display: inline;">\
						  *\
						</span>\
					  </div>\
					</div>\
					<div class="x-subform-cell-widget x-number">\
					  <input type="number" '+ temp_overdue +' placeholder="请输入数字">\
					</div>');
			
			x_subfom.append(x_subfom_cell_1);
			x_subfom.append(x_subfom_cell_2);
			x_subfom.append(x_subfom_cell_3);
			x_subfom.append(x_subfom_cell_4);
			$($(".x-subform-body")[i]).append(x_subfom);
			
			x_subform_delete.on('click', function(){
				$($(this).parents(".x-subform-line")[0]).remove();
			});
			
		});
	})
	
	/**
	 * 显示提示框的方法
	 * 
	 * @param {string} text 提示的文字
	 */
	function tips(text)
	{
		var tips = $('#tips');
		var that  = {};
		
		if (that._timer) {
			clearTimeout(that._timer);
			that._timer = null;
			tips.css({'top' : '-60px'});
			setTimeout(show, 350);
		} else {
			show();
		}
		
		function show() 
		{
			tips.css({'top' : '0px'});
			tips.html(text);
			
			that._timer = setTimeout(function(){
				tips.css({'top' : '-60px'});
				that._timer = null;
			}, 1500);
		}
	}	
	
	$("#ajaxForm").on("submit", function(e){
		e.preventDefault();
		
		var that = e.target;
		if (that.name.value == '') {
			tips('请输入用户名');
			return false;
		}
		
		if (that.sex.value == '') {
			return tips('请选择性别');
		}

		if (!that.id_number.value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(that.id_number.value)){
			return tips('身份证号码有误');
		}
		
		if (that.city.value == '') {
			return tips('请选择城市');
		}
			
		if (that.address.value == '') {
			return tips('请输入详细地址');
		}
		
		if (that.alipay.value == '') {
			return tips('请输入支付宝帐号');
		}
		
		if (that.phone.value.length != 11) {  //!/^(13[0-9]{9})|(15[89][0-9]{8})$/i.test(that.phone.value)
			return tips('手机号码有误');
		}	
		
		if (that.workplace.value == '') {
			return tips('请输入工作单位/在读学校');
		}
		
		if (!that.telephone.value) {
			return tips('电话号码格式有误');
		}
		
		if (that.sesame_credit_score.value == '') {
			return tips('请输入芝麻信用分');
		}
		
		if (that.ensure_way.value == '') {
			return tips('请选择担保方式');
		}
		
		if (that.identity.value == '') {
			return tips('请选择身份');
		}
		
		if (that.is_salary.value == '') {
			return tips('请选择是否有打卡工资');
		}
		
		if (that.salary.value == '') {
			return tips('请输入月收入');
		}
		
		if (that.is_insurance.value == '') {
			return tips('请选择是否缴纳社保');
		}
		
		if (that.is_fund.value == '') {
			return tips('请选择是否缴纳公积金');
		}
		
		if (that.credit_record.value == '') {
			return tips('请选择信用卡记录');
		}
		
		
		$.post('/?s=index/index', $("#ajaxForm").serialize(), function (response) {
			console.log(response);
		})
		
	});

  
   $.init();

  
});