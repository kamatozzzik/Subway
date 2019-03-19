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
