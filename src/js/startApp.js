import { Station } from './Station';
import { SubwayLine } from './SubwayLine';
import { Subway } from './Subway';
import { Route } from './Route';

let fileReader = new FileReader();
let textInput = document.querySelector('#file-input');
let currentSubway;

textInput.addEventListener('change', function(e) {
    file = e.target.files[0];
    fileReader.readAsBinaryString(file);
});

fileReader.addEventListener('loadend', function() {
    let subwayData = handleToArray(this.result);
    subwayData = handleToSubway(subwayData);

    currentSubway = createSubway(subwayData);
    renderList(currentSubway);
    setLineConnect(currentSubway);
    setStationConnect(currentSubway);

    let routes = createLineRoutes(
        currentSubway.lines[0].stations[0],
        currentSubway.lines[2].stations[2]
        );
    routes.sort((a, b) => {
        return a.length - b.length;
    });
});

function createLine(subwayName, isCicle, stations) {

    let currentStations = stations.concat();
    let line = new SubwayLine(subwayName, isCicle, currentStations);

    return line;
}

function createStation(name) {
    let station = new Station(name);
    return station;
}

function createSubway(data) {
    let subway = new Subway();
    let stationNames = data.stationNames.concat(),
    stationList = [],
    lines = data.lineNames.concat(),
    allStations = [];

    for (let i = 0; i < stationNames.length; i++) {
        for (let j = 0; j < stationNames[i].length; j++) {
            if (!stationList.includes(stationNames[i][j]))
                stationList.push(stationNames[i][j]);
        }
    }

    stationList = stationList.map(name => {
            return createStation(name);
        });

    for (let i = 0; i < lines.length; i++) {
        let lineStations = [];
        stationNames[i].forEach(name => {
            stationList.forEach(station => {

                if (name === station.name) {
                    lineStations.push(station);
                }
            });
        });

        allStations[i] = createLine(lines[i], data.isCicle[i], lineStations);
        lineStations = [];
    }
    subway.lines = allStations;

    return subway;
}

function handleToArray(data) {
    data = data.split('\n');
    data = Array.from(data);

    data = data.map(name => {
        name = name.split('');
        name = Array.from(name);
        name.pop();
        
        return name.join('');
    });

    return data;
}

function handleToSubway(data) {
let stationNames = [];
let names = [];
let lineNames = [];
let isCicle = [];
let start = null,
end = null,
lineName = null;

data.forEach(name => {
if (!name || data.lastIndexOf(name) === data.length - 1) {
if (data.lastIndexOf(name) === data.length - 1) {
names.push(name);
}
lineName = names.shift();
start = names[0];
end = names[names.length - 1];
if (start === end) isCicle.push(true);
else isCicle.push(false);

if (start === end) {
names.pop();
}
stationNames.push(names);
lineNames.push(lineName);

names = [];
} else {
names.push(name);
}
});
return { lineNames: lineNames, stationNames: stationNames, isCicle: isCicle };
}

function renderList(subway) {
let lineList = document.querySelector('.line-list');

subway.lines.forEach(line => {
let liLineList = document.createElement('li');
let ulStationList = document.createElement('ul');

liLineList.textContent = line.name;
lineList.appendChild(liLineList);
liLineList.appendChild(ulStationList);

line.stations.forEach(station => {
let liStationList = document.createElement('li');
let checkBox = document.createElement('input');
checkBox.type = 'checkbox';
checkBox.name = station.name;

ulStationList.appendChild(liStationList);
liStationList.textContent = station.name;
liStationList.appendChild(checkBox);

if (line.isCicle && station === line.stations[line.stations.length - 1]) {
let liStationList = document.createElement('li');
let checkBox = document.createElement('input');
checkBox.type = 'checkbox';
checkBox.name = line.stations[0].name;

ulStationList.appendChild(liStationList);
liStationList.textContent = line.stations[0].name;
liStationList.appendChild(checkBox);
}
});
});
}

function setLineConnect(subway) {
////////////////////////// Add connections to lines ////////////////////////
subway.lines.forEach(firstLine => {
firstLine.stations.forEach(station => {
subway.lines.forEach(secondLine => {
if (
secondLine.hasStation(station.name) &&
!secondLine.connections.includes(firstLine) &&
secondLine != firstLine
)
secondLine.connections.push(firstLine);
});
});
});
}

function setStationConnect(subway) {
subway.lines.forEach(line => {
let len = line.stations.length;
for (let i = 0; i < len; i++) {
let prev = line.stations[i - 1],
next = line.stations[i + 1],
current = line.stations[i].siblings;
if (
line.isCicle &&
!i &&
!current.includes(line.stations[len - 1]) &&
!current.includes(next)
) {
current.push(line.stations[len - 1]);
current.push(next);
} else if (i !== len - 1) {
if (!current.includes(prev) && prev && next) {
current.push(prev);
}
if (!current.includes(next) && prev && next) {
current.push(next);
}
}
}
});
}

function createLineRoutes(start, end, route, routes) {
if (route) {
route.push(start);
start.siblings.forEach(station => {
if (station === end) {
route.push(station);
let doneRoute = new Route(route);
routes.push(doneRoute);
route.pop();
} else if (!route.includes(station)) {
route = createLineRoutes(station, end, route, routes);
}
});
route.pop();

return route;
}
(route = []), (routes = []);
route.push(start);
if (start === end) {
routes.push(route);
return routes;
}
start.siblings.forEach(station => {
createLineRoutes(station, end, route, routes);
return routes;
});
route.pop();

return routes;
}
