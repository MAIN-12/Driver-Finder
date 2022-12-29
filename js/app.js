/** @format */
/**
 * @name Driver_Finder_app
 * @by MAIN12 LLC
 * @date 05-29-1994
 **/

function include(file) {
	var script = document.createElement('script');
	script.src = file;
	script.type = 'text/javascript';
	script.defer = true;
	document.getElementsByTagName('head').item(0).appendChild(script);
}

async function ADDRESS() {


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

async function routeSetUp() {
	let Address = [
		new address('address1', 'A'),
		new address('address2', 'B'),
		new address('address3', 'C'),
		new address('schoolAddress', 'Sc'),
	];

	Address = Address.filter((Data) => Data.input !== '');
	for (const add of Address) {
		var A = await codeAddress(add.input);
		add.location = A.location;
		add.formatted = A.formatted_address;
		add.state = A.state;
		add.city = A.city;
	}

	let routeName = document.getElementById('fname').value;
	let monitor = document.getElementById('MonitorCheck').checked;
	let pickUpAM = document.getElementById('pickUpAM').value;
	let dropOffAM = document.getElementById('dropOffAM').value;
	let pickUpPM = document.getElementById('pickUpPM').value;
	let dropOffPM = document.getElementById('dropOffPM').value;

	let sPickUp = document.getElementById('sPickUp').value;
	let sDropOff = document.getElementById('sDropOff').value;
	let sDays = '';

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
			Address[0].state, //State
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
			Address[0].state, //State
			'', //City
			Address
		)
	);

	return RouteArray;
}

function getConfigFile() {
	let config = {
		key: 1234,
		bid: 'M122201',
		user: {
			Name: 'Juan',
			Surname: 'Botero',
		},
		busines: {
			name: 'MAIN12 LLC',
			id: 'M122201',
		},

		status: document.getElementById('inactiveCheck').checked,
	};
	return config;
}

let submitFlag = false;
async function submitFun() {
	document.getElementById('loadder').style.display = 'block';

	let newRoute = await routeSetUp();
    
    let settings=getConfigFile();

	console.log('New Route', newRoute);

	// state = await ADDRESS();

	let url =
		'https://script.google.com/macros/s/AKfycbwXtBXQJNEJF8veBWDU1Q3nu5C06rG9TyNqGP9JR1ZiPqUgRRRw3eY2lIKULHUXyJr2/exec';
	url += `?key=${settings.key}`;
	url += `&bid=${settings.bid}`;
	url += settings.status ? `` : '&active=true';
	url += `&state=${newRoute[0].state}`;
	url += newRoute[0].monitor ? `&monitor=true` : '';
	// url += `&latlong1=`;
	// url += `&monitor=true`;
	makeAPICall(url);
	// printResults((Drivers = testData()));
	submitFlag = false;
}
