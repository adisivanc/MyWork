function gradient(id, level)
{
	var box = document.getElementById(id);
	box.style.opacity = level;
	box.style.MozOpacity = level;
	box.style.KhtmlOpacity = level;
	box.style.filter = "alpha(opacity=" + level * 100 + ")";
	box.style.display="block";
	return;
}
function fadein(id) 
{
	var level = 0;
	while(level <= 1)
	{
		setTimeout( "gradient('" + id + "'," + level + ")", (level* 1000) + 10);
		level += 0.01;
	}
}

function openbox1(formtitle, fadin)
{
	  var box = document.getElementById('box1'); 
	  document.getElementById('shadowing1').style.display='block';
	
	  var btitle = document.getElementById('boxtitle1');
	  btitle.innerHTML = formtitle;
	  if(fadin)
	  {
		 gradient("box1", 0);
		 fadein("box1");
	  }
	  else
	  { 	
		box.style.display='block';
	}
	closebox2();
	closebox3();
	closebox4();
	closebox5();
	closebox6();
	closebox121();
}

function closebox1()
{
   document.getElementById('box1').style.display='none';
   document.getElementById('shadowing1').style.display='none';
}

function openbox2(formtitle, fadin)
{
	  var box = document.getElementById('box2'); 
	  document.getElementById('shadowing2').style.display='block';
	html2canvas([document.getElementById('mydiv')], {
		onrendered: function (canvas) {
		document.getElementById('canvas').appendChild(canvas);    
		document.getElementById('canvas').getElementsByTagName('canvas')[0].style.display= 'block';
		var file= dataURLtoBlob(data);
	  }
	});	
	  var btitle = document.getElementById('boxtitle2');
	  btitle.innerHTML = formtitle;
	  if(fadin)
	  {
		 gradient("box2", 0);
		 fadein("box2");
	  }
	  else
	  { 	
		box.style.display='block';
	}
	closebox1();
	closebox3();
	closebox4();
	closebox5();
	closebox6();
	closebox121();
}

function closebox2()
{
   document.getElementById('box2').style.display='none';
document.getElementById('canvas').getElementsByTagName('canvas')[0].remove();
   document.getElementById('shadowing2').style.display='none';
}


function openbox3(formtitle, fadin)
{
	  var box = document.getElementById('box3'); 
	  document.getElementById('shadowing3').style.display='block';
	
	  var btitle = document.getElementById('boxtitle3');
	  btitle.innerHTML = formtitle;
	  if(fadin)
	  {
		 gradient("box3", 0);
		 fadein("box3");
	  }
	  else
	  { 	
		box.style.display='block';
	}
	closebox1();
	closebox2();
	closebox4();
	closebox5();
	closebox6();
	closebox121();
}

function closebox3()
{
   document.getElementById('box3').style.display='none';
   document.getElementById('shadowing3').style.display='none';
}


function openbox4(formtitle, fadin)
{
	  var box = document.getElementById('box4'); 
	  document.getElementById('shadowing4').style.display='block';
	
	  var btitle = document.getElementById('boxtitle4');
	  btitle.innerHTML = formtitle;
	  if(fadin)
	  {
		 gradient("box4", 0);
		 fadein("box4");
	  }
	  else
	  { 	
		box.style.display='block';
	}
	closebox1();
	closebox2();
	closebox3();
	closebox5();
	closebox6();
	closebox121();
}

function closebox4()
{
   document.getElementById('box4').style.display='none';
   document.getElementById('shadowing4').style.display='none';
}



function openbox5(formtitle, fadin)
{
	  var box = document.getElementById('box5'); 
	  document.getElementById('shadowing5').style.display='block';
	
	  var btitle = document.getElementById('boxtitle5');
	  btitle.innerHTML = formtitle;
	  if(fadin)
	  {
		 gradient("box5", 0);
		 fadein("box5");
	  }
	  else
	  { 	
		box.style.display='block';
	}
	closebox1();
	closebox2();
	closebox3();
	closebox4();
	closebox6();
	closebox121();
}

function closebox5()
{
   document.getElementById('box5').style.display='none';
   document.getElementById('shadowing5').style.display='none';
}



function openbox6(formtitle, fadin, packageid)
{

	  var box = document.getElementById('box6'); 
	  document.getElementById('shadowing6').style.display='block';
      if(packageid == 1)
	   { 	
	  document.getElementById("seo_bronze").checked=true;
	   }
	   if(packageid == 2)
	   { 	
	  document.getElementById("seo_silver").checked=true;
	   }
	   if(packageid == 3)
	   { 	
	  document.getElementById("seo_gold").checked=true;
	   }
	  var btitle = document.getElementById('boxtitle6');
	  btitle.innerHTML = formtitle;
	  if(fadin)
	  {
		 gradient("box6", 0);
		 fadein("box6");
	  }
	  else
	  { 	
		box.style.display='block';
	}
	
}

function closebox6()
{
   document.getElementById('box6').style.display='none';
   document.getElementById('shadowing6').style.display='none';
}

function openbox121(formtitle, fadin, selectbox) {
	  var box = document.getElementById('box121'); 
	  document.getElementById('shadowing121').style.display='block';
	html2canvas([document.getElementById('mydiv')], {
		onrendered: function (canvas) {
		document.getElementById('canvas').appendChild(canvas);    
		document.getElementById('canvas').getElementsByTagName('canvas')[0].style.display= 'block';
		var file= dataURLtoBlob(data);
	  }
	});	
	  var btitle = document.getElementById('boxtitle121');
	  btitle.innerHTML = formtitle;
	  
	  document.getElementById('selectedbox').innerHTML = selectbox;
	  
	  if(fadin) {
		 gradient("box121", 0);
		 fadein("box121");
	  }
	  else
	  { 	
		box.style.display='block';
	}
	closebox1();
	closebox3();
	closebox4();
	closebox5();
	closebox6();
	closebox121();
}

function closebox121()
{
   document.getElementById('box121').style.display='none';
document.getElementById('canvas').getElementsByTagName('canvas')[0].remove();
   document.getElementById('shadowing121').style.display='none';
}