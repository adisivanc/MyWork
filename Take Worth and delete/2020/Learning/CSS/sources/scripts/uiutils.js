  Apz.prototype.tabAction = function(obj) {  
    var activeTabCont = [];
    var tabobj, ulObj;
    
        var jqueryObj = $(obj);
        if ($(obj).parent().hasClass('acco')) {
            if ($(obj).parent().hasClass('acco') && !$(obj).next('div').hasClass('active')) {
                $(obj).next('div').addClass('active');
                var indx = $(obj).parent().parent().find('.acco').index($(obj).parent());
                var liObj = $(obj).parents('.tabs-ctr:first').siblings('.tabs').find('li')[indx];
                $(liObj).siblings('li').removeClass('current').attr({'aria-selected':false,'aria-expanded' : false});
                $(liObj).addClass('current');
                $(obj).addClass('current').attr({'aria-selected':true,'aria-expanded' : true});
                $(obj).parent().siblings('div').children('ul').removeClass('current');
                $(obj).parent().siblings('div').children('.active').removeClass('active');
                activeTabCont = $(obj).next('div');
            }
        }
        //for desktop
        else {
            if (!(jqueryObj).hasClass("current")) {
                jqueryObj.addClass("current").attr({'aria-selected':true,'aria-expanded' : true});
                jqueryObj.siblings('li').removeClass("current").attr({'aria-selected':false,'aria-expanded' : false});
            }
            var parentDiv = jqueryObj.parents('div.pst-tabs:first');
            if (parentDiv.hasClass('nrsp')) {
                tabobj = jqueryObj.closest('div.pst-tabs').children('div.tabcontent');
                tabobj.removeClass('active');
                activeTabCont = tabobj.eq(jqueryObj.index());
                activeTabCont.addClass('active').attr({'aria-hidden':false});
                $(activeTabCont).siblings('div').attr({'aria-hidden':true});
                //activeTabCont.remove('active').siblings("ul").attr({'aria-selected':false,'aria-expanded' : false});
                
            } else {
                tabobj = jqueryObj.closest('div.pst-tabs').children('div.tabs-ctr').children('div.acco').children('div.tabcontent');
                ulObj = jqueryObj.parent('ul:first').siblings('div.tabs-ctr').find('div.acco').children('ul');
                tabobj.removeClass('active');
                
                ulObj.removeClass('current').attr({'aria-selected':false,'aria-expanded' : false});
                activeTabCont = tabobj.eq(jqueryObj.index()); 
                activeTabCont.addClass('active').siblings("ul").addClass('current').attr({'aria-selected':true,'aria-expanded' : true});
                /**/
                /*activeTabCont.addClass('active').siblings("ul").siblings('div.tabcontent').attr({'aria-hidden':true});*/
            }
        } 
      }, Apz.prototype.equalizeColumns = function() {
		return $('.lrow.equalize').each(function() {
			var $row, collapsed, tallest;
			$row = $(this);
			tallest = 0;
			collapsed = false;
			// $row.children('*').each(function(i) {
			$row.find('.cbox-body').each(function(i) {
				var $this;
				$this = $(this);
				$this.css('minHeight', '1px');
				collapsed = $this.outerWidth() === $row.outerWidth();
				if (!collapsed) {
					if (!$this.hasClass('equal')) {
						$this.addClass('equal');
					}
					if ($this.outerHeight() > tallest) {
						tallest = $this.outerHeight();
					}
				}
			});
			if (!collapsed) {
				// return $row.children('*').css('min-height', tallest);
				return $row.find('.cbox-body').css('min-height', tallest);
			}
		});
	}, Apz.prototype.initCarousels = function() {
		var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 30,
            loop: true,
            autoplay: false,
            autoHeight: false,
        });
	}, Apz.prototype.initDraggables = function() {
		// Move the element by the amount of change in the mouse position
			var element = $('.modal-content');
	        var move = function (event) {
		        if (element.data('mouseMove')) {
		        	var changeX = event.clientX - element.data('mouseX');
		            var changeY = event.clientY - element.data('mouseY');

		            var newX = parseInt(element.css('left')) + changeX;
		            var newY = parseInt(element.css('top')) + changeY;

		            element.css('left', newX);
		            element.css('top', newY);

		            element.data('mouseX', event.clientX);
		            element.data('mouseY', event.clientY);
		        }
	        }
	        element.mousedown(function (event) {
	            element.data('mouseMove', true);
	            element.data('mouseX', event.clientX);
	            element.data('mouseY', event.clientY);
	        });
	        element.parents(':last').mouseup(function () {
	            element.data('mouseMove', false);
	        });
	        element.mouseout(move);
	        element.mousemove(move);
	}, Apz.prototype.handleMenus = function(proc) {
		if (proc.type == "PG") {
			jQuery('.vmenu ul').hide();
		}
		jQuery('.vmenu ul').children('.current').parent().show();
		jQuery('.vmenu li a').click(function() {
		var checkElement = jQuery(this).next();
		if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
			return false;
		}
		if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
			jQuery('.vmenu ul:visible').slideUp('normal');
			checkElement.slideDown('normal');
			return false;
		}
		});
	}, Apz.prototype.handleModal = function() {
		$("#myModal").css({ 'display': "block" });
		this.initDraggables();
	}, Apz.prototype.closeMenu = function() {
		$("#myModal").css({ 'display': "none" });
	}, Apz.prototype.handleLov = function() {
		jQuery("#lovModal").hide();
		jQuery("#lovwindow").hide();
		jQuery("#lovtoggle").show();
	}, Apz.prototype.handlePopupMenu = function(elm) {
		var menuObj = $(elm).closest("li").find("ul");
		// // Reset Previous seted css values
		menuObj.css("top", "");
		menuObj.css("bottom", "");
		menuObj.css("left", "");
		menuObj.css("right", "");
		var elmheight = $(elm).parent().height();
		var menuOffset = menuObj.offset();
		var menuHeight = menuObj.height();
		var menuWidth = menuObj.width();
		var parent;
		if ($("#page-body").find(menuObj).length > 0) {
			parent = $("#page-body");
		} else if ($("#footer").find(menuObj).length > 0) {
			parent = $("#footer");
		} else if ($("#header").find(menuObj).length > 0) {
			parent = $("#header");
		} else {
			// parent = $("#sidebar");
		}
		if (parent != undefined) {
			var parentoffset = parent.offset();
			var parentheight = parent.height();
			var parentwidth = parent.width();
			if ((menuOffset.top + menuHeight) > parentheight) {
				menuObj.css("top", "auto");
				menuObj.css("bottom", elmheight + "px");
			}
			if ((menuOffset.left + menuWidth) > parentwidth) {
				menuObj.css("left", "auto");
				menuObj.css("right", "0px");
			}
		}
	}, Apz.prototype.init = function(type) {
		// // handles modal dialogs
		this.handleModal();
		// handles tabs
		this.handleMenus(type);
		// // handle LOV
		this.handleLov();
		// // Inti carousel
		this.initCarousels();
		// inti Calender
		this.handleCalendar();
		// inti Controls
		this.initControls();
		// // init Modal Draggables
		this.initDraggables();
		/////Sidebar push for open condition on page load
		this.handleSidebarOpen();
		//this.initDropdownWithInput(element_dropdownwithinput_1_dropdown_list);

		$(document).bind('keydown', function(e) {
			if (e.which == 27 && jQuery("#lovwindow").css("display") != "none") {
				jQuery("#lovModal").toggle(0);
				jQuery("#lovwindow").slideToggle(200);
				e.stopPropagation();
			}
			if (e.which == 13 && jQuery("#lovwindow").css("display") != "none") {
				if (e.target.id == "idFilter") {
					$(".icon-search").parent().trigger("click");
					e.stopPropagation();
				}
			}
		});
		$(".addedAuderoCM").click(function(event) {
			var id = this.id;
			var obj = this.scrMetaData.elmsMap[id].contextmenuid;
			var contxtId = obj + "_main_div";
			this.handleContextMenu(contxtId, event); // // APZFIX
		});
		var headerObj = document.getElementById('header');
		if (headerObj) {
			headerObj.onclick = function(event) {
				this.handleHeader(event);
			}
		}
	}, Apz.prototype.handleContextMenu = function(id, event) {
		if (id != ""){
			if (!this.isNull($("#" + id)[0])) {
				var sldrHeight = 0;
				var elm = $("#" + id);
				if ($("#page-body").find(elm).length > 0) {
					parent = $("#page-body");
				} else if ($("#footer").find(elm).length > 0) {
					parent = $("#footer");
				} else if ($("#header").find(elm).length > 0) {
					parent = $("#header");
				}
				var hdrHeight = jQuery('#header').height();
				if (this.isNull(hdrHeight)) {
					hdrHeight = 0;
				}
				if ($("#sidebar").is(':visible')) {
					var sldrHeight = jQuery('#sidebar').width();
					if (this.isNull(sldrHeight)) {
						sldrHeight = 0;
					}
				}
				if (parent != undefined) {
					elm.css("top", "auto");
					elm.css("right", "auto");
					elm.css("bottom", "auto");
					elm.css("left", "auto");
					var parentHeight = parent.height();
					var parentWidth = parent.width();
					var posY = event.pageY - hdrHeight;
					var posX = event.pageX - sldrHeight;
					if (elm.outerHeight() > (parentHeight - posY)) {
						elm.css('bottom', (parentHeight - posY) + 'px');
					} else {
						elm.css('top', posY + "px");
					}
					if (elm.outerWidth() > (parentWidth - posX)) {
						elm.css('right', (parentWidth - posX) + 'px');
					} else {
						elm.css('left', posX + "px");
					}
				}
			}
		}
	}, Apz.prototype.handleHeader = function(event) {
		var divObj = document.getElementById("header");
		if (divObj) {
			var nodes = divObj.getElementsByTagName('*');
			for (var k = 0; k < nodes.length; k++) {
				tagType = nodes[k].tagName.toLowerCase();
				if (tagType == "div" || tagType == "ul" || tagType == "li") {
					event.stopPropagation();
				}
			}
		}
	}, Apz.prototype.handleCalendar = function(){
		this.dateformat = this.handleDateFormat();
		this.datetimeformat = this.handleDateTimeFormat();
		this.timeformat = this.handleTimeFormat();
	}, Apz.prototype.handleDateFormat = function() {
		var userfrmt = this.dateFormat;
		userfrmt = userfrmt.toLowerCase();
		if (userfrmt.indexOf("yyyy") > -1) {
			userfrmt = userfrmt.replace("yyyy", "yy");
		} else {
			userfrmt = userfrmt.replace("yy", "y");
		}
		userfrmt = userfrmt.replace("mmmm", "MM");
		userfrmt = userfrmt.replace("mmm", "M");
		if (userfrmt.indexOf("dddd") > -1) {
			userfrmt = userfrmt.replace("dddd", "DD");
		} else if (userfrmt.indexOf("ddd") > -1) {
			userfrmt = userfrmt.replace("ddd", "D");
		}
		return userfrmt;
	}, Apz.prototype.handleDateTimeFormat = function() {
		var userfrmt = this.dateTimeFormat;
		var str = [];
		var timeIndex = userfrmt.indexOf("h") > -1 ? userfrmt.indexOf("h")
				: userfrmt.indexOf("H");
		if (timeIndex > -1) {
			str[0] = userfrmt.substring(0, timeIndex).trim();
			str[1] = userfrmt.substring(timeIndex).trim();
		} else {
			str[0] = userfrmt.trim();
			str[1] = "";
		}
		str[0] = str[0].toLowerCase();
		if (str[0].indexOf("yyyy") > -1) {
			str[0] = str[0].replace("yyyy", "yy");
		} else {
			str[0] = str[0].replace("yy", "y");
		}
		str[0] = str[0].replace("mmmm", "MM");
		str[0] = str[0].replace("mmm", "M");
		str[1] = str[1].replace("mm", "ii");
		str[1] = str[1].replace("m", "i");
		str[1] = str[1].replace("tt", "A");
		userfrmt = str[0].concat("  ");
		userfrmt = userfrmt.concat(str[1]);
		userfrmt = userfrmt.replace("tt", "a");
		userfrmt = userfrmt.replace("t", "a");
		userfrmt = userfrmt.replace("TT", "A");
		userfrmt = userfrmt.replace("T", "A");
		if (userfrmt.indexOf("dddd") > -1) {
			userfrmt = userfrmt.replace("dddd", "DD");
		} else if (userfrmt.indexOf("ddd") > -1) {
			userfrmt = userfrmt.replace("ddd", "D");
		}
		return userfrmt.trim();
	}, Apz.prototype.handleTimeFormat = function() {
		var userfrmt = this.timeFormat;
		userfrmt = userfrmt.replace("mm", "ii");
		userfrmt = userfrmt.replace("m", "i");
		userfrmt = userfrmt.replace("tt", "A");
		return userfrmt;
	}, Apz.prototype.initControls = function() {
		var noOfElms, elms;

		var inits = this.scrMetaData.uiInits;

		if (inits != undefined) {
			// // Tags init
			elms = inits.tag;
			if (elms != undefined) {
				noOfElms = elms.length;
				for (var e = 0; e < noOfElms; e++) {
					var tagObj = elms[e];
					this.initTags(tagObj[0], tagObj[1]);
				}
			}
			// // Dates init
			elms = inits.date;
			if (elms != undefined) {
				noOfElms = elms.length;
				for (var e = 0; e < noOfElms; e++) {
					var dateObj = elms[e];
					this.initDates(dateObj[0], dateObj[1], dateObj[2], dateObj[3],
							dateObj[4], dateObj[5], dateObj[6], dateObj[7], dateObj[8],
							dateObj[9], dateObj[10], dateObj[11], dateObj[12], dateObj[13]);
				}
			}
			// // Dropdowns init
			elms = inits.dropDown;
			if (elms != undefined) {
				noOfElms = elms.length;
				for (var e = 0; e < noOfElms; e++) {
					var dropdownObj = elms[e];
					/*this.initMobiscrollDropdowns(dropdownObj[0], dropdownObj[1], dropdownObj[2],
							dropdownObj[3], dropdownObj[4], dropdownObj[5], dropdownObj[6],
							dropdownObj[7]);*/
					var variation = dropdownObj[7];
					if (variation == "APPZILLONLOOK"){
						this.dropdownApz(dropdownObj[0]);
					} else if (variation == "WITHCHECKBOX"){
						this.dropdownCheckbox(dropdownObj[0]);
					} else if (variation == "WITHSUBLEVELS"){
						this.dropdownMultitiered(dropdownObj[0]);
					} else if (variation == "MULTISELECT"){
						this.dropdownCheckbox(dropdownObj[0]);
					} else if (variation == "AUTOCOMPLETE" || variation == "AUTOCOMPLETEWITHMS"){
						this.dropdownAutocomplete(dropdownObj[0]);
					} 
				}
			}
			// // Image and Text init
			elms = inits.imageText;
			if (elms != undefined) {
				noOfElms = elms.length;
				for (var e = 0; e < noOfElms; e++) {
					var imgtxt = elms[e];
					this.initImgTexts(imgtxt[0], imgtxt[1], imgtxt[2],
							imgtxt[3], imgtxt[4]);
				}
			}
			// // Checkbox init
			elms = inits.checkBox;
			if (elms != undefined) {
				noOfElms = elms.length;
				for (var e = 0; e < noOfElms; e++) {
					var checkboxObj = elms[e];
					this.initCheckboxs(checkboxObj[0], checkboxObj[1]);
				}
			}
			// // List init
			elms = inits.list;
			if (elms != undefined) {
				noOfElms = elms.length;
				for (var e = 0; e < noOfElms; e++) {
					var listObj = elms[e];
					this.initLists(listObj[0], listObj[1], listObj[2], listObj[3],
							listObj[4], listObj[5], listObj[6], listObj[7], listObj[8],
							listObj[9], listObj[10], listObj[11], listObj[12], listObj[13],
							listObj[14], listObj[15], listObj[16], listObj[17], listObj[18]);
				}
			}
			// // Treelist init
			elms = inits.treeList;
			if (elms != undefined) {
				noOfElms = elms.length;
				for (var e = 0; e < noOfElms; e++) {
					var treelistObj = elms[e];
					this.initTreeLists(treelistObj[0], treelistObj[1], treelistObj[2]);
				}
			}
			// // Table init
			elms = inits.table;
			if (elms != undefined) {
				noOfElms = elms.length;
				for (var e = 0; e < noOfElms; e++) {
					var tableObj = elms[e];
					this.initTables(tableObj[0], tableObj[1], tableObj[2], tableObj[3],
							tableObj[4]);
				}
			}

			// context menu init
			elms = inits.contextMenu;
			if (elms != undefined) {
				noOfElms = elms.length;
				for (var e = 0; e < noOfElms; e++) {
					var contextmenuObj = elms[e];
					this.initContextMenu(contextmenuObj[0], contextmenuObj[1]);
				}
			}
		
			/// dropdown with input init
			elms = inits.dropdownWithInput;
			if (elms != undefined) {
				noOfElms = elms.length;
				for (var e = 0; e < noOfElms; e++) {
					var dropdownObj = elms[e];
					if ($("#"+dropdownObj[0]).find('.dropdown-list').length != 0) {
						var dropdownListId = $("#"+dropdownObj[0]).find('.dropdown-list')[0].id;
						this.initDropdownWithInput(dropdownObj[0], dropdownListId);
					}
				}
			}
		}
	}, Apz.prototype.initContextMenu = function(contextId, targetId) {
		var doubleClicked = false;
		if (contextId != "") {
			$("#" +contextId).on("contextmenu", function (e) {
				if($("#"+targetId).hasClass("context-open")){
					doubleClicked = true;
				} else {
					doubleClicked = false;
				}
				if(doubleClicked == false) {
			      e.preventDefault(); // To prevent the default context menu.
			      var windowHeight = $(window).height()/2;
			      var windowWidth = $(window).width()/2;
			    //When user click on bottom-left part of window
			    if(e.clientY > windowHeight && e.clientX <= windowWidth) {
			      $("#" + targetId).css("left", e.clientX);
			      $("#" + targetId).css("bottom", $(window).height()-e.clientY);
			      $("#" + targetId).css("right", "auto");
			      $("#" + targetId).css("top", "auto");
			    } else if(e.clientY > windowHeight && e.clientX > windowWidth) {
			      //When user click on bottom-right part of window
			      $("#" + targetId).css("right", $(window).width()-e.clientX);
			      $("#" + targetId).css("bottom", $(window).height()-e.clientY);
			      $("#" + targetId).css("left", "auto");
			      $("#" + targetId).css("top", "auto");
			    } else if(e.clientY <= windowHeight && e.clientX <= windowWidth) {
			      //When user click on top-left part of window
			      $("#" + targetId).css("left", e.clientX);
			      $("#" + targetId).css("top", e.clientY);
			      $("#" + targetId).css("right", "auto");
			      $("#" + targetId).css("bottom", "auto");
			    } else {
			       //When user click on top-right part of window
			      $("#" + targetId).css("right", $(window).width()-e.clientX);
			      $("#" + targetId).css("top", e.clientY);
			      $("#" + targetId).css("left", "auto");
			      $("#" + targetId).css("bottom", "auto");
			    }
			    $("#" + targetId).fadeIn(500, apz.focusContextOut(contextId, targetId));
			      $("#"+targetId).addClass("context-open");
			    } else {
			      e.preventDefault();
			      $("#" + targetId).fadeOut(500);
			      $("#"+targetId).removeClass("context-open");
			    }
			    $('html').on('click', function(event) {
			    	e.preventDefault();
				    $("#" + targetId).fadeOut(500);
				    $("#"+targetId).removeClass("context-open");
			    });
			    $('.context-open').not($("#"+targetId)).each(function(){
					$(this).removeClass('context-open').css('display','none');
			    });
			});
		}
	}, Apz.prototype.focusContextOut = function(contextId, targetId) {
		$('#' + contextId).on("click", function () {
	      $("#" + targetId).fadeOut(500);
	      $('#' + contextId).off("click");
	      $("#"+targetId).removeClass("context-open");           
	    });
	}, Apz.prototype.initTags = function(id, parentPlaceholder) {
		if (id != "") {
			var existingdiv = $("#" + id).next();
			var objPlaceholder = "add a tag";
			if (!this.isNull(parentPlaceholder)) {
				objPlaceholder = parentPlaceholder;
			}
			$("#" + id).attr('inputtype', 'tags');
			var obj = {
				'defaultText' : objPlaceholder
				/*onChange : function() {
					apz.data.tagsDataInit(id);
				}*/
			};
			if (!existingdiv.hasClass("tagsinput")) {
				$("#" + id).tagsInput(obj);
			} else {
				existingdiv.remove();
				$("#" + id).tagsInput(obj);
			}
			tagClass = $("#" + id).attr('class');
			$("#" + id + "_tag").addClass(tagClass);
			tagTooltip = $("#" + id).attr('data-title');
			$("#" + id + "_tag").attr('data-title', tagTooltip);
			tagTitle = $("#" + id).attr('title');
			$("#" + id + "_tag").attr('title', tagTitle);
		}
	}, Apz.prototype.initMobiscrollDropdowns = function(id, autoComp, style, parentDisplay, parentMode,closeOnSel, multisel, parentGroup) {
		if (id != "") {
			var existingelem = $("#" + id).prev();
			if (existingelem.prop("tagName") == "INPUT") {
				existingelem.remove();
			}
			if (autoComp == "Y") {
				this.autocomplete(id, style, display);
			} else {
				var obj = {
					theme : style.toLowerCase(),
					display : parentDisplay.toLowerCase(),
					mode : parentMode.toLowerCase(),
					closeOnSelect : closeOnSel == "Y" ? true : false,
					multiSelect : multisel == "Y" ? true : false,
					group : parentGroup == "Y" ? true : false,
				}
				$("#" + id).mobiscroll().select(obj);
			}
			var atrribStatus = $("#" + id).attr("disabled");
			if (typeof atrribStatus !== typeof undefined && atrribStatus !== false) {
				if ($("#" + id + "_" + "dummy").length) {
					$("#" + id + "_" + "dummy").attr('disabled', 'disabled');
				}
			} else {
				if ($("#" + id + "_" + "dummy").length) {
					$("#" + id + "_" + "dummy").removeAttr('disabled', 'disabled');
					$("#" + id + "_" + "dummy").removeAttr('enabled', 'enabled');
				}
			}
		}
	}, Apz.prototype.autocomplete = function(id, style, parentDisplay) {
		var debounce, optionscontent, filtered, options = [], // // read options
		// from ui dropdown
		query = '';
		if (id != "") {
			allOptions = $("#" + id).children();
			for (i = 0; i < allOptions.length; i++) {
				options[i] = {
					description : allOptions[i].innerHTML,
					value : allOptions[i].value
				};
			}
			optionscontent = $.map(options, function(val, i) {
				return {
					text : '<div class="selectoption" data-code="' + val.value
							+ '"><div class="selectoption-name">' + val.description
							+ '</div></div>',
					value : val.value
				};
			});
			filtered = optionscontent;
			$("#" + id)
				.mobiscroll()
				.select(
					{
						theme : style.toLowerCase(),
						data : filtered,
						display : parentDisplay.toLowerCase(),
						layout : 'fixed',
						showLabel : false,
						height : 50,
						onMarkupReady : function(markup, inst) {
							markup.addClass('selectoptions');
							$(
								'<div style="padding:.5em"><input id="'+ id+ '_filter" class="md-filter-input" tabindex="0"'
									+ 'placeholder="Type to filter..."/></div>').prependTo($('.dwcc', markup))
									.on('keydown', function(e) {e.stopPropagation();})
									.on('keyup',function(e) {
										var that = $('input', this);
										clearTimeout(debounce);
										debounce = setTimeout(function() {
											query = that.val();
											filtered = $.grep(optionscontent,function(val) {
												return (val.text+ ', ' + val.value).match(new RegExp(query,'ig'));
											});
											inst.settings.data = filtered.length ? filtered : [ {
												text : 'No results',
												value : ''
											} ];
											inst.settings.parseValue(inst.settings.data[0].value);
											inst.refresh();
										}, 500);
									});
								},
						onBeforeShow : function(inst) {
							inst.settings.data = optionscontent;
							inst.refresh();
						},
						onSelect : function(v, inst) {
							$("#" + id + '_dummy').val(
								$(v).find('.selectoption-name').text());
						},
						onValueTap : function(item, inst) {
							var text = item.find('.selectoption-name').text();
							$("#" + id + '_filter').val(text);
						},
						onInit : function() {
							var v = $("#" + id + '_dummy').val();
							$("#" + id + '_dummy').val(
								$(v).find('.selectoption-name').text());
						}
					});
		}
	}, Apz.prototype.initCheckboxs = function(id, indeterminval) {
		if (id != "") {
			$("#" + id).prop("indeterminate", true);
		}
	}, Apz.prototype.initImgTexts = function(id, style, parentDisplay, closeOnSel, ppreset) {
		var obj = {
			theme : style.toLowerCase(),
			display : parentDisplay.toLowerCase(),
			closeOnSelect : closeOnSel == "Y" ? true : false
		}
		var domObj = "";
		if (id != "") {
			domObj = $("#" + id);
		}
		if (domObj.children().length) {
			domObj.mobiscroll().image(obj);
		}
		try {
			var prevelm = domObj.prev();
			if (domObj.hasClass("showspace")) {
				prevelm.addClass("showspace");
			}
		} catch (e) {
		}
	}, Apz.prototype.initDates = function(id, dataTyp, parentDisplay, style, parentPreset, parentMode, parentMinDate, parentMaxDate, closeOnSel,
		 multiSel, parentStartYear, parentEndYear,parentRangePick, secInputId, parentMultiInput) {
		var lcontrols = new Array();
		var objDateFormat = this.dateformat;
		var objTimeFormat = this.timeformat;
		var initid = id;
		if (dataTyp == "DATETIME") {
			var datetimeform = this.datetimeformat;
			var timeformstart = datetimeform.indexOf("h") > -1 ? datetimeform
					.indexOf("h") : datetimeform.indexOf("H");
			if (timeformstart != -1) {
				objDateFormat = datetimeform.substr(0, (timeformstart - 1));
				objTimeFormat = datetimeform.substr(timeformstart);
			} else {
				objDateFormat = datetimeform;
				objTimeFormat = "";
			}
		}
		var present = new Date();
		var previous = new Date((present.getFullYear() - 1), present.getMonth(),
				present.getDate());
		var next = new Date((present.getFullYear() + 1), present.getMonth(),
				present.getDate());
		var objMinDate = null;
		if (parentMinDate == "TODAY") {
			objMinDate = present;
		} else if (parentMinDate != "") {
			objMinDate = Date.parse(parentMinDate);
		}
		var objMaxDate = null;
		if (parentMaxDate == "TODAY") {
			objMaxDate = present;
		} else if (parentMaxDate != "") {
			objMaxDate = Date.parse(parentMaxDate);
		}
		var objPreSet = parentPreset;
		var obj = {
			theme : style.toLowerCase(),
			display : parentDisplay.toLowerCase(),
			mode : parentMode.toLowerCase(),
			closeOnSelect : closeOnSel == "Y" ? true : false,
			minDate : objMinDate,
			maxDate : objMaxDate,
			multiSelect : multiSel == "Y" ? true : false,
			dateFormat : objDateFormat,
			timeFormat : objTimeFormat,
			showOnFocus : true,
			showOnTap : true
		}
		if (parentStartYear != "") {
			obj.startYear = parentStartYear;
		}
		if (parentEndYear != "") {
			obj.endYear = parentEndYear;
		}
		var readonly = false;
		var disabled = false;
		var secinputreadonly = false;
		var secinputdisabled = false;
		var secondObj = "";
		if (secInputId != "") {
			secondObj = $("#" + secInputId)[0];
		}
		if (initid != "") {
			if (this.ranges.indexOf(initid) < 0) {
				readonly = $("#" + initid)[0].readOnly;
				disabled = $("#" + initid)[0].disabled;
				if ((dataTyp == "DATE" || dataTyp == "DATETIME")
						&& (parentPreset == "CALENDAR" || parentPreset == "DATE"
								|| parentPreset == "CALENDAR_DATE"
								|| parentPreset == "CALENDAR_DATETIME" || parentPreset == "CALENDAR_TIME")) {
					if (parentPreset == "CALENDAR") {
						lcontrols = [ 'calendar' ];
					} else if (parentPreset == "DATE") {
						lcontrols = [ 'date' ];
					} else if (parentPreset == "CALENDAR_DATE") {
						lcontrols = [ 'calendar', 'date' ];
					} else if (parentPreset == "CALENDAR_DATETIME") {
						lcontrols = [ 'calendar', 'date', 'time' ];
					} else if (parentPreset == "CALENDAR_TIME") {
						lcontrols = [ 'calendar', 'time' ];
					}
					objPreSet = "calendar";
					if (parentRangePick == "Y") {
						if (parentMultiInput == "Y" && secondObj != undefined) {
							if ($.mobiscroll.instances[secInputId] != undefined) {
								$("#" + secInputId).mobiscroll("destroy");
							}
							secinputreadonly = secondObj.readOnly;
							secinputdisabled = secondObj.disabled;
							$("#" + initid).mobiscroll().rangepicker($.extend(obj, {
								preset : objPreSet,
								endInput : "#" + secInputId,
								controls : lcontrols
							})).off('.dw').prop('readonly', false);
							$(secondObj).off('.dw').prop('readonly', false);
							this.ranges.push(secInputId);
							this.rangesmap[secInputId] = id;
						} else {
							$("#" + initid).mobiscroll().rangepicker($.extend(obj, {
								preset : objPreSet,
								controls : lcontrols
							})).off('.dw').prop('readonly', false);
						}
					} else {
						$("#" + initid).mobiscroll($.extend(obj, {
							preset : objPreSet,
							controls : lcontrols
						})).off('.dw').prop('readonly', false);
					}
				} else if (dataTyp == "DATETIME" && parentPreset == "DATETIME") {
					if (parentRangePick == "Y") {
						if (parentMultiInput == "Y" && secondObj != undefined) {
							if ($.mobiscroll.instances[secInputId] != undefined) {
								$("#" + secInputId).mobiscroll("destroy");
							}
							secinputreadonly = secondObj.readOnly;
							secinputdisabled = secondObj.disabled;
							$("#" + initid).mobiscroll().rangepicker($.extend(obj, {
								endInput : "#" + secInputId,
								controls : [ 'date', 'time' ],
							})).off('.dw').prop('readonly', false);
							$(secondObj).off('.dw').prop('readonly', false);
							this.ranges.push(secInputId);
							this.rangesmap[secInputId] = id;
						} else {
							$("#" + initid).mobiscroll().rangepicker($.extend(obj, {
								controls : [ 'date', 'time' ],
							})).off('.dw').prop('readonly', false);
						}
					} else {
						$("#" + initid).mobiscroll().datetime(obj).off('.dw').prop('readonly',
								false);
					}
				} else if (dataTyp == "TIME") {
					if (parentRangePick == "Y") {
						if (parentMultiInput == "Y" && secondObj != undefined) {
							if ($.mobiscroll.instances[secInputId] != undefined) {
								$("#" + secInputId).mobiscroll("destroy");
							}
							secinputreadonly = secondObj.readOnly;
							secinputdisabled = secondObj.disabled;
							$("#" + initid).mobiscroll().rangepicker({
								theme : style.toLowerCase(),
								endInput : "#" + secInputId,
								display : parentDisplay.toLowerCase(),
								controls : [ 'time' ],
								timeFormat : objTimeFormat,
								mode : parentMode.toLowerCase()
							}).prop('readonly', false);
							$(secondObj).prop('readonly', false);
							this.ranges.push(secInputId);
							this.rangesmap[secInputId] = id;
						} else {
							$("#" + initid).mobiscroll().rangepicker({
								theme : style.toLowerCase(),
								display : parentDisplay.toLowerCase(),
								controls : [ 'time' ],
								timeFormat : objTimeFormat,
								mode : parentMode.toLowerCase()
							}).prop('readonly', false);
						}
					} else {
						$("#" + initid).mobiscroll().time({
							theme : style.toLowerCase(),
							display : parentDisplay.toLowerCase(),
							timeFormat : objTimeFormat,
							mode : parentMode.toLowerCase()
						}).prop('readonly', false);
					}
				} else {
					if (parentRangePick == "Y") {
						if (parentMultiInput == "Y" && secondObj != undefined) {
							if ($.mobiscroll.instances[secInputId] != undefined) {
								$("#" + secInputId).mobiscroll("destroy");
							}
							secinputreadonly = secondObj.readOnly;
							secinputdisabled = secondObj.disabled;
							$("#" + initid).mobiscroll().rangepicker($.extend(obj, {
								endInput : "#" + secInputId,
								preset : parentPreset
							})).off('.dw').prop('readonly', false);
							$(secondObj).off('.dw').prop('readonly', false);
							this.ranges.push(secInputId);
							this.rangesmap[secInputId] = id;
						} else {
							$("#" + initid).mobiscroll().rangepicker($.extend(obj, {
								preset : parentPreset,
							})).off('.dw').prop('readonly', false);
						}
					} else {
						$("#" + initid).mobiscroll($.extend(obj, {
							preset : parentPreset
						})).off('.dw').prop('readonly', false);
					}
				}
				if (readonly) {
					$("#" + initid)[0].readOnly = true;
				} else if (disabled) {
					$("#" + initid)[0].disabled = true;
				}
				if (secinputreadonly) {
					secondObj.readOnly = true;
				} else if (secinputdisabled) {
					secondObj.disabled = true;
				}
			}
		}
	}, Apz.prototype.showCalendar = function(elmId, dataTyp, rangePicker, multiInput,secInputId) {
		if (elmId != "") {
			if (($("#" + elmId).attr("disabled") == undefined)
				&& ($("#" + elmId).attr("readonly") == undefined)) {
				var objVal = $("#" + elmId).val();
				var origId = elmId;
				var objFunction = "setDate", functionParam = objVal;
				var secondIdVal = "", ranges, objFormat;
				if (dataTyp == "DATE") {
					objFormat = this.dateformat;
				} else if (dataTyp == "DATETIME") {
					objFormat = this.datetimeformat;
				} else if (dataTyp == "TIME") {
					objFormat = this.timeformat;
				}
				if (rangePicker == "Y") {
					var date1, date2;
					objFunction = "setValue";
					if (multiInput == "Y" && secInputId != "") {
						secondIdVal = $("#" + secInputId).val();
						date1 = $.mobiscroll.parseDate(objFormat, objVal);
						date2 = $.mobiscroll.parseDate(objFormat, secondIdVal);
						if (date1 != null && date2 != null) {
							functionParam = [ date1, date2 ];
						} else {
							functionParam = objVal == "" ? new Date() : $.mobiscroll.parseDate(
						objFormat, objVal);
						}
					} else {
						ranges = objVal.split(" - ");
						if (ranges.length > 1) {
							date1 = $.mobiscroll.parseDate(objFormat, ranges[0]);
							date2 = $.mobiscroll.parseDate(objFormat, ranges[1]);
							functionParam = [ date1, date2 ];
						} else {
							functionParam = objVal == "" ? new Date() : $.mobiscroll.parseDate(
						objFormat, objVal);
						}
					}
				} else if (this.ranges.indexOf(elmId) >= 0) {
					var date1, date2;
					objFunction = "setValue";
					var lfirstdateid = this.rangesmap[origId];
					elmId = lfirstdateid;
					if (lfirstdateid) {
						lfirstdateval = $("#" + lfirstdateid).val();
					}
					date1 = $.mobiscroll.parseDate(objFormat, lfirstdateval);
					date2 = $.mobiscroll.parseDate(objFormat, objVal);
					if (date1 != null && date2 != null) {
						functionParam = [ date1, date2 ];
					}
				} else {
					functionParam = objVal == "" ? new Date() : $.mobiscroll.parseDate(
						objFormat, objVal);
				}
				if (functionParam != "") {
					$("#" + elmId).mobiscroll(objFunction, functionParam);
					$("#" + elmId).mobiscroll('show');
				}
			}
		}
	}, Apz.prototype.initRow = function(tableId, pobj) {    // // On Row Click initilize Mobiscroll Controls
		var containerData = this.scrMetaData.containersMap[tableId];
		var noOfElms = containerData.elms.length;
		var noOfRows = containerData.pagerows;
		for (var c = 0; c < noOfElms; c++) {
			var currElm = containerData.elms[c];
			var currRecHtmlId = currElm.id + "_" + (noOfRows - 1);
			if ((currElm.type == "INPUTBOX")
					&& (currElm.dtyp == "DATE" || currElm.dtyp == "DATETIME" || currElm.dtyp == "TIME")) {
				this.initDates(currElm.id, currRecHtmlId);
			} else if (currElm.type == "TAGS") {
				this.initTags(currElm.id, currRecHtmlId);
			} else if (currElm.contextmenuid != undefined && currElm.contextmenuid != "") {
				this.initContextMenu(currElm.id, currRecHtmlId);
			} else if (currElm.type == "DROPDOWN" && currElm.lookandfeel == "GENERIC") {
				this.initDropdowns(currElm.id, currRecHtmlId);
			} else if (currElm.type == "IMAGEANDTEXT") {
				this.initImgTexts(currElm.id, currRecHtmlId);
			} else if (currElm.type == "FILEBROWSER") { // //APZFILEBROWSE
				var obj = document.getElementById(currRecHtmlId);
				obj.nextElementSibling.innerHTML = "";
			}
		}
	}, Apz.prototype.handleCarousels = function(slides, index) {
		var tagType = "";
		var carDivLength = slides.length;
		for (var i = 0; i < carDivLength; i++) {
			var currDiv = slides[i];
			var lnodes = currDiv.getElementsByTagName('*');
			for (var k = 0; k < lnodes.length; k++) {
				tagType = lnodes[k].tagName.toLowerCase();
				if (tagType == "input" || tagType == "select"
						|| tagType == "textarea" || tagType == "span"
						|| tagType == "a") {
					if (index == i) {
						$(lnodes[k]).css("visibility", "visible");
					} else {
						$(lnodes[k]).css("visibility", "hidden");
					}
				}
			}
		}
	}, Apz.prototype.toggleModal = function(element) {
		if (element != "") {
			var modalId = "#" + element;
			var divLength = $($(modalId).find('div')).length;
			var children = $(modalId).children();
			for (var i = 0; i < divLength;) {
				var childClass = $(children).attr('class');
				var childId = $(children).attr('id');
				if ((childClass == "modalwindow") && (childId != "")) {
					jQuery(modalId).toggle(0);
					jQuery("#" + childId).slideToggle(200);
					return;
				} else {
					children = $(children).children();
					i++;
				}
			}
		}
	}, Apz.prototype.handleSidebar = function(obj) {
		var sideBar = document.getElementById('sidebar');
		var showBackdrop = document.getElementById('backdrop');
		$(this).toggleClass('active');
		if (!$(sideBar).hasClass('apz-nav-open')){
		$(sideBar).addClass('apz-nav-open');
		} else {
			$(showBackdrop).removeClass('in');
			$(sideBar).removeClass('apz-nav-open');
		} 
		if (($(sideBar).hasClass('apz-nav-toggle-push')) || ($(sideBar).hasClass('apz-nav-static-push'))) {       
			var body = document.body;
			if ($(sideBar).hasClass('apz-nav-left') && $(sideBar).hasClass('apz-nav-toggle-push')) {
				$(body).toggleClass('apz-nav-push apz-nav-push-toright');
			} else if ($(sideBar).hasClass('apz-nav-right') && $(sideBar).hasClass('apz-nav-toggle-push')) {
				$(body).toggleClass('apz-nav-push apz-nav-push-toleft');
			} else if ($(sideBar).hasClass('apz-nav-left') && $(sideBar).hasClass('apz-nav-static-push')) {
				$(body).toggleClass('apz-nav-push apz-nav-stay-left');
			} else if ($(sideBar).hasClass('apz-nav-right') && $(sideBar).hasClass('apz-nav-static-push')) {
				$(body).toggleClass('apz-nav-push apz-nav-stay-right');
			}
		}
		if (!$(body).hasClass('apz-nav-push') && $(sideBar).hasClass('apz-nav-open')) {
			$(showBackdrop).addClass('in');
		}
		// //Readjust Height and Resize Tables..
		this.readjustHeight();
		// appzillon.util.resizeTables();
	}, Apz.prototype.handleSidebarOpen = function() {
		var body = document.body;
		var sideBarCheck = $(body).find("#sidebar")[0];
		if ((sideBarCheck != "") && (sideBarCheck != undefined)){
			var sideBar = document.getElementById('sidebar');
			if ($(sideBar).hasClass('apz-nav-open')) {
				if (($(sideBar).hasClass('apz-nav-static-push'))) {       
					if ($(sideBar).hasClass('apz-nav-left') && $(sideBar).hasClass('apz-nav-static-push')) {
						$(body).toggleClass('apz-nav-push apz-nav-stay-left');
					} else if ($(sideBar).hasClass('apz-nav-right') && $(sideBar).hasClass('apz-nav-static-push')) {
						$(body).toggleClass('apz-nav-push apz-nav-stay-right');
					}
				}
			}
		}
	}, Apz.prototype.handleStepperclick = function (pobj) {  
    		var inpVal = $(pobj).parent().siblings().find('input').val();
      		inpVal = parseInt(inpVal); 
    		if(!isNaN(inpVal)){
			if($(pobj).hasClass('stpr-add')) {
          			$(pobj).parent().siblings().find('input').val(inpVal+1);  
        		} else {
          			$(pobj).parent().siblings().find('input').val(inpVal-1);
        		}
    		} else{
        		alert('Please enter valid Number');
    		}  
	}, Apz.prototype.initDropdownWithInput = function (dropdownId, dropdownListId) {
		var elmId = dropdownId + "_div";		
		apz.dropdownApz(elmId);
		$("#"+dropdownListId).children().children().on('click',function(){
			var index = dropdownListId.lastIndexOf("dropdown_list");
			var inputBoxId = dropdownListId.substring(0,index)+"input";
	       		if($(this).val() != "default"){
				$('#'+inputBoxId).val($(this).text());
	       		}else{
	      			$('#'+inputBoxId).text('');
	       		}
    	});

	}, Apz.prototype.sortAction = function(container, element, btnElm) {
		var sortType = false;
		if ($(btnElm).hasClass("sort-asc")) {
			sortType = false;
		} else if ($(btnElm).hasClass("sort-dec")) {
			sortType = true;
		}
		this.sortRecords(container, element, sortType);
		$(btnElm).toggleClass("sort-asc");
		$(btnElm).toggleClass("sort-dec");
   	}, Apz.prototype.dropdownAutocomplete = function(elmId) {
		$("#"+elmId).select2({
  			placeholder: "Please Select", width: '100%'
		});
	}, Apz.prototype.dropdownCheckbox = function(elmId) {
		$('#'+ elmId).on( 'click', function() {
			apz.dropdownToggle(elmId);
		  $("#"+elmId).find('input').on( 'change', function(e) {
		    var txtbox = $(this).closest('.dropdown').find('.dropdown-text');
		    var allVals = [];
		    $(this).closest('.dropdown-list').find(':checked').each(function() {
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

	}, Apz.prototype.dropdownMultitiered = function(elmId) {
		$('#'+ elmId).on( 'click', function(e) {
			  e.preventDefault();
			  e.stopPropagation();
			  apz.dropdownToggle(elmId); 
			$("#"+elmId).find('li:not(.is-disabled)').on( 'click', function(e) {
				var newtext = this.innerText;
			    $(this).siblings().removeClass('is-selected');
			    $(this).addClass('is-selected').closest('#'+elmId).find('.dropdown-text').val(newtext);
			    if ($.validator) {
			      this.find('input').valid();
			    }
			});
			$("#"+elmId).find('.menu-expand').on( 'click', function(e) {
				e.preventDefault();
			    e.stopPropagation();
			    this.toggleClass('is-expanded').closest('li').next('ul').toggle();
			});
			  // Don't show hover background on multi-tiered plus icon
			  $("#"+elmId).find('li:not( .is-disabled ) .menu-expand').hover( function(e) {
			    this.closest('li').toggleClass('unhover')
			  });
		});
	}, Apz.prototype.dropdownToggle = function(elmId) {
		$(".is-open").not($("#"+elmId)).each(function(){
			if($(this).hasClass('is-open')){
				$(this).removeClass('is-open');
			}
		});
		$('#'+ elmId).toggleClass('is-open');
		// Hide on click outside
		var clickoutside = function() {
			$("#"+elmId).removeClass('is-open');
			setTimeout(function(){
				$(elmId).removeClass('is-above');
			}, 300);
		};
		$('html').on('click', function(event) {
			if ($(event.target).parents('#'+elmId).length==0) {
				clickoutside();
				$(elmId).unbind(event);
				$(elmId).unbind( "click", clickoutside );
			}
		});
	}, Apz.prototype.dropdownApz = function(elmId){
		$('#'+ elmId).on( 'click', function(e) {
			  e.preventDefault();
			  e.stopPropagation();
			  apz.dropdownToggle(elmId); 
			$("#"+elmId).find('li:not(.is-disabled)').on( 'click', function(e) {
				var newtext = this.innerText;
			    $(this).siblings().removeClass('is-selected');
			    $(this).addClass('is-selected').closest('#'+elmId).find('.dropdown-text').val(newtext);
			});
		});
	}
// // UTILITY FUNCTIONS ENDS // //
