var globalQuakes // For testing in the browser console.

$( document ).ready(function() {
// Data source: see http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
var earthquakeAPI = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
// Can pass lat and long params:
earthquakeAPI = 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=35.541&maxlatitude=42.350&minlongitude=-109.808&maxlongitude=-101.283'
/* var earthquakeAPI = "http://www.billyzacsmith.com/earthquakes/test-data/test-partial.geojson"; */

var markerSize = 15
// Set width and height to match the pixel dimensions of the map image
var width = 800
var height = 800

var now = Date.now()
var oneMonth = 2678374909 // Approximately one month in milliseconds.
var now = now = Date.now()

var mapBoundNorth = 42.350 // just above Colorado
var mapBoundSouth = 35.541 // just below Colorado
var mapBoundEast = -101.283 // just east of Colorado
var mapBoundWest = -109.808 // just west of Colorado

var mapLat = function(lat) {
	var yCoord = lat
	yCoord = yCoord - mapBoundNorth // translate
	yCoord = yCoord * -1 // flip
	yCoord = yCoord * (height/(mapBoundNorth - mapBoundSouth)) // scale
	yCoord = Math.abs(yCoord) // remove negative sign to avoid -0
	yCoord = Math.round(yCoord) // round to get a nice integer to pass to the map
	return yCoord
}

var mapLong = function(long) {
	var xCoord = long
	xCoord = xCoord + Math.abs(mapBoundWest) // translate
	xCoord = xCoord * (width/(mapBoundEast - mapBoundWest)) // scale
	xCoord = Math.abs(xCoord) // remove negative sign to avoid -0
	xCoord = Math.round(xCoord) // round to get a nice integer to pass to the map
	return xCoord
}

// Prepare the canvas
var $canvas = $("canvas")
var ctx = $canvas[0].getContext("2d")

// Make the width of the canvas the width and height specified above.
$("canvas").attr("width", width)
$("canvas").attr("height", height)

// Set the colors of the markers
ctx.fillStyle = "rgba(155,0,70,0.02)"
ctx.strokeStyle = "rgba(255,0,140,0.05)"

ctx.font = "10px sans-serif"

var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function() {
	if(xhr.readyState === 4) {
		// Parse the JSON data, put it into a variable
		var quakes = JSON.parse(xhr.responseText)
		globalQuakes = quakes
		console.log(quakes.features.length)
		var counter = 0
	    for (var i=0; i<quakes.features.length; i += 1) {
				// map the lat and long coordinates to the x and y of the canvas
				var x = mapLong(quakes.features[i].geometry.coordinates[0])
				var y = mapLat(quakes.features[i].geometry.coordinates[1])
				if ((x<width) && (y<height)) {
					// For debugging -- display place name
					// ctx.fillText(quakes.features[i].properties.place, x, y)
					// ctx.fillRect(x,y,5,5)

					// USE setTimeout() TO HAVE IT ANIMATE IN
					setTimeout(function() {
						// Set marker size based on magnitude of quake
		        var r = quakes.features[i].properties.sig
		        markerSize = r*1.3
						// Draw marker
						ctx.beginPath()
						ctx.arc(x,y,markerSize,0,6.28)
						ctx.fill()
						console.log(counter)
					}, 10*counter)
					counter++
				}
				// Goal: Add the top 5 quakes to the ul in the DOM
					// For now, only show quakes with significance > 180 (whatever that means)
					// if (r > 180) {
					// 	var list = document.getElementsByClassName('quakesList')
					// 	var newItem = document.createElement('li')
					// 	newItem.innerText = quakes.features[i].properties.place
					// 	list[0].appendChild(newItem)
					// }
	    }
	} // end if block
} // end onreadystatechange function
xhr.open('GET', earthquakeAPI)
xhr.send()
}) // End ready


// NEXT: ORGANIZE LIKE THIS: PROMISES, MODULAR...
// $.get('url')
// 	.done(function(data) {
// 		var mag = $('.slider').val()
// 		drawUI(data, {
// 			"maxMagnitude": mag
// 		})
// 	})
// 	.fail(function(error) {
// 			drawFromLocalStorage()
// 	})
//
// $('.slider').on('change', function() {
// 	var mag = $('.slider').val()
// 	// Put this into a function drawFromLocalStorage()
// 	var dataFromLocalStorage = JSON.parse(localStorage.getItem('earthquakes'))
//
// 	drawUI(dataFromLocalStorage, {
// 		"maxMagnitude": mag
// 	})
// })
//
// function drawUI(data, options) {
//
// }
