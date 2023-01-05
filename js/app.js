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

	if(sPickUp){
		RouteArray.push(
			new route(
				routeName, //Route Name
				'Active', //Status
				'', //_MDD
				'PM', //AmPm  <==================
				sDays, //Days  <==================
				monitor, //Monitor
				'', //Passangers
				sPickUp, //_PickUp <==================
				sDropOff, //_DropOff <==================
				Address[0].state, //State
				'', //City
				Address
			)
		);
	}
	console.log('New Route', RouteArray);
	return RouteArray;
}

function getConfigFile() {
	let config = {
		key: 'M1234',
		bid: 'M122201',
		topX: 10,
		user: {
			id: 'admin@main12.com',
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
		'https://script.google.com/macros/s/AKfycbzeL6j3eOr-4iLTJPdoBh8P6oSw4Ytr38ot17-xam8sDu7r2LLvK12xhGq6tY77-1zG/exec';
	url += `?key=${obj.key}`;
	url += `&bid=${obj.bid}`;
	url += obj.status ? `` : '&active=true';
	url += `&state=${obj.state}`;
	url += obj.monitor ? `&monitor=true` : '';
	const result = await fetch(url);
	const R = result.json();
	console.log('get Data:', R);
	return R;
	// result.json().then((data) => {
	// 	console.log("Available Drivers", data);
	// 	return data;
	// });
}

function filterLatLng(object, target) {
	for (const obj of object) {
		let d = getDistanceFromLatLonInmiles(obj.address.location, target);
		obj.d = d;
	}
	return object.sort((a, b) => a.d - b.d);
}

let submitFlag;
async function submitFun() {
	document.getElementById('loadder').style.display = 'block';

	let settings = {
		key: User.key,
		bid: User.bid,
		topX: 10,
		user: '',
		status: document.getElementById('inactiveCheck').checked,
	};

	let newRoute = await routeSetUp();
	let data = await getDrivers({
		key: settings.key,
		bid: settings.bid,
		monitor: newRoute[0].monitor,
		status: settings.status,
		state: newRoute[0].state,
	});
	try {
		if (data.drivers) {
			let drivers = data.drivers;
			drivers = filterLatLng(drivers, newRoute[0].address[0].location);

			let result = [];
			result[0] = [0, 0];
			result[1] = [0, 0];
			result[2] = [0, 0];
			// let resultAM = routeCalculator(newRoute[0].Address);
			if (newRoute[0].pickUp && newRoute[0].dropOff) {
				drivers = routing(drivers, newRoute[0], result[0], 'Record_AM', 0);
				console.log('Route calculation AM:');
			}
			if (newRoute[1].pickUp && newRoute[1].dropOff) {
				routing(drivers, newRoute[1], result[1], 'Record_PM', 1);
				console.log('Route calculation PM:');
			}
			
			// if (newRoute[2].pickUp && newRoute[2].dropOff) {
			// 	routing(drivers, newRoute[2], result[2], 'Special_Record', 1);
			// 	console.log('Route calculation Spetial Trip:');
			// }

			printResults(drivers);
			RouteCalculateDisplay(newRoute);
		} else {
			alert('NO DRIVERS AVAILABLE');
		}
	} catch (err) {
		console.error(err);
	} finally {
		document.getElementById('loadder').style.display = 'none';
		submitFlag = false;
	}
}
