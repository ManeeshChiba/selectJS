$(function() {

    if ($('select').length > 0) {
    	createFauxSelectbox();
    }

    //Create New Select boxes
    function createFauxSelectbox() {
        $('select').each(function() {
            var selectName = $(this).attr('name');
            var selectId = $(this).attr('id');
            var arrOptionValue = new Array();
            var arrOptionText = new Array();
            var optionsFauxList = '';
            for (var i = 1; i < $('option', this).length + 1; i++) {
                arrOptionValue[i] = $('option:nth-of-type(' + i + ')', this).attr('value');
                arrOptionText[i] = $('option:nth-of-type(' + i + ')', this).text();
            };
            for (var i = 1; i < arrOptionValue.length; i++) {
                optionsFauxList += '<li data-value="' + arrOptionValue[i] + '">' + arrOptionText[i] + '</li>';
            };
            var openFauxList = '<ul class="faux-select" id="' + selectId + '" name="' + selectName + '" data-selected-value="' + arrOptionValue[1] + '"><li class="selected-option"><span>' + arrOptionText[1] + '</span><ul class="options">';
            var closeFauxList = '</ul></li></ul>';
            $(openFauxList + optionsFauxList + closeFauxList).insertAfter($(this));
            $(this).addClass('hidden');
            //$(this).css('display','none');
        });
        enableFauxSelectbox();
    }


	//Makes new select boxes usable
	function enableFauxSelectbox(){
		$('.faux-select').click(function(){
		  $(this).toggleClass('open');
		  $('.options',this).toggleClass('open');
		});

		$('.options li').click(function(){
			var parentSelector = $(this).parents('.faux-select');
			var selection = $(this).text();
			var dataValue = $(this).attr('data-value');
			$('.selected-option span',parentSelector).text(selection);
			$(this).toggleClass('checked');
			parentSelector.attr('data-selected-value',dataValue);
			mirrorSelect( parentSelector.attr('id'), selection, dataValue);
		});
	}

	//Mirror Select Box Values
	function mirrorSelect(selectionID, selectionText, SelectionValue) {
	  $('select#'+selectionID).val(SelectionValue).trigger('change');
	}


});




//

// if ($('select#names[multiple]').length) {
//   $('.faux-select').click(function() {
//     if ($(this).hasClass('open')) {
//       //$(this).removeClass('open');
//       //$('.options',this).removeClass('open');
//     } else {
//       $(this).addClass('open');
//       $('.options', this).addClass('open');
//     }
//   });

//   $('.options li').click(function() {
//     $(this).toggleClass('check');
//     var selection = $(this).text();
//     var dataValue = $(this).attr('data-value');
//     $('.selected-option span').text(selection);
//     $('.faux-select').attr('data-selected-value', dataValue);
//     mirrorSelect(selection, dataValue);
//     updateSelection();
//   });

// } else {
//   $('.faux-select').click(function() {
//     $(this).toggleClass('open');
//     $('.options', this).toggleClass('open');
//   });

//   $('.options li').click(function() {
//     var selection = $(this).text();
//     var dataValue = $(this).attr('data-value');
//     $('.selected-option span').text(selection);
//     $('.faux-select').attr('data-selected-value', dataValue);
//     mirrorSelect(selection, dataValue);
//     updateSelection();
//   });

// }

// //Mirror Select Box Values

// var currentSelection;

// function updateSelection() {
//   currentSelection = $('select').val();
//   outputSelection(currentSelection);
// }

// function mirrorSelect(selectionText, SelectionValue) {
//   if ($('select#names[multiple]').length) {
//     outputSelection('ja');
//   } else {
//     outputSelection(currentSelection);
//   }

//   $('select#names').val(SelectionValue).trigger('change');
// }

// $('select#names').change(function(val) {
//   //outputSelection($(this).val());
// });

// //Output Selection
// function outputSelection(output) {
//   $('#not-console-output h5').text(output);
// }
