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
