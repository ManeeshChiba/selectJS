$(function() {

	if ( $('select').length > 0 ){

		$('select').each(function(selectIndex){
			$(this).addClass('selectReplace'+selectIndex);
			var selectName = $(this).attr('name');
			if ( $(this).attr('id') != undefined && $(this).attr('id') != false ){
				var selectId = $(this).attr('id');
			}
			var arrOptionName = new Array();
			var arrOptionValue = new Array();

			$('option', this).each(function(optionIndex){
				arrOptionValue[optionIndex] = $(this).attr('value');
				arrOptionName[optionIndex] = $(this).text();
			});
		});

	}
   
	$('.faux-select').click(function(){
	  $(this).toggleClass('open');
	  $('.options',this).toggleClass('open');
	});

	$('.options li').click(function(){
	  var selection = $(this).text();
	  var dataValue = $(this).attr('data-value');
	  $('.selected-option span').text(selection);
	  $('.faux-select').attr('data-selected-value',dataValue);
	});
   
});