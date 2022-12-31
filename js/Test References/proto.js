/** @format */

setAddres(
	R,
	results[0].formatted_address,
	results[0].geometry.location.lat(),
	results[0].geometry.location.lng()
);

map.setCenter(R.location);
var marker = new google.maps.Marker({
	position: results[0].geometry.location,
	title: 'point A',
	label: notatio,
	map: map,
});
var infoWindow = new google.maps.InfoWindow({
	content: `<h4>Address ${notatio}</h4>
							<p>${results[0].formatted_address}</p>`,
});
marker.addListener('mouseover', function () {
	infoWindow.open(map, marker);
	setTimeout(function () {
		infoWindow.close(map, marker);
	}, 1000);
});


const image = {
	url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
	// This marker is 20 pixels wide by 32 pixels high.
	size: new google.maps.Size(20, 32),
	// The origin for this image is (0, 0).
	origin: new google.maps.Point(0, 0),
	// The anchor for this image is the base of the flagpole at (0, 32).
	anchor: new google.maps.Point(0, 32),
  };




  const image2 = {
	url: "https://www.iconpacks.net/icons/2/free-location-map-icon-2956-thumb.png",
	// This marker is 20 pixels wide by 32 pixels high.
	size: new google.maps.Size(20, 32),
	// The origin for this image is (0, 0).
	origin: new google.maps.Point(0, 0),
	// The anchor for this image is the base of the flagpole at (0, 32).
	anchor: new google.maps.Point(0, 32),
  };




  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  const shape = {
	coords: [1, 1, 1, 20, 18, 20, 18, 1],
	type: "poly",
  };

				// var marker = new google.maps.Marker({
				// 	position: position,
				// 	map: map,
				// 	// title: 'New Marker test',
				// 	// icon:{
				// 	// 	path: 'https://www.iconpacks.net/icons/2/free-location-map-icon-2956-thumb.png',
				// 	// 	scale: 1,
				// 	// },
				// });

				// var infoWindow = new google.maps.InfoWindow({
				// 	content: '<h3>Test Marker</h3>',
				// });
				// marker.addListener('click', function () {
				// 	infoWindow.open(map, marker);
				// });
