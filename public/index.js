
function removeHouseNumber(){
    const houseName = document.querySelector(".houseName");
    deleteChildNodes(houseName);
}
function addHouseNumber(houseId){
    const houseName = document.querySelector(".houseName");
    const h2 = createNode("h2");
    h2.innerHTML = houseId + " information";
    append(houseName, h2);
}

function removeTable(){
    let dataElement = document.querySelector(".data");
    deleteChildNodes(dataElement);
}

/**
 * Fetch the house information 
 * 
 * @param {string} houseId- the house number 
 */
function fetchAndShowHouseInfo(houseId) {
    fetchDataFromServer(`http://localhost:3000/homes/${houseId}/data`).then(rooms => {
        removeHouseNumber();
        addHouseNumber(houseId);
        removeTable();
        addTable(rooms);
    }).catch(function (err) {
        console.log('ERROR presenting data from server', err);
    });
}

/**
 * Bring data from server
 * 
 * @param {url} apiUrl- the url of the server 
 */
function fetchDataFromServer(apiUrl) {
    let serverResponse = fetch(apiUrl).then((response) => {
        if (!response.ok) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
        }
        return response.json();
    }).catch(err => {
        console.log('ERROR fetching from server', err);
    });

    return serverResponse;
}

/**
 * Create the type of element that pass in the parameters
 * 
 * @param {string} element- node name 
 */
function createNode(element) {
    return document.createElement(element);
}

/**
 * Append the second parameter(element) to the first one
 * 
 * @param {string} parent- the parent node 
 * @param {string} element- the child node 
 */
function append(parent, element) {
    return parent.appendChild(element);
}
/**
 * Delete all child nodes to specified parent node
 * 
 * @param {string} parentNode 
 */
function deleteChildNodes(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}
/**
 * add table contains the room information
 * 
 * @param {Array} data- the array of rooms 
 */
function addTable(data) {
    let dataElement = document.querySelector(".data");
    let table = createNode('table');
    let tr = createNode('tr');

    // add header row to table
    tr.innerHTML = '<th>Room Name</th>' + '<th>Temperature</th>' + '<th>Humidity</th>';
    append(table, tr);

    // add rest of rows to table
    data.forEach(room => {
        tr = createNode('tr');
        for (const property in room) {
            tr.innerHTML = '<td>' + room.name + '</td><td>' + room.temperature + '</td>' + '<td>' + room.humidity + '</td>';
            append(table, tr);
        }
        append(dataElement, table);
    })
}


