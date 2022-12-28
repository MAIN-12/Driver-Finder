function isloggedin() {
    let userID = document.getElementById('userID').value;
    let password = document.getElementById('pass').value;
    let elem = document.getElementById('login');
    var logIn = M.Modal.getInstance(elem);
    if (!userID || !password) {
        logIn.open();
    } else {
        logIn.close();
        return true;
    }
}

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log('==========LOG IN HAS BEAN SUBMITED==========');
	if (!isloggedin()) {
		// alert('WRONG USER ID OR PASSWORD');
		document.getElementById('wronfPass').style.display="flex"
	}else{
		if(isloggedin()){
			if(submitFlag){submitFun();}
		}
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