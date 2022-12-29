/** @format */

class route {
	constructor(_Name, _Status, _MDD, _AmPm, _Days, _Monitor, _Passangers, _PickUp, _DropOff, _State, _City, _Address) {
		this.name = _Name;
		this.status = _Status;
		this.mdd = _MDD;
		this.ampm = _AmPm;
		this.days = _Days;
		this.monitor = _Monitor;
		this.passangers = _Passangers;
		this.state = _State;
		this.city = _City;
		this.pickUp = _PickUp;
		this.dropOff = _DropOff;
		this.address = _Address;
		this.contact;
	}
	getAddressArray() {
		let Addressees = [];
		for (let i = 0; i < this.address.length; i++) {
			Addressees[i] = this.address[i].formatted;
		}
		return Addressees.filter((Data) => Data !== '');
	}
}

class address {
	constructor(_id, _lable) {
		this.id = _id;
		this.lable = _lable;
		this.input = '';
		this.formatted = '';
		this.location = '';
        this.state= '';
		this.city= '';

		try {
			this.input = document.getElementById(this.id).value;
		} catch (err) {
			console.err('error in address class', err);
		}
	}
}

function sortRoutes(a, b) {
	return (result = (testHours = a.pickUp.getHours() - b.pickUp.getHours()) ? testHours : a.pickUp.getMinutes() - b.pickUp.getMinutes());
}

function RoutesFormat(data) {
	var dataArray = [];
	for (dataRow of data) {
		let Address = [
			{
				formatted: dataRow[14], //Address 1
				location: { lat: dataRow[15], lng: dataRow[16] },
			},
			{
				formatted: dataRow[17], //Address 2
				location: { lat: dataRow[18], lng: dataRow[19] },
			},
			{
				formatted: dataRow[20], //Address 3
				location: { lat: dataRow[21], lng: dataRow[22] },
			},
			{
				formatted: dataRow[23], //Address 4 (School)
				location: { lat: dataRow[24], lng: dataRow[25] },
			},
		];

		dataArray.push(
			new route(
				dataRow[0], //Route Name
				dataRow[1], //Status
				dataRow[2], //_MDD
				dataRow[4], //AmPm
				dataRow[5], //Days
				dataRow[6], //Monitor
				dataRow[7], //Passangers
				dataRow[10], //_PickUp
				dataRow[11], //_DropOff
				dataRow[12], //State
				dataRow[13], //City
				Address.filter((Data) => Data.formatted !== '')
			)
		);
	}
	return dataArray;
}
