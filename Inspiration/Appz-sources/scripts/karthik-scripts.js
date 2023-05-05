
// Open components menu in menu when in components
$('.component').find('.components').addClass('on');
/* sidebar */
    $('#showLeft').on('click',  function() {
        var menuLeft = document.getElementById('apz-nav-ls');
        var showBackdrop = document.getElementById('backdrop');
        $(this).toggleClass('active' );
        $(menuLeft).toggleClass('apz-nav-open'); 
        $(showBackdrop).toggleClass( 'in')
        disableOther( 'showLeft' );
        marginSet();
    });
    $('#showRight').on('click', function() {
        var menuRight = document.getElementById('apz-nav-rs');
        var showBackdrop = document.getElementById('backdrop');
        $(this).toggleClass('active' );
        $(menuRight).toggleClass('apz-nav-open');
        $(showBackdrop).toggleClass( 'in')				
        disableOther( 'showRight' );
        marginSet();
    });
    $('#showTop').on('click', function() {
        var menuTop = document.getElementById('apz-nav-h');
        var showTop = document.getElementById('showTop');
        $(this).toggleClass( 'active');
        $(menuTop).toggleClass('apz-nav-open')
       // $(this).animate({height:auto},'600ms','easeout');
        disableOther( 'showTop' );
        marginSet();
    });
    $('#showBottom').on('click', function() {
        var menuBottom = document.getElementById('apz-nav-f');
        var showBottom = document.getElementById('showBottom');
        $(this).toggleClass('active' );
        $(menuBottom).toggleClass('apz-nav-open');
        disableOther('showBottom');
        marginSet();
    });
   /* commented for next release 
   
   $('#showLeftPush').on('click', function() {
        var menuLeft = document.getElementById('apz-nav-ls');
        var body = document.body;
        $(this).toggleClass('active' );
        $('.rolepage').toggleClass('apz-nav-push-toright');
        $( menuLeft).toggleClass('apz-nav-open');
        disableOther('showLeftPush');
        marginSet();
    });
    $('#showRightPush').on('click', function() {
        var menuRight = document.getElementById('apz-nav-rs');
        var body = document.body;
        $(this).toggleClass('active');
        $('.rolepage').toggleClass('apz-nav-push-toleft' );
        $(menuRight).toggleClass('apz-nav-open' );
        disableOther( 'showRightPush' );
        marginSet();
    });*/
    $('#showLeftStay').on('click', function() {
        var menuLeft = document.getElementById('apz-nav-ls');
        var body = document.body;
        $(this).toggleClass('active');
        $('.rolepage').toggleClass('apz-nav-stay-left');
        $(menuLeft).toggleClass( 'apz-nav-open');			
        disableOther( 'showLeftStay' );
        marginSet();
    });
    $('#showRightStay').on('click', function() {
        var menuRight = document.getElementById('apz-nav-rs');
        var body = document.body;
        $(this).toggleClass('active');
        $('.rolepage').toggleClass('apz-nav-stay-right');
        $(menuRight).toggleClass('apz-nav-open');
        disableOther('showRightStay');
        marginSet(); 
    });

/* marginset for pagesection */

 marginSet = function() {
		var hdrobj = jQuery('.pnt-head');
		var hdrheight = hdrobj.outerHeight();
        var ftrobj = jQuery('.pnt-foot');
		var ftrheight = ftrobj.outerHeight();
		var lmenuwidth = jQuery('.pnt-sdbr.lft').outerWidth();
		 
        if (!hdrobj.hasClass("apz-nav-open")){
            jQuery(".pagebody").css("padding-top", 0); 
            jQuery(".pnt-sdbr.lft").css("top", 0); 
            jQuery(".pnt-sdbr.rht").css("top", 0); 
        }
        else{
            jQuery(".pagebody").css("padding-top", hdrheight); 
            jQuery(".pnt-sdbr.lft").css("top", hdrheight); 
            jQuery(".pnt-sdbr.rht").css("top", hdrheight); 
        }
     
        if (!ftrobj.hasClass("apz-nav-open")){
            jQuery(".pagebody").css("padding-bottom", 0);
            jQuery(".pnt-sdbr.lft").css("bottom", 0);
            jQuery(".pnt-sdbr.rht").css("bottom", 0);
        }
        else{
            jQuery(".pagebody").css("padding-bottom", ftrheight);
            jQuery(".pnt-sdbr.lft").css("bottom", ftrheight);
            jQuery(".pnt-sdbr.rht").css("bottom", ftrheight);
            
        } 
	} 

// Datepicker

$( "#datepicker-demo" ).datepicker({
  dateFormat: "dd M yy",
  firstDay: 1,
 dayNamesMin: [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ],
  showOtherMonths: false,
  selectOtherMonths: false,
  changeMonth: false,
 changeYear: false
});

$( "#datepicker-demo2" ).datepicker({
  dateFormat: "dd M yy",
  firstDay: 1,
  dayNamesMin: [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ],
  showOtherMonths: true,
  selectOtherMonths: true,
  changeMonth: true,
  changeYear: true,
  minDate: -20,
  maxDate: "+1M +10D"
});

$( "#datepicker-demo3" ).datepicker({
  defaultDate: "+1w",
  dateFormat: "dd M yy",
  firstDay: 1,
  dayNamesMin: [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ],
  showOtherMonths: true,
  selectOtherMonths: true,
  changeMonth: true,
  changeYear: true,
  minDate: -20,
  onClose: function( selectedDate ) {
    $( "#datepicker-demo4" ).datepicker( "option", "minDate", selectedDate );
  }
});

$( "#datepicker-demo4" ).datepicker({
  defaultDate: "+1w",
  dateFormat: "dd M yy",
  firstDay: 1,
  dayNamesMin: [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ],
  showOtherMonths: true,
  selectOtherMonths: true,
  changeMonth: true,
  changeYear: true,
  minDate: -20,
  onClose: function( selectedDate ) {
    $( "#datepicker-demo3" ).datepicker( "option", "maxDate", selectedDate );
  }
});




/* for template purpose these are added */

$( "#datepicker-demo5" ).datepicker({
  dateFormat: "dd M yy",
  firstDay: 1,
  dayNamesMin: [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ],
  showOtherMonths: true,
  selectOtherMonths: true,
  changeMonth: true,
  changeYear: true,
  minDate: -20,
  maxDate: "+1M +10D"
});
$( "#datepicker-demo6" ).datepicker({
  dateFormat: "dd M yy",
  firstDay: 1,
  dayNamesMin: [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ],
  showOtherMonths: true,
  selectOtherMonths: true,
  changeMonth: true,
  changeYear: true,
  minDate: -20,
  maxDate: "+1M +10D"
});
$( "#datepicker-demo7" ).datepicker({
  dateFormat: "dd M yy",
  firstDay: 1,
  dayNamesMin: [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ],
  showOtherMonths: true,
  selectOtherMonths: true,
  changeMonth: true,
  changeYear: true,
  minDate: -20,
  maxDate: "+1M +10D"
});
$( "#datepicker-demo8" ).datepicker({
  dateFormat: "dd M yy",
  firstDay: 1,
  dayNamesMin: [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ],
  showOtherMonths: true,
  selectOtherMonths: true,
  changeMonth: true,
  changeYear: true,
  minDate: -20,
  maxDate: "+1M +10D"
});
$( "#datepicker-demo9" ).datepicker({
  dateFormat: "dd M yy",
  firstDay: 1,
  dayNamesMin: [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ],
  showOtherMonths: true,
  selectOtherMonths: true,
  changeMonth: true,
  changeYear: true,
  minDate: -20,
  maxDate: "+1M +10D"
});
$( "#datepicker-demo10" ).datepicker({
  dateFormat: "dd M yy",
  firstDay: 1,
  dayNamesMin: [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ],
  showOtherMonths: true,
  selectOtherMonths: true,
  changeMonth: true,
  changeYear: true,
  minDate: -20,
  maxDate: "+1M +10D"
});
$( "#datepicker-demo11" ).datepicker({
  dateFormat: "dd M yy",
  firstDay: 1,
  dayNamesMin: [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ],
  showOtherMonths: true,
  selectOtherMonths: true,
  changeMonth: true,
  changeYear: true,
  minDate: -20,
  maxDate: "+1M +10D"
});
$( "#datepicker-demo12" ).datepicker({
  dateFormat: "dd M yy",
  firstDay: 1,
  dayNamesMin: [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ],
  showOtherMonths: true,
  selectOtherMonths: true,
  changeMonth: true,
  changeYear: true,
  minDate: -20,
  maxDate: "+1M +10D"
});
 


// Dropdowns
/* select with input dropdown */
$('.slin-dropdown').on( 'click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  $this = $(this);
    ///for disable purpose
    var disabled = $(this).attr("disabled");
    if(!disabled){
			$(this).toggleClass('is-open');
		}  
  // Hide on click outside
  var clickoutside = function() {
    console.log('clicked outside');
    $this.removeClass('is-open');
    setTimeout(function(){
      $this.removeClass('is-above');
    }, 300);
  };
  $('html').on('click', function(event) {
    if ($(event.target).parents('.slin-dropdown').length==0) {
      clickoutside();
      $(this).unbind(event);
      $(this).unbind( "click", clickoutside );
    }
  });
})
   




$('.ett-slcn').on('click',function(e){  
    if($(this).hasClass('ett-slcn')){ 
        $(this).toggleClass("is-open");
        var currSEL = this;
        $('html').on('click',function(e){
            if (e.target!=currSEL) {
                $(currSEL).removeClass('is-open');
            }
        });
    }
     
});
                     
$('.ett-slct').not('.dropdown-select, .is-multi-tiered').on( 'click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  $this = $(this);
    ///for disable purpose
    var disabled = $(this).attr("disabled");
    if(!disabled){
			$(this).toggleClass('is-open');
		} 
     
    
  
    if( $(this).find('.sub-ctr').is('\\:off-bottom') ) {
        $(this).toggleClass('is-above');
    }
  $(this).find('li:not(.is-disabled)').on( 'click', function(e) {
    var newtext = $(this).text();
    $(this).siblings().removeClass('is-selected');
    $(this).addClass('is-selected').closest('.ett-slct').find('.sub-elt').val(newtext);
    if ($.validator) {
      $this.find('input').valid();
    }
      
  });
  $(this).find('.menu-expand').on( 'click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('is-expanded').closest('li').next('ul').toggle();
  });
  // Hide on click outside
  var clickoutside = function() {
    console.log('clicked outside');
    $this.removeClass('is-open');
    setTimeout(function(){
      $this.removeClass('is-above');
    }, 300);
  };
  $('html').on('click', function(event) {
    if ($(event.target).parents('.ett-slct').length==0) {
      clickoutside();
      $(this).unbind(event);
      $(this).unbind( "click", clickoutside );
    }
  })
  // Don't show hover background on multi-tiered plus icon
  $(this).find('li:not( .is-disabled ) .menu-expand').hover( function(e) {
    $(this).closest('li').toggleClass('unhover')
  });
});

// Multi select dropdown
$('.ett-slct.is-multi-tiered').on( 'click', function(e) {
  
  if( $(this).find('.sub-ctr').is('\\:off-bottom') ) {
      $(this).toggleClass('is-above');
  }
    ///for disable purpose
    var disabled = $(this).attr("disabled");
    if(!disabled){
			$(this).toggleClass('is-open');
		}
  $(this).find('input').on( 'change', function(e) {
    var txtbox = $(this).closest('.ett-slct').find('.sub-elt');
    var allVals = [];
    $(this).closest('.sub-ctr').find(':checked').each(function() {
      allVals.push($(this).next().text());
    });
    var allValsString = allVals.join(', ');
    txtbox.val(allValsString);
    if ($(this).is(':checked')){
      $(this).closest('li').next('ul').show().find('input').prop('checked', true);
    } else {
      $(this).closest('li').next('ul').hide().find('input').prop('checked', false);
    }
  });
});

// simple dropdown 
$('.ett-drdn').on( 'click', function(e) {
  $this = $(this);
  $thisParent = $this.parent('.ett-drdn');
  e.preventDefault();
  e.stopPropagation();
  $thisParent.removeClass('is-above');
  $thisParent.toggleClass('is-open');
    if( $this.next('.sub-ctr').is('\\:off-bottom') ) {
        $this.parent('.ett-drdn').toggleClass('is-above');
    }
    ///for disable purpose
    var disabled = $(this).attr("disabled");
    if(!disabled){
			$(this).toggleClass('is-open');
		} 
  // Hide on click outside
  var clickoutside = function() {
    console.log('clicked outside');
    $thisParent.removeClass('is-open');
    setTimeout(function(){
      $thisParent.removeClass('is-above');
    }, 300);
  };
  $('html').on('click', function(event) {
    if ($(event.target).parent('.ett-drdn').length==0) {
      clickoutside();
      $(this).unbind(event);
      $(this).unbind( "click", clickoutside );
    }
  })
});



//select2 plugin initlization Multiselect 

$(".mltt > select").select2({
  placeholder: "Please Select", 
    width: '100%'
    
    //,  minimumResultsForSearch: -1
    
});
/* for time picker */
 $(".mltt.time> select").select2({
  placeholder: "Please select time", 
    width: '100%',
    maximumSelectionLength:1
   /* allowClear: true*/
    //,  minimumResultsForSearch: -1
    
});

$(".acpt > select").select2({
  placeholder: "Please Select", 
    width: '100%' 
    
    //,  minimumResultsForSearch: -1
    
});  

/* tags */ 
   function initTags (pid, phtmlid, pobj) {
	var lplaceholder = "add a tag";
	try {
		//var ldata = appzillon.data.scrmetadata.elmsmap[pid];
		//lplaceholder = ldata.placeholder;
	} catch (e) {}
	var lobj = {
		'defaultText' : lplaceholder
	};
	$.extend(lobj, pobj);
	var existingdiv = $("#" + phtmlid).next();
	if (!existingdiv.hasClass("tagsinput")) {
		$("#" + phtmlid).tagsInput(lobj);
	} else {
		existingdiv.remove();
		$("#" + phtmlid).tagsInput(lobj);
	}
};

// Expand side nav
$( '.expand' ).on( 'click', function(e) {
	e.preventDefault();
  $(this).toggleClass('on').next('ul').toggle();
});

// Toggle code snippets
$( '.show-code' ).on( 'click', function(e) {
  $(this).toggleClass('on').next('pre').toggle();
});

// Show/Hide aside menu on mobile
$( 'aside .menu' ).on( 'click', function(e) { 
     $(this).closest('aside').toggleClass('is-open');
});

// Resize demos

function iframeResize(e) {

}

$('.desktop, .tablet, .mobile').on( 'click', function(e) {
	e.preventDefault();
  var container = $(this).closest('.nav').next('.example');
  var iframe = container.find('iframe');
  iframe.css('height', '');
  $(this).closest('.nav').find('a').removeClass('active');
  $(this).addClass('active');
  if ($(this).hasClass('desktop')) {
  	container.removeClass('mobile tablet').addClass('desktop');
	  iframe.height(iframe.contents().height());
  } else if ($(this).hasClass('tablet')) {
  	container.removeClass('mobile desktop').addClass('tablet');
	  iframe.height(iframe.contents().height());
  } else if ($(this).hasClass('mobile')) {
  	container.removeClass('tablet desktop').addClass('mobile');
	  iframe.height(iframe.contents().height());
  }
});
 
// Limit sort code to 2 numbers

$(".sort-code").keyup(function () {
    if (this.value.length == this.maxLength) {
      $(this).next('input').focus();
    }
});

// Only numbers on sort code and account number

$(".sort-code, .account-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
         // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
         // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

// Add commas to number on inputs

$('input.number').keyup(function(event) {

  // skip for arrow keys
  if(event.which >= 37 && event.which <= 40) return;
  // format number
  $(this).val(function(index, value) {
    return value
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    ;
  });
});
 

// Table expand info row 

$('.table .icon-accordion--down').on( 'click', function(e) {
  e.preventDefault();
  $(this).toggleClass('is-active').closest('tr').next('.info').toggle();
});
$('.table .close').on( 'click', function() {
  $(this).closest('tr').prev('tr').find('.icon-accordion--down').toggleClass('is-active').closest('tr').next('.info').toggle();
});

//In gridtable for show/hide data

$('.dtable  .icon-chevron-up ,.dtable  .icon-chevron-down ').on('click',function(e){
    e.preventDefault();
    if($(this).hasClass('icon-chevron-up')){
        $(this).removeClass('icon-chevron-up').addClass('icon-chevron-down');
    }else{
        $(this).removeClass('icon-chevron-down').addClass('icon-chevron-up');
    }
    $(this).toggleClass('is-active').closest('tr').next('.subrow').toggle();
});
 
// Form Help Icon

$('.form-control-help--icon').on( 'click', function(e) {
  $(this).next('.form-control-help--text').toggle();
});
 
 //Accordion arrows

$('.collapse').on('show.bs.collapse', function(){
  $(this).parent().find(".icon").removeClass("icon-accordion--down").addClass("icon-accordion--up--white");
}).on('hide.bs.collapse', function(){
  $(this).parent().find(".icon").removeClass("icon-accordion--up--white").addClass("icon-accordion--down");
});  
// Progressive Disclosure

$('.disclosure > .form-group input').on('change', function(){
  var selector = $(this).attr('data-target');
  var $target = $(selector);
  if(this.checked) {
    if ($(this).is(':radio')){
      $(this).closest('.disclosure').find('.is-open').removeClass('is-open');
    }
    $target.addClass('is-open');
  } else {
    $target.removeClass('is-open');
  }
})

// Animations

$('.animate-fadein').on('click', function(){
  $('#anim1').removeClass('fadeIn zoomIn fadeInDown fadeInUp').addClass('fadeIn')
})

$('.animate-zoomin').on('click', function(){
  $('#anim1').removeClass('fadeIn zoomIn fadeInDown fadeInUp').addClass('zoomIn')
})

$('.animate-fadeindown').on('click', function(){
  $('#anim1').removeClass('fadeIn zoomIn fadeInDown fadeInUp').addClass('fadeInDown')
})

$('.animate-fadeinup').on('click', function(){
  $('#anim1').removeClass('fadeIn zoomIn fadeInDown fadeInUp').addClass('fadeInUp')
})

// Amination Demo

$('.addrow').on('click', function(){
  var now = new Date();
  var dateformat = (now.getDate() + 1) + "/" + ("0" + (now.getMonth() + 1)).slice(-2) + "/" + now.getFullYear();
  var nameArray = [ 'Bill Gates', 'Elon Musk', 'Melissa Meyer', 'Sergey Brin', 'Jeff Bezos', 'Mark Zuckerberg'];
  var name = nameArray[Math.floor(Math.random() * nameArray.length)];
  var amount = Number(Math.floor(Math.random() * 100000000000) / 100).toLocaleString('en');
  var account = Math.floor(Math.random() * 10000000);
  $('#aminexample').find('th:first-child').append('<div class="loading with-dimmer"></div>');
  setTimeout(function(){
    $('#aminexample').find('.loading').remove();
    $('#aminexample').find('#btlremove').remove();
    $('#aminexample > tbody:last-child').append('<tr><td class="animate zoomIn">' + name + '</td><td class="animate zoomIn">' + dateformat + '</td><td class="animate zoomIn">' + account + '</td><td class="animate zoomIn">£'+ amount +'</td></tr>');
  }, 1000);
})

/*  sidebar functions */ 
function disableOther( button ) {
    /*
    if( button !== 'showLeft' ) {
        classie.toggle( showLeft, 'disabled' );
    }
    if( button !== 'showRight' ) {
        classie.toggle( showRight, 'disabled' );
    }
    if( button !== 'showTop' ) {
        classie.toggle( showTop, 'disabled' );
    }
    if( button !== 'showBottom' ) {
        classie.toggle( showBottom, 'disabled' );
    }
    if( button !== 'showLeftPush' ) {
        classie.toggle( showLeftPush, 'disabled' );
    }
    if( button !== 'showRightPush' ) {
        classie.toggle( showRightPush, 'disabled' );
    }
    */
}
		
 









