/** @format */

document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('select');
	var instances = M.FormSelect.init(elems);
});
document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.timepicker');
	var instances = M.Timepicker.init(elems);
});
document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.datepicker');
	var instances = M.Datepicker.init(elems);
});
document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.modal');
	var instances = M.Modal.init(elems);
});

var student2 = document.getElementById('student2');
var student3 = document.getElementById('student3');
var SpecialTrip = document.getElementById('SpecialTrip');
var addSpecialTrip = document.getElementById('addSpecialTrip');

addStudent.addEventListener('click', () => {
	if (student2.style.display === 'none') {
		student2.style.display = 'block';
	} else if (student3.style.display === 'none') {
		student3.style.display = 'block';
	}
});
removeStudent2.addEventListener('click', () => {
	student2.style.display = 'none';
});
removeStudent3.addEventListener('click', () => {
	student3.style.display = 'none';
});

addSpecialTrip.addEventListener('click', () => {
	SpecialTrip.style.display = 'block';
	addSpecialTrip.style.display = 'none';
});
removeSpecialTrip.addEventListener('click', () => {
	SpecialTrip.style.display = 'none';
	addSpecialTrip.style.display = 'block';
});

myForm.addEventListener('reset', (e) => {
	student2.style.display = 'none';
	student3.style.display = 'none';
	SpecialTrip.style.display = 'none';
	addSpecialTrip.style.display = 'block';
	try {
		var element = document.getElementById('rt');
		element.parentNode.removeChild(element);
	} catch (err) {
		console.log('no table diaplayed');
	}
});

myForm.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log('==========FORM HAS BEAN SUBMITED==========');
	if (isloggedin()) {
		let routeName = document.getElementById('fname').value;
		let state = document.getElementById('state').value;
		let address = [];
		address[0] = document.getElementById('address1').value;
		address[1] = document.getElementById('address2').value;
		address[2] = document.getElementById('address3').value;
		address[3] = document.getElementById('schoolAddress').value;
		console.log(address);

		document.getElementById('loadder').style.display = 'block';

		let bid='M122201'
		let active=true
		let Monitor=false;

		let url =
			'https://script.google.com/macros/s/AKfycbwXtBXQJNEJF8veBWDU1Q3nu5C06rG9TyNqGP9JR1ZiPqUgRRRw3eY2lIKULHUXyJr2/exec';
		url += `?state=${state}`;
		// url += `&active=${active}`;
		// url += `&bid=${bid}`;
		// url += `&monitor=${Monitor}`;
		makeAPICall(url);
		// printResults((Drivers = testData()));
	}
});
