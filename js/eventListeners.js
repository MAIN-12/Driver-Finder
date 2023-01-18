/** @format */
var student2 = document.getElementById('student2');
var student3 = document.getElementById('student3');
var SpecialTrip = document.getElementById('SpecialTrip');
var addSpecialTrip = document.getElementById('addSpecialTrip');
var btn_menu = document.getElementById('btn_menu');
var sidebar = document.getElementById('sidebar');
var selectInstances;
var modalInstances;
var timeInstances;
var dateInstances;
var colapsableInstances;

document.addEventListener('DOMContentLoaded', function () {
	selectInstances = M.FormSelect.init(document.querySelectorAll('select'));
	modalInstances = M.Modal.init(document.querySelectorAll('.modal'));
	timeInstances = M.Timepicker.init(document.querySelectorAll('.timepicker'));
	dateInstances = M.Datepicker.init(document.querySelectorAll('.datepicker'));
	colapsableInstances = M.Collapsible.init(document.querySelectorAll('.collapsible'));

	var instances = M.Sidenav.init(document.querySelectorAll('.sidenav'));
});
btn_menu.addEventListener('click', () => (sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none'));
addStudent.addEventListener('click', () => {
	if (student2.style.display === 'none') {
		student2.style.display = 'block';
	} else if (student3.style.display === 'none') {
		student3.style.display = 'block';
	}
});
removeStudent2.addEventListener('click', () => (student2.style.display = 'none'));
removeStudent3.addEventListener('click', () => (student3.style.display = 'none'));
myForm.addEventListener('submit', (e) => {
	e.preventDefault();
	submitFlag = true;
	console.log('==========FORM HAS BEAN SUBMITED==========');
	if (isloggedin()) {
		submitFun();
		document.getElementById('loadder').style.display = 'block';
	}
});
myForm.addEventListener('reset', (e) => {
	student2.style.display = 'none';
	student3.style.display = 'none';
	// SpecialTrip.style.display = 'none';
	// addSpecialTrip.style.display = 'block';
	try {
		var element = document.getElementById('rt');
		element.parentNode.removeChild(element);
	} catch (err) {
		console.log('no table diaplayed');
	}
});

// addSpecialTrip.addEventListener('click', () => {
// 	SpecialTrip.style.display = 'block';
// 	addSpecialTrip.style.display = 'none';
// });
// removeSpecialTrip.addEventListener('click', () => {
// 	SpecialTrip.style.display = 'none';
// 	addSpecialTrip.style.display = 'block';
// });
