/** @format */

function include(file) {
	var script = document.createElement('script');
	script.src = file;
	script.type = 'text/javascript';
	script.defer = true;
	document.getElementsByTagName('head').item(0).appendChild(script);
}

async function ADDRESS() {
	let A = ['address1', 'address2', 'address3', 'schoolAddress'];

	var L1 = await codeAddress('address1');
	var L2 = await codeAddress('address2');
	var L3 = await codeAddress('address3');
	var L4 = await codeAddress('schoolAddress');

	setTimeout(function () {
		// console.log('result PA | PB: ' + L1.location + ' | ' + L2.location);

		calculateAndDisplayRoute(directionsService, directionsDisplay, L1.location, L4.location);
	}, 1500);
	return L1.state;
}

async function makeAPICall(url) {
	const result = await fetch(url);
	result.json().then((data) => {
		printResults(data.drivers);
		document.getElementById('loadder').style.display = 'none';
	});
}

let submitFlag = false;
async function submitFun() {
	document.getElementById('loadder').style.display = 'block';

	let key = 1234;
	let bid = 'M122201';
	let routeName = document.getElementById('fname').value;
	let monitor = document.getElementById('MonitorCheck').checked;
	let includeInactive = document.getElementById('inactiveCheck').checked;

	let state = document.getElementById('state').value;

	let pickUpAM = document.getElementById('pickUpAM').value;
	let dropOffAM = document.getElementById('dropOffAM').value;
	let pickUpPM = document.getElementById('pickUpPM').value;
	let dropOffPM = document.getElementById('dropOffPM').value;

	let sPickUp = document.getElementById('sPickUp').value;
	let sDropOff = document.getElementById('sDropOff').value;
	let sDays = '';

	let Address = [
		new address('address1', 'A'),
		new address('address2', 'B'),
		new address('address3', 'C'),
		new address('schoolAddress', 'Sc'),
	];

	Address = Address.filter((Data) => Data.input !== '')
	for (const add of Address) {
        var L1 = await codeAddress(add.input);
        add.location=L1.location;
        add.formatted=L1.formatted_address;
	}

	var RouteArray = [];
	RouteArray.push(
		new route(
			routeName, //Route Name
			'Active', //Status
			'', //_MDD
			'AM', //AmPm  <==================
			'[M, T, W, Th, F]', //Days  <==================
			monitor, //Monitor
			'', //Passangers
			pickUpAM, //_PickUp <==================
			dropOffAM, //_DropOff <==================
			state, //State
			'', //City
			Address
		)
	);
	RouteArray.push(
		new route(
			routeName, //Route Name
			'Active', //Status
			'', //_MDD
			'PM', //AmPm  <==================
			'[M, T, W, Th, F]', //Days  <==================
			monitor, //Monitor
			'', //Passangers
			pickUpPM, //_PickUp <==================
			dropOffPM, //_DropOff <==================
			state, //State
			'', //City
			Address
		)
	);

	console.log('New Route', RouteArray);

	state = await ADDRESS();

	let url =
		'https://script.google.com/macros/s/AKfycbwXtBXQJNEJF8veBWDU1Q3nu5C06rG9TyNqGP9JR1ZiPqUgRRRw3eY2lIKULHUXyJr2/exec';
	url += `?key=${key}`;
	url += `&bid=${bid}`;
	url += includeInactive ? `` : '&active=true';
	url += `&state=${state}`;
	url += monitor ? `&monitor=true` : '';
	// url += `&latlong1=`;
	// url += `&monitor=true`;
	makeAPICall(url);
	// printResults((Drivers = testData()));
	submitFlag = false;
}
