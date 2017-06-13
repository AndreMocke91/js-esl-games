function turnRight()
{
	if($(".lightBox").hasClass("upfacing"))
	{
		$(".lightBox").removeClass("upfacing");
		$(".lightBox").addClass("rightfacing");
	}else

	if($(".lightBox").hasClass("rightfacing"))
	{
		$(".lightBox").removeClass("rightfacing");
		$(".lightBox").addClass("downfacing");
	}else

	if($(".lightBox").hasClass("downfacing"))
	{
		$(".lightBox").removeClass("downfacing");
		$(".lightBox").addClass("leftfacing");
	}else

	if($(".lightBox").hasClass("leftfacing"))
	{
		$(".lightBox").removeClass("leftfacing");
		$(".lightBox").addClass("upfacing");
	}	
}

function turnLeft()
{
	if($(".lightBox").hasClass("upfacing"))
	{
		$(".lightBox").removeClass("upfacing");
		$(".lightBox").addClass("leftfacing");
	}else

	if($(".lightBox").hasClass("rightfacing"))
	{
		$(".lightBox").removeClass("rightfacing");
		$(".lightBox").addClass("upfacing");
	}else

	if($(".lightBox").hasClass("downfacing"))
	{
		$(".lightBox").removeClass("downfacing");
		$(".lightBox").addClass("rightfacing");
	}else

	if($(".lightBox").hasClass("leftfacing"))
	{
		$(".lightBox").removeClass("leftfacing");
		$(".lightBox").addClass("downfacing");
	}	
}

function moveForward()
{
	if($(".lightBox").hasClass("upfacing"))
	{
		moveUp();
	}else

	if($(".lightBox").hasClass("rightfacing"))
	{
		moveRight();
	}else

	if($(".lightBox").hasClass("downfacing"))
	{
		moveDown();
	}else

	if($(".lightBox").hasClass("leftfacing"))
	{
		moveLeft();
	}

	if($("#marker").hasClass("flip"))
		$(".lightBox").addClass("flip");
	else
	{
		$(".lightBox").removeClass("flip");
	}
}

function moveRight()
{
	if(!$("#marker").hasClass("flip"))
		$( "#marker" ).addClass("flip");
	$( "#marker" ).removeClass("walker_standing");
	$( "#marker" ).addClass("walker_walking");
	$( "#marker" ).animate({
    
    left: "+=200",
   	
  }, 1000, function() {
    $( "#marker" ).removeClass("walker_walking");
	$( "#marker" ).addClass("walker_standing");
	
 	checkMove();
  });
}

function moveDown()
{
	$( "#marker" ).removeClass("walker_standing");
	$( "#marker" ).addClass("walker_walking");
	$( "#marker" ).animate({
    
    top: "+=120",
   	
  }, 1000, function() {
    $( "#marker" ).removeClass("walker_walking");
	$( "#marker" ).addClass("walker_standing");
	checkMove();
  });
}

function moveUp()
{
	$( "#marker" ).removeClass("walker_standing");
	$( "#marker" ).addClass("walker_walking");
	$( "#marker" ).animate({
    
    top: "-=120",
   	
  }, 1000, function() {
    $( "#marker" ).removeClass("walker_walking");
	$( "#marker" ).addClass("walker_standing");
	checkMove();
  });
}

function moveLeft()
{
	if($("#marker").hasClass("flip"))
		$( "#marker" ).removeClass("flip");
	$( "#marker" ).removeClass("walker_standing");
	$( "#marker" ).addClass("walker_walking");
	$( "#marker" ).animate({
    
    left: "-=200",
   	
  }, 1000, function() {
    $( "#marker" ).removeClass("walker_walking");
	$( "#marker" ).addClass("walker_standing");	
 	checkMove();
  });
}

function dropMarker()
{
	$("#marker").addClass("badLight");
	
	$( "#marker" ).delay(500).animate({    
    top: "+=1000",   	
	}, 2000, function() {
	    $( "#marker" ).removeClass("walker_walking");
		$( "#marker" ).addClass("walker_standing");		
	  });
}

// Logic checks and utils

function toggleTarget(slot)
{
	$(".slot").removeClass("target");
	$(slot).addClass("target");
}

function moveMarker(slot)
{
	var verticalDistance = $(slot).position().top - $("#marker").position().top;
	var horisontalDistance = $(slot).position().left - $("#marker").position().left;

	console.log("distance left: " + horisontalDistance);
	console.log("distance right: " + verticalDistance);

	$( "#marker" ).removeClass("walker_standing");
	$( "#marker" ).addClass("walker_walking");
	$( "#marker" ).animate({
    
    top: "+="+ verticalDistance,
    left: "+="+ horisontalDistance
   	
  }, 1000, function() {
    $( "#marker" ).removeClass("walker_walking");
	$( "#marker" ).addClass("walker_standing");
  });
}

function getMarkerSlot()
{
	$("#standingOnSlot").attr("id","");

	$.each($(".slot"), function(){
		
		if(Math.round($("#marker").position().top) === Math.round($(this).position().top))
		{			
			if(Math.round($("#marker").position().left) === Math.round($(this).position().left))
			{				
				$(this).attr("id","standingOnSlot");
				console.log(this);
			}
		}
	});
}

function checkMove()
{		
	getMarkerSlot();
	var isDestination = $("#standingOnSlot").find("img").length;
	var isTarget = $("#standingOnSlot").hasClass("target");

	if(isDestination && !isTarget)
	{
		$("#faceoverlay").removeClass();		
		frustratedface();
		$("#faceoverlay").addClass("spinner");
		//dropMarker();
	}
	else if(isDestination && isTarget){
		$("#faceoverlay").removeClass();
		gentlemanface();
	}
	else if( $("#marker").position().left > 800 || $("#marker").position().left < 0)
				{
					$("#faceoverlay").removeClass();
					lolface();
 					dropMarker();
 				}
 	else if( $("#marker").position().left > 800 || $("#marker").position().left < 0)
				{
					$("#faceoverlay").removeClass();
					frustratedface();
 					dropMarker();
 				}
 				
}