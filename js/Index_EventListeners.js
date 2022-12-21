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

addStudent.addEventListener('click', () => {
	var x = document.getElementById('student2').style;
	var y = document.getElementById('student3').style;
	if (x.display === 'none') {
		x.display = 'block';
	} else if (y.display === 'none') {
		y.display = 'block';
	}
});
removeStudent2.addEventListener('click', () => {
	document.getElementById('student2').style.display = 'none';
});
removeStudent3.addEventListener('click', () => {
	document.getElementById('student3').style.display = 'none';
});
myForm.addEventListener('reset', (e) => {
	var element = document.getElementById('rt');
	element.parentNode.removeChild(element);
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

		let url =
			'https://script.google.com/macros/s/AKfycbwE8GMN6ihQe4-msb17l8uWxssQJifTzuFjw45OxAB05qVIZV3GfGiiD-TIlEmdEVMR/exec';
		url += `?state=${state}`;
		makeAPICall(url);
		// printResults((Drivers = testData()));
	}
});

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log('==========LOG IN HAS BEAN SUBMITED==========');
	if (!isloggedin()) {
		alert('WRONG USER ID OR PASSWORD');
	}
	// const request = new XMLHttpRequest();
	// request.open(
	// 	'POST',
	// 	'https://script.google.com/macros/s/AKfycbyrQkaQGHwiDOoqPHR6r-pZbnK50vstFWilFLsQHK5w8_PpnNh1youkPGpINWw4rKFySQ/exec'
	// );
	// request.onload = function () {
	// console.log(request.responseText);
	// };
	// request.send(new FormData(myForm));
});

// document.getElementById('btn-login').addEventListener('click', () => {
//     var x = document.getElementById('login').style;
//     x.display = x.display === 'none' ? 'block' : 'none';
// });
