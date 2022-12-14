/** @format */
var student2 = document.getElementById('student2');
var student3 = document.getElementById('student3');
var SpecialTrip = document.getElementById('SpecialTrip');
var addSpecialTrip = document.getElementById('addSpecialTrip');
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
document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.collapsible');
	var instances = M.Collapsible.init(elems);
});
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
