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

		if (!data) {throw new Error('No route found!');}

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
	var results = [];
	try {
		const { routes: [data] = [] } = Maps.newDirectionFinder()
			.setOrigin(Addres1)
			.setDestination(Addres2)
			.setMode('driving')
			.getDirections();

		const { routes: [data2] = [] } = Maps.newDirectionFinder()
			.setOrigin(Addres3)
			.setDestination(Addres4)
			.setMode('driving')
			.getDirections();

		if (data && data2) {
			const { legs: [{ duration: { value: time1 } } = {}] = [] } = data;
			const { legs: [{ distance: { value: distance1 } } = {}] = [] } = data;
			const { legs: [{ duration: { value: time2 } } = {}] = [] } = data2;
			const { legs: [{ distance: { value: distance2 } } = {}] = [] } = data2;

			results = [distance1 * 0.000621371, distance2 * 0.000621371, time1 / 60, time2 / 60];
		}
	} catch {
		Console.log('Error in Routing');
		// throw new Error('No route found!');
		results = [9999999, 9999999, 9999999, 9999999];
	}

	return results;
};

function routing(drivers, route, r, id, S) {
	for (driver of drivers) {
		console.log('DRIVER: ', driver.Name, ': \n', driver);
		console.log('Routes of: ', driver.Name, '\n', driver.Routes);

		let thisRoutes = driver.Routes[S];
		let index = thisRoutes.indexOf(route);
		let l = thisRoutes.length;

		console.log('INDEX: ', index);
		console.log('L: ', l);

		var Addres1 = index === 0 ? driver.Address : thisRoutes[index - 1].Address[3]; // Make the address adapt to the last address and check if the addres its not empty.
		var Addres2 = route.Address[0];
		var Addres3 = route.Address[route.Address.length - 1];
		var Addres4 = index === l - 1 ? driver.Address : thisRoutes[index + 1].Address[0];

		var result = DriverFinder(Addres1, Addres2, Addres3, Addres4);

		Logger.log(result);

		var record = {};
		record['ID'] = id;
		record['Miles'] = [result[0], result[1]];
		record['Time'] = [result[2], result[3]];
		record['TotalMiles'] = result[0] + result[1] + r[0];
		record['TotalTime'] = result[2] + result[3] + r[1];
		driver.Record.push(record);
	}
	return drivers;
}

function routing(obj, route, top) {
	drivers = obj;
	drivers = routing(drivers, route, r, id, S);
	drivers = routing(drivers, route, r, id, S);
	return drivers;
}
