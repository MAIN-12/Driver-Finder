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
					let addArray = results[0].address_components;

					// R.state = addArray.find(
					// 	(element) => element == 'administrative_area_level_1'
					// ).long_name;
					// R.city = addArray.find(
					// 	(element) => element == 'locality'
					// ).long_name;
					// console.log('STATE: ' + R.state);

					for (let i = 0; i < addArray.length; i++) {
						if (addArray[i].types[0] == 'administrative_area_level_1') {
							R.state = addArray[i].long_name;
							return R.state;
						}
						if (addArray[i].types[0] == 'locality ') {
							R.city = addArray[i].long_name;
							return R.state;
						}
					}
				}
			});
		} catch (err) {
			console.error('Error ocurre trayng to geocode the: ' + ID + ': ' + address + '>>\nError\n' + err);
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
