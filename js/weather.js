$( document ).ready(function() {
    $(window).on('resize', winConstruct);
    function winConstruct(){
    	var winHeight = $(window).height();
    	var winWidth = $(window).width();
    	$("#wayBack").css({height:winHeight+"px"});
    	$("#mainContent").css({height:winHeight+"px"});
    	var mainContentWidth = $("#mainContent").width();
    	$(".bottomBanner").css({width:mainContentWidth+"px"});
    	$(".uil-ripple-css").css({left:((winWidth/2)-100)+'px',top:((winHeight/2)-100)+"px"});
    };
    winConstruct(); // loads the window sizing on launch
    
    $(".uil-ripple-css").addClass("hideMe"); // hides loading ripple from Sent It! click

/*    $(".navSpaceing li").click(function(){
    	if($(".navSpaceing li").hasClass("active")){
    		$(".navSpaceing li").removeClass("active");
    	}
    	$(this).addClass("active");
    });*/
    
    // ************************************************************
    var btnIds = ["btnHome", "btn5Day", "btnArea"];
    var contentIds = ["contenthome", "content5Day", "contentCommonArea"];
    function hideMe(){
    	for(i=0;i<=contentIds.length;i++){
    		if($("#"+contentIds[i]).hasClass('hideMe') == false){
    			$("#"+contentIds[i]).addClass('hideMe');
    		}
    	}
    }
    hideMe();
    $("#navUl li").on('click', function(){
    	hideMe();
    	var thisId = $(this).attr("id");
    	var arrayPosition = jQuery.inArray(thisId, btnIds);
    	$("#"+contentIds[arrayPosition]).removeClass('hideMe');
    });
    // ************************************************************    
    
    // ************************************************************  
    function jsonAdd(obj,today){
    	$("#content5Day .row div").empty();
    	$("#row3-1").append("Conditions");
    	$("#row4-1").append("Temp <span id='tempUnit'>&ordm;F</span>");
    	$("#row5-1").append("Wind");
    	$("#row6-1").append("Solar");
    	$("#row7-1").append("Lunar");
    	$("#row8-1").append("% Illum");
    	$("#row9-1").append("BENT/EENT");
    	$("#rowLast-6").append('<br/><button id="resetCoord" class="btn label-success" type="button">New Location</button>');
    	$("#resetCoord").on('click', function(){
        	$("#enter5Day").removeClass('hideMe');
        });
    	var dayVnight = 0;
    	if(obj.time.tempLabel[0] == "High"){var dayVnight = 0}else{var dayVnight = 1}; // changes night to day values

    	$('#locationCity').append((obj.currentobservation.name).split(",")[0]+", "+obj.currentobservation.state); // Sets the City and State header
    	
    	// ***** vv ***** Row Zero ***** vv *****
    	if(obj.data.hazard[0] == 'Hazardous Weather Outlook'){
    		var hazLen = obj.data.hazard.length;
    		var appendVal = '';
    		for(i=1;i<hazLen;i++){
    			appendVal = appendVal+obj.data.hazard[i]+"<br/>";
    		}
    		if(appendVal.length != 0){$("#ifWarn").append('<div class="col-xs-12 col-md-12"><span id="wanring">ALERT:</span><br/>'+appendVal+'</div>');}
    	};
    	// ***** ^^ ***** Row Zero ***** ^^ *****
    	// ***** vv ***** Row One ***** vv *****
    	$("#title-2").append(obj.time.startPeriodName[dayVnight]);
    	$("#title-3").append(obj.time.startPeriodName[(dayVnight+2)]);
    	$("#title-4").append(obj.time.startPeriodName[(dayVnight+4)]);
    	$("#title-5").append(obj.time.startPeriodName[(dayVnight+6)]);
    	$("#title-6").append(obj.time.startPeriodName[(dayVnight+8)]);
    	// ***** ^^ ***** Row One ***** ^^ *****
    	// ***** vv ***** Row Two ***** vv *****
    	$("#row2-2").append('<img src="'+obj.data.iconLink[dayVnight]+'"/>');
    	$("#row2-3").append('<img src="'+obj.data.iconLink[(dayVnight+2)]+'"/>');
    	$("#row2-4").append('<img src="'+obj.data.iconLink[(dayVnight+4)]+'"/>');
    	$("#row2-5").append('<img src="'+obj.data.iconLink[(dayVnight+6)]+'"/>');
    	$("#row2-6").append('<img src="'+obj.data.iconLink[(dayVnight+8)]+'"/>');
    	// ***** ^^ ***** Row Two ***** ^^ *****
    	// ***** vv ***** Row Three ***** vv *****
    	$("#row3-2").append('<span class="currentCon">'+obj.data.weather[dayVnight]+'</span>');
    	$("#row3-3").append('<span class="currentCon">'+obj.data.weather[(dayVnight+2)]+'</span>');
    	$("#row3-4").append('<span class="currentCon">'+obj.data.weather[(dayVnight+4)]+'</span>');
    	$("#row3-5").append('<span class="currentCon">'+obj.data.weather[(dayVnight+6)]+'</span>');
    	$("#row3-6").append('<span class="currentCon">'+obj.data.weather[(dayVnight+8)]+'</span>');
    	// ***** ^^ ***** Row Three ***** ^^ *****
    	// ***** vv ***** Row Four ***** vv *****
    	$("#row4-2").append('<span class="tempHighName">'+obj.time.tempLabel[dayVnight]+': </span><span class="tempHighData">'+parseInt(obj.data.temperature[dayVnight])+'</span> | <span class="tempLowName">'+obj.time.tempLabel[(dayVnight+1)]+': </span><span class="tempLowData">'+parseInt(obj.data.temperature[(dayVnight+1)])+'</span>');
    	$("#row4-3").append('<span class="tempHighName">'+obj.time.tempLabel[(dayVnight+2)]+': </span><span class="tempHighData">'+parseInt(obj.data.temperature[(dayVnight+2)])+'</span> | <span class="tempLowName">'+obj.time.tempLabel[(dayVnight+3)]+': </span><span class="tempLowData">'+parseInt(obj.data.temperature[(dayVnight+3)])+'</span>');
    	$("#row4-4").append('<span class="tempHighName">'+obj.time.tempLabel[(dayVnight+4)]+': </span><span class="tempHighData">'+parseInt(obj.data.temperature[(dayVnight+4)])+'</span> | <span class="tempLowName">'+obj.time.tempLabel[(dayVnight+5)]+': </span><span class="tempLowData">'+parseInt(obj.data.temperature[(dayVnight+5)])+'</span>');
    	$("#row4-5").append('<span class="tempHighName">'+obj.time.tempLabel[(dayVnight+6)]+': </span><span class="tempHighData">'+parseInt(obj.data.temperature[(dayVnight+6)])+'</span> | <span class="tempLowName">'+obj.time.tempLabel[(dayVnight+7)]+': </span><span class="tempLowData">'+parseInt(obj.data.temperature[(dayVnight+7)])+'</span>');
    	$("#row4-6").append('<span class="tempHighName">'+obj.time.tempLabel[(dayVnight+8)]+': </span><span class="tempHighData">'+parseInt(obj.data.temperature[(dayVnight+8)])+'</span> | <span class="tempLowName">'+obj.time.tempLabel[(dayVnight+9)]+': </span><span class="tempLowData">'+parseInt(obj.data.temperature[(dayVnight+9)])+'</span>');
    	// ***** ^^ ***** Row Four ***** ^^ *****
    	function splitIt(e){
    		var windPlace = e.indexOf("wind");
    		if(windPlace != -1){
    			var WindSpeed = e.slice((windPlace+5), ((e.indexOf("mph"))+3));
	    		var WindDir = e.slice(((e.slice(0, (windPlace-1))).lastIndexOf(" ")+1), (e.slice(0, (windPlace-1))).length);
	    		var WindText = WindDir+" "+WindSpeed;
	    		}else{var WindText = "No Data"}
    		return WindText;
    	}
    	// ***** vv ***** Row Five ***** vv *****
    	$("#row5-2").append('<span class="windData">'+splitIt(obj.data.text[dayVnight])+'</span>');
    	$("#row5-3").append('<span class="windData">'+splitIt(obj.data.text[(dayVnight+2)])+'</span>');
    	$("#row5-4").append('<span class="windData">'+splitIt(obj.data.text[(dayVnight+4)])+'</span>');
    	$("#row5-5").append('<span class="windData">'+splitIt(obj.data.text[(dayVnight+6)])+'</span>');
    	$("#row5-6").append('<span class="windData">'+splitIt(obj.data.text[(dayVnight+8)])+'</span>');
    	// ***** ^^ ***** Row Five ***** ^^ *****
    	
    	// ***** vv ***** Change Temp ***** vv *****
    	var Fdata = [$("#row4-2 .tempHighData").text(), $("#row4-2 .tempLowData").text(),$("#row4-3 .tempHighData").text(), $("#row4-3 .tempLowData").text(),$("#row4-4 .tempHighData").text(), $("#row4-4 .tempLowData").text(),$("#row4-5 .tempHighData").text(), $("#row4-5 .tempLowData").text(),$("#row4-6 .tempHighData").text(), $("#row4-6 .tempLowData").text()];
    	var Farray = ["#row4-2 .tempHighData","#row4-2 .tempLowData","#row4-3 .tempHighData","#row4-3 .tempLowData","#row4-4 .tempHighData","#row4-4 .tempLowData","#row4-5 .tempHighData","#row4-5 .tempLowData","#row4-6 .tempHighData","#row4-6 .tempLowData"];
    	//var f = $("#row4-3 .tempHighData").text();
    	$("#tempUnit").on('click', function(){
    		var tempVal = $("#tempUnit").text();
    		if(tempVal == 'ºF'){
    		$("#tempUnit").empty().append('&ordm;C');
    		// fahrenheit to celsius
    		for(i=0;i<=Fdata.length;i++){
    			var c = (Fdata[i]-32)*(5/9);
    			$(Farray[i]).text(Math.round(c));
    		}
    		}else{
    			$("#tempUnit").empty().append('&ordm;F');
    			// celsius to fahrenheit
        		for(j=0;j<=Fdata.length;j++){
        			$(Farray[j]).text(Fdata[j]);
        			}
    			}
    		
    	});
    	// ***** ^^ ***** Change Temp ***** ^^ *****
    	for(var i=0;i<5;i++){
    		sunMoonFun(i); // Runs the sun and moon data for each day
    	}
    	$(".uil-ripple-css").addClass("hideMe");
    };
    
    // *********** vv ******* Day Break Down ******** vv ********************** 
    
    // shortcuts for easier to read formulas
    var PI   = Math.PI,
	    sin  = Math.sin,
	    cos  = Math.cos,
	    tan  = Math.tan,
	    asin = Math.asin,
	    atan = Math.atan2,
	    acos = Math.acos,
	    rad  = PI / 180;
    
    var e = rad * 23.4397; // obliquity of the Earth
    
    function todayIsTheDay(i){
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!
	    var yyyy = today.getFullYear();
	    
	    var months = [
		      ["January", 31], // January
		      ["Febuary", 28], // Febuary
		      ["March", 31], // March
		      ["April", 30], // April
		      ["May", 31], // May
		      ["June", 30], // June
		      ["July", 31], // July
		      ["August", 31], // August
		      ["September", 30], // September
		      ["October", 31], // October
		      ["November", 30], // November
		      ["December", 31]  // December
		    ];
	    if((yyyy % 4 == 0) && (yyyy % 100 != 0) || (yyyy % 400 == 0)){months[1,1] = 29 }; // Correcting for leap year
	    var daysInThisYear = months[0][1]+months[1][1]+months[2][1]+months[3][1]+months[4][1]+months[5][1]+months[6][1]+months[7][1]+months[8][1]+months[9][1]+months[10][1]+months[11][1];
	    var daysSinceJan1 = 0;
	    for(m=0;m<=mm;m++){
	    	daysSinceJan1 = daysSinceJan1 + months[m][1];
	    	};
	    	
	    //var solarDeclination = cos((daysSinceJan1+10)*(360/daysInThisYear))*-23.4397;
	   // cos H = cos 90°50’.sec λ. sec δ – tan λ . tan δ	=-.018046 – .16666 =-.18471
	   // var sunRiseH = (acos(cos(rad*-90.833)*acos(rad*$('input[name="enterLat"]').val())*acos(rad*solarDeclination)-tan(rad*$('input[name="enterLat"]').val())*tan(rad*solarDeclination)))* (180 / PI);
	    
	    //var sunRiseH = (sin(-0.833)-sin($('input[name="enterLat"]').val())*sin(solarDeclination))/(cos($('input[name="enterLat"]').val())*cos(solarDeclination));
	   // var sunRiseHRad =  rad*sunRiseH;
	    //var sunRiseHacos = acos(sunRiseHRad)
	    
	   // var sunHr = Math.trunc(sunRiseH/15);
	   // var sunMin = (sunRiseH - sunHr)*60;
	    
	    //alert(sunRiseH+"\n"+sunRiseH* (180 / PI))

	    function nextfive(j){
	    	var dd2 = dd + j;
	    	var mm2 = mm;
	    	if(months[mm2][1] < dd2){
	    		mm2 = mm2 + 1;
	    		dd2 = 1;
	    		if(mm2 == 13){
	    			mm2 = 12;
	    			yyyy = yyyy + 1
	    			}
	    		}
	    	if(dd2<10) {
		        dd2='0'+dd2
		    } 
		    if(mm2<10) {
		        mm2='0'+mm2
		    }
	    	return mm2+'/'+dd2+'/'+yyyy;
	    	}

	    var days = new Object();
		    days[0] = nextfive(0);
		    days[1] = nextfive(1);
		    days[2] = nextfive(2);
		    days[3] = nextfive(3);
		    days[4] = nextfive(4);
		    days[5] = nextfive(5);
		 //   days[5] = "";// solar declination
		    
	    return days[i];
    }
    // *********** ^^ ******* Day Break Down ******** ^^ **********************
    
    // *********** vv ******* Moon Sun ******** vv ********************** 
    function sunMoonFun(i){
    	var theDay = todayIsTheDay(i);
    	alert(theDay)
    	var sunMoon = "http://api.usno.navy.mil/rstt/oneday?date="+theDay+"&coords="+$('input[name="enterLat"]').val()+","+$('input[name="enterLong"]').val()+"&tz=-6";
    	//var sunMoon = "http://api.usno.navy.mil/rstt/oneday?date=today&coords=38.55,-92.07&tz=-6";
    	var sunMoonData =  $.ajax({
    	      type: 'POST',
    	      url: sunMoon, 
    	      dataType: "text",
    	      success: function(data) {
    	    	  var obj = JSON.parse(data);
    	    	  if(obj.success == false){
    	    		  alert("Submitted Location is outside\nof the United States");
    	    		  $('input[name="enterLat"]').val("");
    	    		  $('input[name="enterLong"]').val("");
    	    	  }else{
    	    		  //alert(obj.fracillum)
				 	   $("#row8-"+(i+2)).append(obj.fracillum); // Adds moon's % illuminated
    	    	  }
    			}
    	});
    }
    //sunMoonFun(3)
    // *********** ^^ ******* Moon Sun ******** ^^ ********************** 
    
    
    
    $('#coordSubmit').on('click',function(){
    	var today = todayIsTheDay(0);
    	//For Testing Only!!!
    	//$('input[name="enterLat"]').val('38.551939');
    	//$('input[name="enterLong"]').val('-92.074526');
    	if($('input[name="enterLat"]').val() && $('input[name="enterLong"]').val() != ''){
    		$(".uil-ripple-css").removeClass("hideMe");
	    	var url = "http://forecast.weather.gov/MapClick.php?lat="+$('input[name="enterLat"]').val()+"&lon="+$('input[name="enterLong"]').val()+"&FcstType=json";
	    	var coordData =  $.ajax({
	    	      type: 'POST',
	    	      url: url, 
	    	      dataType: "text",
	    	      success: function(data) {
	    	    	  var obj = JSON.parse(data);
	    	    	  if(obj.success == false){
	    	    		  alert("Submitted Location is outside\nof the United States");
	    	    		  $('input[name="enterLat"], input[name="enterLong"]').val("");
	    	    		 // $('input[name="enterLong"]').val("");
	    	    		  $(".uil-ripple-css").addClass("hideMe");
	    	    	  }else{
	    	    	  jsonAdd(obj,today);
	    	    	  $("#jsonLook").append(data);
	    	    	  $("#enter5Day").addClass('hideMe');
	    	    	  }
	    			}
	    	});
    	}else{
    		alert("Enter Latitude and Longitude\nBefore Sending Request");
    	}
    });
    // ************************************************************   
    
});