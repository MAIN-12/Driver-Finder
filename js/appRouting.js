/** @format */

function routeCalculator(addresses) {
	ActiveAddress = addresses.filter((Data) => Data !== '');
	Logger.log('ActiveAddress \n', ActiveAddress);
	var Routemiles = 0;
	var Routetime = 0;

	for (let i = 0, l = ActiveAddress.length - 1; i < l; i++) {
		const { routes: [data] = [] } = Maps.newDirectionFinder()
			.setOrigin(ActiveAddress[i])
			.setDestination(ActiveAddress[i + 1])
			.setMode('driving')
			.getDirections();

		if (!data) {
			throw new Error('No route found!');
		}

		const { legs: [{ distance: { value: distance1 } } = {}] = [] } = data;
		const { legs: [{ duration: { value: time1 } } = {}] = [] } = data;

		d = distance1;
		t = time1;

		Routemiles += d;
		Routetime += t;
	}
	return (results = [Routemiles * 0.000621371, Routetime / 60]);
}

const DriverFinder = (Addres1, Addres2, Addres3, Addres4) => {
	// let r = RouteCalculat(Addres1, Addres2);

	// console.log(r);

	var results = [];
	// try {
	// 	const { routes: [data] = [] } = Maps.newDirectionFinder().setOrigin(Addres1).setDestination(Addres2).setMode('driving').getDirections();

	// 	const { routes: [data2] = [] } = Maps.newDirectionFinder().setOrigin(Addres3).setDestination(Addres4).setMode('driving').getDirections();

	// 	if (data && data2) {
	// 		const { legs: [{ duration: { value: time1 } } = {}] = [] } = data;
	// 		const { legs: [{ distance: { value: distance1 } } = {}] = [] } = data;
	// 		const { legs: [{ duration: { value: time2 } } = {}] = [] } = data2;
	// 		const { legs: [{ distance: { value: distance2 } } = {}] = [] } = data2;

	// 		results = [distance1 * 0.000621371, distance2 * 0.000621371, time1 / 60, time2 / 60];
	// 	}
	// } catch (err) {
	// 	console.log('Error in Routing', err);
	// 	// throw new Error('No route found!');
	// 	results = [9999999, 9999999, 9999999, 9999999];
	// }

	return results;
};

function sortRoutes(a, b) {
	return (result = (testHours = a.pickUp.hours - b.pickUp.hours) ? testHours : a.pickUp.minutes - b.pickUp.minutes);
}

function routing(drivers, route, r, id, S) {
	for (driver of drivers) {
		let thisRoutes = driver.routes;
		thisRoutes.push(route);
		thisRoutes.sort(sortRoutes);
		let index = thisRoutes.indexOf(route);
		let l = thisRoutes.length;
		console.log('Routes of: ', driver.name, '\n', driver.routes, '\n Routes.length', l, ' | index: ', index);

		var address = [];

		address[0] = index === 0 ? driver.address.location : thisRoutes[index - 1].address[this.length - 1].location; // Make the address adapt to the last address and check if the addres its not empty.
		address[1] = route.address[0].location;
		address[2] = route.address[route.address.length - 1].location;
		address[3] = index === l - 1 ? driver.address.location : thisRoutes[index + 1].address[0].location;

		// console.log('ADDRESS', address);

		var result = DriverFinder(address[0], address[1], address[2], address[3]);

		console.log(result);

		var record = {};
		record['id'] = id;
		record['miles'] = [result[0], result[1]];
		record['time'] = [result[2], result[3]];
		record['TotalMiles'] = result[0] + result[1] + r[0];
		record['TotalTime'] = result[2] + result[3] + r[1];
		driver.record.push(record);
	}
	return drivers;
}

// function routing(obj, route, top) {
// 	drivers = obj;
// 	drivers = routing(drivers, route, r, id, S);
// 	drivers = routing(drivers, route, r, id, S);
// 	return drivers;
// }
