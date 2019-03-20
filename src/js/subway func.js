import { Station } from './Station';
import { SubwayLine } from './SubwayLine';
import { Subway } from './Subway';

export function createSubway(data) {
	let stationNames = data.stationNames.concat(),
	stationList = [],
	lines = data.lineNames.concat(),
	allLines = [];

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

		allLines[i] = createLine(lines[i], lineStations);
		lineStations = [];
	}

	return new Subway(allLines);
}

function createLine(subwayName, stations) {
    let currentStations = stations.concat();
    let line = new SubwayLine(subwayName,currentStations);
    return line;
}

function createStation(name) {
    let station = new Station(name);
    return station;
}