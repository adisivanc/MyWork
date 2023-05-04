(function ($) {  
    //alert('entered');
    
             // for disabled acccordion
            $(document).ready(function(e){  
               // alert('this accordion');
                var objDis = $('div.acc-dis') ; 
                //var objPar = $(obj).parents('ul:first');
                //var objgrPar = $(objPar).parent(); 
                    if(!$(objDis).hasClass('acc-dis')){
                    $('div.acc-dis').children('ul').attr('aria-disabled',false);
                }
                else{
                    $('div.acc-dis').children('ul').attr('aria-disabled',false);
                }
                
            });
    //for disabled collapsible
            $(document).ready(function(e){  
                       // alert('this collapsible');
                        var objDis = $('div.coll-dis') ; 
                        //var objPar = $(obj).parents('ul:first');
                        //var objgrPar = $(objPar).parent(); 
                            if(!$(objDis).hasClass('coll-dis')){
                            $('div.coll-dis').children('ul').attr('aria-disabled',false);
                        }
                        else{
                            $('div.coll-dis').children('ul').attr('aria-disabled',false);
                        }

                    });  
    $.fn.slideUpTransition = function(e) {
        return this.each(function() {
            var obj = e.target;
            var allAccordians = "";
            var parentobject = $(obj).parent().parent().parent();
            var grparent = $(parentobject).parent();
            var toggleObj = $(obj).parent().parent().find(".tls a"); 
            var togglesvgObj = $(obj).parent().parent().find(".tls a svg"); 
            if (obj.tagName == "LI") {
                toggleObj = $(obj).parent().find(".tls a");
                togglesvgObj = $(obj).parent().find(".tls a svg");
                parentobject = $(obj).parent();
            } else if (obj.tagName == "svg" || obj.tagName == "h4") {
                toggleObj = $(obj).parent().parent().parent().find(".tls a");
                togglesvgObj = $(obj).parent().parent().parent().find(".tls a svg");
                parentobject = $(obj).parent().parent().parent();
            } else if (obj.tagName == "a") {
                toggleObj = $(obj).parent().parent().find(".tls a");
                togglesvgObj = $(obj).parent().parent().find(".tls a svg");
                parentobject = $(obj).parent().parent();  
            }
            var grparent = $(parentobject).parent();
            if (!$(parentobject).hasClass(" ttl")){
			     var el = $(parentobject).children(".height-transition-hidden");
                allAccordians = $(parentobject).siblings();
		      } else {
			     var el = $(grparent).children(".height-transition-hidden");
			     allAccordians = $(grparent).siblings();
		      }
            if( $(parentobject).hasClass("acco") || $(grparent).hasClass("acco") || $(parentobject).hasClass('.acc-hd')) {
                allAccordians.find(".collapse").removeClass("collapse").addClass("expand").find(".acc-hd").removeClass("acc-hd");
           	    allAccordians.find(".height-transition").addClass("height-transition-hidden").removeClass('htou')/*.siblings('ul').attr({'aria-selected': false,'aria-expanded': false })*/;
                //$(allAccordians.find('. .tls a svg')).html('<use xlink:href="styles/themes/appzillon/img/symbol-defs.svg#icon-chevron-down"></use>');
               // $(allAccordians.find('. .tls a svg')).removeClass('icon-chevron-up').addClass('icon-chevron-down');
            }
            if ($(toggleObj).hasClass("collapse")) {
			     $(toggleObj).removeClass("collapse").addClass("expand");
			     
		      } else {
			     $(toggleObj).removeClass("expand").addClass("collapse");
			     
		      }
           /* if ($(togglesvgObj).hasClass("icon-chevron-down")) {
			     $(togglesvgObj).removeClass("icon-chevron-down").addClass("icon-chevron-up");
			     
            if(parentobject.hasClass('ttl')){
                parentobject.attr('aria-selected', false);
            }
		      } else {
			    $(togglesvgObj).removeClass("icon-chevron-up").addClass("icon-chevron-down");
                $(togglesvgObj).html('<use xlink:href="styles/themes/appzillon/img/symbol-defs.svg#icon-chevron-down"></use>');
			     
		      }*/ 
            //for title
            var objPar = $(obj).parents('ul:first');
            //if($(objPar).hasClass('ttl')){ 
                if($(objPar).siblings('div.htou').attr("aria-hidden") == "true") {
                    $(objPar).attr('aria-selected', true).attr('aria-controls', objParid );       
                }
            //}
            else{ 
                $(objPar).attr({'aria-selected':false, 'aria-expanded':false ,'aria-controls': objParid }); 
            }
            var $el = $(this);
            var objPar = $(obj).parents('ul:first');
            var objParid = objPar[0].id;
            $el.css("max-height", "0");
            $el.addClass("height-transition-hidden").removeClass('htou');
            $el.attr('aria-hidden', true)/*.attr('aria-expanded',true)*/; 
            $el.attr('aria-labelledby','#'+objParid);
        });
    };

    $.fn.slideDownTransition = function(e) {
        return this.each(function() {
            var obj = e.target;
            var allAccordians = "";
            var parentobject = $(obj).parent().parent().parent();
            var grparent = $(parentobject).parent();
            var toggleObj = $(obj).parent().parent().find(".tls a");
            var togglesvgObj = $(obj).parent().parent().find(".tls a svg");
            if (obj.tagName == "LI") {
                toggleObj = $(obj).parent().find(".tls a");
                togglesvgObj = $(obj).parent().find(".tls a svg");
                
            } else if (obj.tagName == "svg" || obj.tagName == "h4") {
                toggleObj = $(obj).parent().parent().parent().find(".tls a");
                togglesvgObj = $(obj).parent().parent().parent().find(".tls a svg");
                
            } else if (obj.tagName == "a") {
                toggleObj = $(obj).parent().parent().find(".tls a");
                togglesvgObj = $(obj).parent().parent().find(".tls a svg");
                
            }
            if (!$(parentobject).hasClass("ttl")){
			     var el = $(parentobject).children(".height-transition-hidden");
                allAccordians = $(parentobject).siblings();
		      } else {
			     var el = $(grparent).children(".height-transition-hidden");
			     allAccordians = $(grparent).siblings(); 
		      }
            if( $(parentobject).hasClass("acco") || $(grparent).hasClass("acco") || $(parentobject).hasClass('.acc-hd')) {
                allAccordians.find(".collapse").removeClass("collapse").addClass("expand").find(".acc-hd").removeClass("acc-hd");
           	    allAccordians.find(".height-transition").addClass("height-transition-hidden").removeClass('htou');
                allAccordians.find(".height-transition").addClass('shownone').attr('aria-hidden', true); 
                //var accoLbl =$(($(allAccordians).find(".height-transition").addClass('shownone').attr('aria-hidden', true)) == true);
                if(($(allAccordians).find(".height-transition").addClass('shownone').attr('aria-hidden')) === 'true' ){ 
                    $(allAccordians).children('ul').attr({'aria-selected': false,'aria-expanded': false });
                } 
                
            }
            if ($(toggleObj).hasClass("collapse")) {
			     $(toggleObj).removeClass("collapse").addClass("expand"); 
		      } else {
			     $(toggleObj).removeClass("expand").addClass("collapse"); 
		      } 
            
            
            //for title
            var $el = $(this); 
            var objPar = $(obj).parents('ul:first');
            var objParid = objPar[0].id;
            
            $el.removeClass("height-transition-hidden shownone").addClass('htou');
            $el.attr('aria-hidden',false);
            $el.attr('role','tab');
            $el.attr('aria-labelledby',"#"+objParid );
            // temporarily make visible to get the size
            $el.css("max-height", "none"); 
            
            var objPar = $(obj).parents('ul:first');
            //if($(objPar).hasClass('ttl')){ 
                if($(objPar).siblings('div.htou').attr("aria-hidden") == "true") {
                    
                    $(objPar).attr({'aria-selected': 'false' , 'aria-expanded':'false', 'aria-controls' : objParid }) ;       
                }
            //}
            else{ 
                $(objPar).attr({'aria-selected': true,'aria-expanded':true,'aria-controls': objParid  }); 
            }
            
            
            var height = $el.outerHeight();

            // reset to 0 then animate with small delay
            $el.css("max-height", "0");

            setTimeout(function() {
                $el.css({
                    "max-height": height
                });
            }, 0.5);
            setTimeout(function() {
                $el.css({
                    "max-height": ' '
                });
            }, 0.5);
        });
    };
})(jQuery);