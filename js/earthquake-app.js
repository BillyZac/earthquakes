var globalQuakes; // For testing in the browser console.


$( document ).ready(function() {


// Data source: see http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
var earthquakeAPI = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
/* var earthquakeAPI = "http://www.billyzacsmith.com/earthquakes/test-data/all_month.geojson"; */


var intViewportHeight = window.innerHeight;
var intViewportWidth = window.innerWidth;

var markerSize = 15;
var width = window.innerWidth;
var height = window.innerWidth/2;
var now = Date.now();
var oneMonth = 2678374909; // Approximately one month in milliseconds.
var now = now = Date.now();

var $canvas = $("canvas");
var ctx = $canvas[0].getContext("2d");


// Make the width of the canvas the width of the window, and the height half that. This matches the proportions of the global map.
$("canvas").attr("width", width);
$("canvas").attr("height", height);

ctx.fillStyle = "rgba(0,30,40,0.1)"; 
ctx.strokeStyle = "rgba(255,255,255,0.05)";


var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if(xhr.readyState === 4) {
		var quakes    = JSON.parse(xhr.responseText);
		globalQuakes = JSON.parse(xhr.responseText);

/*		
		// Open the quakes list
		var quakesHTML = '<ul id="quakes-list">';
		
		// For each quake, add an <li>
	    for (var i=0; i<quakes.features.length; i += 1) {
	    	if (quakes.features[i].properties.mag > maxMag) {
		    	maxMag = quakes.features[i].properties.mag;
	    	}
	        quakesHTML += quakes.features[i].properties.mag;
	        quakesHTML += '<li>Long: ';
	        quakesHTML += quakes.features[i].geometry.coordinates[0];
	        quakesHTML += ' Lat: '
	        quakesHTML += quakes.features[i].geometry.coordinates[1];
	        quakesHTML += ' Title: '
	        quakesHTML += quakes.features[i].properties.title;
			quakesHTML += '</li>';
	    } // end for loop

*/	    
	    
	    
	    for (var i=0; i<quakes.features.length; i += 1) {
	    	var x = (quakes.features[i].geometry.coordinates[0]+180) * (width/360);
			var y = (quakes.features[i].geometry.coordinates[1]+90) * (height/180);

/* 	        var then = quakes.features[i].properties.time; */
	        
	        var r = quakes.features[i].properties.sig;
	        markerSize = r/10;
	        
	        ctx.fillStyle = 'rgba(	' + r/3 + ',' + r/2 + ',' + r + ', 0.01)';

			// Draw circle	        
			ctx.beginPath();
			x = width - x;
			ctx.arc(x,y,markerSize,0,6.28);
/* 			ctx.fill();	  */
			ctx.stroke();       
	        
	    }	    
	  
	    
	    // Close the <ul>
/* 	    quakesHTML += '</ul>'; */
	    
	    // Put the quakes list on the page
/* 	    document.getElementById('quakeList').innerHTML = quakesHTML; */
				
	}; // end if block
}; // end onreadystatechange function

xhr.open('GET', earthquakeAPI);
xhr.send();

}); // End ready