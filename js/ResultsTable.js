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
                        <input type="checkbox" />
                        <span>${i + 1}</span>
                    </label>
                </td>`;
        html += `<td> ${data[i].name} </td>`;
        html += `<td> ${data[i].mdd} </td>`;
        html += `<td> ${data[i].routesLog} </td>`;
        html += `<td> ${(Math.random() * 50).toFixed(2)} miles </td>`;
        html += `<td> ${(Math.random() * 50).toFixed(2)} min </td>`;
        html += `<td>
                    <a class="btn-floating btn-small waves-effect waves-light blue">
                        <i class="material-icons">add</i>
                    </a>
                 </td>`;
        html += '</tr>';
    }
    html += `</tbody></table></div>`;
    return html;
}

function printResults(data) {
    console.log('Printing result of:\n', data);
    document.getElementById('result').innerHTML = resultsTable(data);
}

async function makeAPICall(url) {
    const result = await fetch(url);
    result.json().then((data) => {
        printResults(data.drivers);
        document.getElementById('loadder').style.display = 'none';
    });
}