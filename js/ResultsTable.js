/** @format */

function resultsTable(data) {
	let html = '';
	html += '<div id = "rt" class = "results_table" >';
	html += `<table class="highlight centered">
            <thead>
            <th>Index</th>
            <th>Name</th>
            <th>MDD</th>
            <th>Active Routes</th>
            <th>Total Miles</th>
            <th>Total Time</th>
            <th>More</th>
            </thead>`;
	html += ' <tbody > ';
	for (let i = 0; i < data.length; i++) {
		// const element = array[index];
		// let row=data[i];
		html += ' <tr > ';
		html += `<td>
                    <label>
                        <input id="check_${i}"  type="checkbox" />
                        <span>${i + 1}</span>
                    </label>
                </td>`;
		html += `<td> ${data[i].name} </td>`;
		html += `<td> ${data[i].mdd} </td>`;
		html += `<td> ${data[i].routesLog} </td>`;
		html += `<td> ${data[i].d.toFixed(2)} miles </td>`;
		html += `<td> ${(Math.random() * 50).toFixed(2)} min </td>`;
		html += `<td>
                    <a class="btn-floating btn-small waves-effect waves-light blue">
                        <i class="material-icons">add</i>
                    </a>
                 </td>`;
		html += '</tr>';

		let marker = new google.maps.Marker({
			title: data[i].name,
			position: data[i].address.location,
			map: map,
            icon:{
                url:"Assets/Photos/car_icon/icons8-car-24-blue01.png",
                size: new google.maps.Size(24, 24),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 32),
            },
			// icon: {
			// 	path: 'M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
			// 	fillColor: 'blue',
			// 	fillOpacity: 0.6,
			// 	strokeWeight: 0,
			// 	rotation: 0,
			// 	scale: 1.2,
			// 	anchor: new google.maps.Point(0, 20),
			// },
			animation: google.maps.Animation.DROP,
		});
		let infowindow = new google.maps.InfoWindow({content: `<h3>${data[i].name}</h3><p>${data[i].mdd}</p><p>${data[i].address.formatted}</p>`});
		google.maps.event.addListener(marker, 'click', function () {infowindow.open(map, marker);});
	}
	html += `</tbody></table></div>`;
	return html;
}

function printResults(data) {
	console.log('Printing result of:', data);
	document.getElementById('result').innerHTML = resultsTable(data);
}
