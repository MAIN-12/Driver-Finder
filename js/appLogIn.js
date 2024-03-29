/** @format */
let User;

function isloggedin() {
	var logIn = M.Modal.getInstance(document.getElementById('login'));
	if (User) {
		console.log('Logged In');
		logIn.close();
		document.getElementById('btn-login').style.display = 'none';
		return true;
	} else {
		console.log('Opening Login form');
		logIn.open();
		return false;
	}
}

async function getUser() {
	document.getElementById('login_load').style.display = 'block';
	document.getElementById('wronfPass').style.display = 'none';
	let userID = document.getElementById('userID').value;
	let password = document.getElementById('pass').value;

	// let logURL = 'https://script.google.com/macros/s/AKfycbxGse56smGVOMenkvS9M9RMc_hTlTQqZi0DW80TVFn-iwNgZoB2QCv1Yt_4S5qcGRVQiw/exec';
	let logURL = 'https://script.google.com/macros/s/AKfycbyS6rIoccKAdEwejj_gXFq1xQ6DBQZoafofWTRevPOi7MvHKt9eNbRigMI4teVDV3ZlDA/exec';
	logURL += `?id=${userID}`;
	logURL += `&pass=${password}`;
	var Data = await fetch(logURL);
	// Data = Data.json();
	Data.json().then((data) => {
		document.getElementById('login_load').style.display = 'none';
		console.log('Data!!!!', data);
		User = data.user;
		if (!data.status) {
			document.getElementById('wronfPass').style.display = 'flex';
		} else {
			document.getElementById('wronfPass').style.display = 'none';
		}
		isloggedin();
		if (submitFlag) {
			submitFun();
		}
		// return data;
	});

	//
	// console.log(Data.json());
	// return User;
}

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log('==========LOG IN HAS BEAN SUBMITED==========');
	getUser();
});

// const request = new XMLHttpRequest();
// request.open(
// 	'POST',
// 	'https://script.google.com/macros/s/AKfycbyrQkaQGHwiDOoqPHR6r-pZbnK50vstFWilFLsQHK5w8_PpnNh1youkPGpINWw4rKFySQ/exec'
// );
// request.onload = function () {
// console.log(request.responseText);
// };
// request.send(new FormData(myForm));

// document.getElementById('btn-login').addEventListener('click', () => {
//     var x = document.getElementById('login').style;
//     x.display = x.display === 'none' ? 'block' : 'none';
// });
