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
	// let R=L1,L2

	setTimeout(function () {
		console.log('result PA | PB: ' + L1.location + ' | ' + L2.location);

		calculateAndDisplayRoute(
			directionsService,
			directionsDisplay,
			L1.location,
			L4.location
		);
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

	var RouteArray = [];
	let Address = [
		{
			id: 'address1',
			lable: 'A',
			input: document.getElementById('address1').value,
			formatted: '', //Address 1
			location: '',
		},
		{
			id: 'address2',
			lable: 'B',
			input: document.getElementById('address2').value,
			formatted: '', //Address 2
			location: '',
		},
		{
			id: 'address3',
			lable: 'C',
			input: document.getElementById('address2').value,
			formatted: '', //Address 3
			location: '',
		},
		{
			id: 'schoolAddress',
			lable: 'SC',
			input: document.getElementById('schoolAddress').value,
			formatted: '', //Address 4 (School)
			location: '',
		},
	];

	RouteArray.push(
		new route(
			routeName, //Route Name
			'Active', //Status
			'', //_MDD
			'AM', //AmPm  <==================
			'', //Days  <==================
			monitor, //Monitor
			'', //Passangers
			pickUpAM, //_PickUp <==================
			dropOffAM, //_DropOff <==================
			state, //State
			'', //City
			Address.filter((Data) => Data.formatted !== '')
		)
	);
	RouteArray.push(
		new route(
			routeName, //Route Name
			'Active', //Status
			'', //_MDD
			'PM', //AmPm  <==================
			'', //Days  <==================
			monitor, //Monitor
			'', //Passangers
			pickUpPM, //_PickUp <==================
			dropOffPM, //_DropOff <==================
			state, //State
			'', //City
			Address.filter((Data) => Data.formatted !== '')
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
