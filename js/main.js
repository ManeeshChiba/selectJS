$(function() {

    if ($('select').length > 0) {
    	createFauxSelectbox();
    }

    //Create New Select boxes
    function createFauxSelectbox() {
        $('select').each(function() {
            var selectName = $(this).attr('name');
            var selectId = $(this).attr('id');
            if ( $(this).attr('multiple') == 'multiple' ) { var multiple = true; } else { var multiple = false; };
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

            var arrOptionGroup = new Array();
            var arrOptionGroupValue = [];
            var arrOptionGroupText = [];
            var currentCount = 0;
            var optionsGroupFauxList = '';

            

            

            var openFauxList = '<ul class="faux-select multiple-'+multiple+'" id="' + selectId + '" name="' + selectName + '" data-selected-value="' + arrOptionValue[1] + '"><li class="selected-option"><span>' + arrOptionText[1] + '</span><ul class="options">';
            var closeFauxList = '</ul></li></ul>';


            if ( $('optgroup', this).length > 0 ){
            	$('optgroup', this).each(function(index){
            		arrOptionGroup[index] = $(this).attr('label');
            		optionsGroupFauxList += '<li class="group-label">'+arrOptionGroup[index]+'</li>';
            		currentCount = index;
            		arrOptionGroupValue[currentCount] = [];
            		arrOptionGroupText[currentCount] = [];
            		$('option',this).each(function(index){
            			arrOptionGroupValue[currentCount].push( $(this).attr('value') );
            			arrOptionGroupText[currentCount].push( $(this).text() );
            			optionsGroupFauxList += '<li data-value="' + arrOptionGroupValue[currentCount][index] + '">' + arrOptionGroupText[currentCount][index] + '</li>';
            			
            		});
            	});
            	$(openFauxList + optionsGroupFauxList + closeFauxList).insertAfter($(this));
            	
            } else {
            	$(openFauxList + optionsFauxList + closeFauxList).insertAfter($(this));
            }
            $(this).addClass('hidden');
            //$(this).css('display','none');
        });
        enableFauxSelectbox();
        enableBodyCloser();
    }

    var multiValue = '';

	//Makes new select boxes usable
	function enableFauxSelectbox(){
		$('.faux-select.multiple-false').click(function(){
		  $(this).toggleClass('open');
		  $('.options',this).toggleClass('open');
		  $('.options',this).slideToggle( "medium", function() {});
		});

		$('.faux-select.multiple-true').click(function(){
		  $(this).addClass('open');
		  $('.options',this).addClass('open');
		  $('.options',this).slideToggle( "medium", function() {});
		});

		$('.options li').click(function(){
			var parentSelector = $(this).parents('.faux-select');
			var selection = $(this).text();
			var dataValue = $(this).attr('data-value');
			$('.selected-option span',parentSelector).text(selection);
			$(this).toggleClass('checked');
			parentSelector.attr('data-selected-value',dataValue);
			

			if (parentSelector.hasClass('multiple-true')){
				if (multiValue.indexOf(dataValue) >= 0){

					multiValue = multiValue.replace(dataValue+',','');
					var passOn = 1;

				} else {
					if (passOn != 1){
						if (multiValue == ''){
							multiValue += dataValue;
						} else {
							multiValue += ','+dataValue;
						}
					}

					
				}

				var arraySelection = multiValue.split(',');
				
				mirrorSelect( parentSelector.attr('id'), selection, arraySelection);

			} else {
				mirrorSelect( parentSelector.attr('id'), selection, dataValue);
			}
		});
	}

	//Mirror Select Box Values
	function mirrorSelect(selectionID, selectionText, SelectionValue) {
	  $('select#'+selectionID).val(SelectionValue).trigger('change');
	  console.log( $('select#'+selectionID).val() );
	}


	function enableBodyCloser(){
		$('.faux-select').each(function(){
			$(this).mouseleave(function(){
				if ($(this).hasClass('open')){
					$(this).toggleClass('open');
		  			$('.options',this).toggleClass('open');
		  			$('.options',this).slideToggle( "medium", function() {});
				}
			});
		});
	}

});
