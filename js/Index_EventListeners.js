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