$(function() {
  var doubleClicked = false;
  $('#testimg').on("contextmenu", function(event){initContmenu(event,"testimg","cmnu-ctr")});
  $('#testimg1').on("contextmenu", function(event){initContmenu(event,"testimg1","cmnu-ctr1")});
    $('#testimg2').on("contextmenu", function(event){initContmenu(event,"testimg2","cmnu-ctr2")});
  function initContmenu(e,pid,ppid) {
      this.targetId
   if(doubleClicked == false) {
    e.preventDefault(); // To prevent the default context menu.
    var windowHeight = $(window).height()/2;
    var windowWidth = $(window).width()/2;
    //When user click on bottom-left part of window
    if(e.clientY > windowHeight && e.clientX <= windowWidth) {
      $("#"+ppid).css("left", e.clientX);
      $("#"+ppid).css("bottom", $(window).height()-e.clientY);
      $("#"+ppid).css("right", "auto");
      $("#"+ppid).css("top", "auto");
    } else if(e.clientY > windowHeight && e.clientX > windowWidth) {
      //When user click on bottom-right part of window
      $("#"+ppid).css("right", $(window).width()-e.clientX);
      $("#"+ppid).css("bottom", $(window).height()-e.clientY);
      $("#"+ppid).css("left", "auto");
      $("#"+ppid).css("top", "auto");
    } else if(e.clientY <= windowHeight && e.clientX <= windowWidth) {
      //When user click on top-left part of window
      $("#"+ppid).css("left", e.clientX);
      $("#"+ppid).css("top", e.clientY);
      $("#"+ppid).css("right", "auto");
     $("#"+ppid).css("bottom", "auto");
    } else {
       //When user click on top-right part of window
      $("#"+ppid).css("right", $(window).width()-e.clientX);
      $("#"+ppid).css("top", e.clientY);
      $("#"+ppid).css("left", "auto");
      $("#"+ppid).css("bottom", "auto");
    }
    $("#"+ppid).fadeIn(500, FocusContextOut(pid,ppid));
      doubleClicked = true;
    } else {
      e.preventDefault();
      doubleClicked = false;
      $("#"+ppid).fadeOut(500);
    }
  }
 
  $('html').not('.cmnu-ctr').on('click', function(event) {
     
      if ($(event.target).parents('.cmnu-ctr').length==0) {
        doubleClicked = false;
     $('.cmnu-ctr').css('display','none');
      }
  });  
  function FocusContextOut(pid,ppid) {
    $('#'+pid).on("click", function () {
      doubleClicked = false; 
      $("#"+ppid).fadeOut(500);
      $('#'+pid).off("click");           
    });
  }
});