var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var W = canvas.width = 300;
var H = canvas.height = 300;
var radius = H*0.45;
$(".secondPart").hide();


var ticks = [];
for(var i=0; i<=360; i+=5) {
	ticks.push(i);
}

function toRadians (angle) {
  	return angle * (Math.PI / 180);
}

function calcPoints(){
  var points = [];
  for(var i=0; i<ticks.length; i++) {
    points.push([
      W/2 + Math.cos(toRadians(ticks[i])) * radius,
      H/2 + Math.sin(toRadians(ticks[i])) * radius
    ]);
  }
  return(points);
}

function drawHeart(dashL, dashO){
  context.beginPath();
  context.lineWidth = 1.2;
  context.setLineDash([dashL,dashO]);
  context.strokeStyle = '#ec3c3f';

  //layer 1 - partial contentric circle

	//first half
	var offset = 18;
	for(var i=0; i<=18; i++) {
	    context.moveTo(points[i][0], points[i][1]);
    	context.lineTo(points[i+offset][0], points[i+offset][1]);
	}

  //second half
	for(var i=36; i<=54; i++) {
	    context.moveTo(points[i][0], points[i][1]);
    	context.lineTo(points[i+offset][0], points[i+offset][1]);
	}

  //layer 2 - partial cardioid

  //first half
  offset = 20;
  for(var i=18; i<36; i++) {
    context.moveTo(points[i][0], points[i][1]);
    context.lineTo(points[i+offset][0], points[i+offset][1]);

    offset++;
  }

  //second half
  offset = 20;
  for(var i=54; i>36; i--) {
    context.moveTo(points[i][0], points[i][1]);
    context.lineTo(points[i-offset][0], points[i-offset][1]);

    offset++;
  }

  context.stroke();
  context.closePath();
}

var points = calcPoints();
//drawHeart(2);
update();

var dashLength = 100;
var dashOffset = 100;
function update() {
  if(dashLength < 450){
    dashLength += 2;
    context.clearRect(0,0,W,H);
    drawHeart(dashLength, dashOffset);
  }
  window.requestAnimationFrame(update);
}

function myMove() {
  var elem = document.getElementById("myAnimation");
  var pos = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
}

function shake(){
    var times = 10;
    var duration = 200;
    for (var i = 0; i < times; i++)
    $('.wrapper').animate({
        left: (i % 2 === 0 ? "-" : "+") + "=50",
        top: (i % 2 === 0 ? "-" : "+") + "=50"
    }, duration);
}

function myMove() {
    console.log("clicked");
    $("#ini").hide();
    $(".secondPart").show();
    $('.wrapper').hide();
    setTimeout(function () {
        $('.wrapper').show();

    }, 2000);



    setTimeout(shake, 2000);







}
