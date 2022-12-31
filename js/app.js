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
	console.log('New Route', RouteArray);
	return RouteArray;
}

function getConfigFile() {
	let config = {
		key: 1234,
		bid: 'M122201',
		topX: 10,
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
async function getDrivers(obj) {
	let url =
		'https://script.google.com/macros/s/AKfycbwEQq0PQQAWTALMItsHuJtqjogEgHueywErAtEzlX6fInsFrBNrgscKo94EoD4tUMVW/exec';
	url += `?key=${obj.key}`;
	url += `&bid=${obj.bid}`;
	url += obj.status ? `` : '&active=true';
	url += `&state=${obj.state}`;
	url += obj.monitor ? `&monitor=true` : '';
	const result = await fetch(url);
	return result.json();
	// result.json().then((data) => {
	// 	console.log("Available Drivers", data);
	// 	return data;
	// });
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}
function getDistanceFromLatLonInmiles(latlng1, latlng2) {
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

function filterLatLng(object, target) {
	for (const obj of object) {
		let d = getDistanceFromLatLonInmiles(obj.address.location, target);
		obj.d = d;
	}
	return object.sort((a, b) => a.d - b.d);
}

let submitFlag = false;
async function submitFun() {
	document.getElementById('loadder').style.display = 'block';

	let settings = getConfigFile();
	let newRoute = await routeSetUp();

	let data = await getDrivers({
		key: settings.key,
		bid: settings.bid,
		monitor: newRoute[0].monitor,
		status: settings.status,
		state: newRoute[0].state,
	});
	let drivers = data.drivers;
	drivers = filterLatLng(drivers, newRoute[0].address[0].location);

	if (newRoute[0].pickUp && newRoute[0].dropOff) {
		// let resultAM = routeCalculator(newRoute[0].Address);
		let resultAM=[10,10];
		routing(drivers, newRoute[0], resultAM, 'RecordAM', 0);
	}
	if (newRoute[1].pickUp && newRoute[1].dropOff) {
		let resultPM = routeCalculator(newRoute[1].Address);
		routing(drivers, newRoute[1], resultPM, 'RecordPM', 1);
	}
	// if(newRoute[2].pickUp && newRoute[2].dropOff){routing(drivers, newRoute[2], resultPM, 'RecordPM', 2);}

	printResults(drivers);
	RouteCalculateDisplay(newRoute);

	document.getElementById('loadder').style.display = 'none';
	submitFlag = false;
}
