/** @format */

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
