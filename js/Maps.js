/** @format */

function getDistanceFromLatLonInmiles(latlng1, latlng2) {
	function deg2rad(deg) {
		return deg * (Math.PI / 180);
	}
	let lat1 = latlng1.lat;
	let lon1 = latlng1.lng;
	let lat2 = latlng2.lat();
	let lon2 = latlng2.lng();

	var R = 3963; // Radius of the earth in miles
	var dLat = (lat2 - lat1) * (Math.PI / 180);
	var dLon = (lon2 - lon1) * (Math.PI / 180);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

async function codeAddress(address) {
	// var address = document.getElementById(ID).value;
	var R = {
		formatted_address: '',
		location: '',
		state: '',
		city: '',
	};
	if (address) {
		try {
			await geocoder.geocode({ address: address }, function (results, status) {
				if (status == 'OK') {
					R.location = results[0].geometry.location;
					R.formatted_address = results[0].formatted_address;
					let address_array = results[0].address_components;
					// R.state = address_array.find(
					// 	(element) => element.types[0] == 'administrative_area_level_1'
					// ).long_name;
					// R.city = address_array.find((element) => element.types[0] == 'locality').long_name;

					for (let i = 0; i < address_array.length; i++) {
						if (address_array[i].types[0] == 'administrative_area_level_1') {
							R.state = address_array[i].long_name;
							return R.state;
						}
						if (address_array[i].types[0] == 'locality ') {
							R.city = address_array[i].long_name;
							return R.state;
						}
					}
				}
			});
		} catch (err) {
			console.error('Error ocurre trayng to geocode the: ' + ': ' + address + '>>\nError\n' + err);
		}
	}
	return R;
}
function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
	directionsService.route(
		{
			origin: pointA,
			destination: pointB,
			avoidTolls: true,
			avoidHighways: false,
			travelMode: google.maps.TravelMode.DRIVING,
		},
		function (response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		}
	);
}
function RouteCalculateDisplay(obj) {
	let DD = [directionsDisplay0, directionsDisplay1, directionsDisplay2];

	for (let i = 0; i < obj[0].address.length - 1; i++) {
		let pointA = obj[0].address[i].location;
		let pointB = obj[0].address[i + 1].location;
		directionsService.route(
			{
				origin: pointA,
				destination: pointB,
				avoidTolls: true,
				avoidHighways: false,
				travelMode: google.maps.TravelMode.DRIVING,
			},
			function (response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					DD[i].setDirections(response);
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			}
		);
	}
}

function dayMode() {
	return [];
}
function nigthMode() {
	return [
		{ elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
		{ elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
		{ elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
		{
			featureType: 'administrative.locality',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#d59563' }],
		},
		{
			featureType: 'poi',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#d59563' }],
		},
		{
			featureType: 'poi.park',
			elementType: 'geometry',
			stylers: [{ color: '#263c3f' }],
		},
		{
			featureType: 'poi.park',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#6b9a76' }],
		},
		{
			featureType: 'road',
			elementType: 'geometry',
			stylers: [{ color: '#38414e' }],
		},
		{
			featureType: 'road',
			elementType: 'geometry.stroke',
			stylers: [{ color: '#212a37' }],
		},
		{
			featureType: 'road',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#9ca5b3' }],
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry',
			stylers: [{ color: '#746855' }],
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry.stroke',
			stylers: [{ color: '#1f2835' }],
		},
		{
			featureType: 'road.highway',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#f3d19c' }],
		},
		{
			featureType: 'transit',
			elementType: 'geometry',
			stylers: [{ color: '#2f3948' }],
		},
		{
			featureType: 'transit.station',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#d59563' }],
		},
		{
			featureType: 'water',
			elementType: 'geometry',
			stylers: [{ color: '#17263c' }],
		},
		{
			featureType: 'water',
			elementType: 'labels.text.fill',
			stylers: [{ color: '#515c6d' }],
		},
		{
			featureType: 'water',
			elementType: 'labels.text.stroke',
			stylers: [{ color: '#17263c' }],
		},
	];
	return s;
}
