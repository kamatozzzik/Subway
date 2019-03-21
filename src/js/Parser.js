import { Station } from './Station';
import { SubwayLine } from './SubwayLine';
import { Subway } from './Subway';

export function parse(data) {
    let currentData = data;
    currentData = convertToArray(currentData);
    currentData = convertToSubway(currentData);

    return buildSubwayModel(currentData);
} 

function convertToArray(data) {
    data = data.split('\n');
    data = data.map(name => name.trim());

    return data;
}

function convertToSubway(data) {
    let allNames = [];
    let stationNames = [];
    let lineNames = [];

	for(let i = 0; i < data.length; i++) {
		if (!data[i] || i === data.length - 1) {
			if (i === data.length - 1) {
				allNames.push(data[i]);
			}
			lineName = allNames.shift();
			stationNames.push(allNames);
			lineNames.push(lineName);

			names = [];
		} else {
			allNames.push(data[i]);
		}
	}

    return { lineNames: lineNames, stationNames: stationNames };
}

function buildSubwayModel(data) {
    let stationNames = data.stationNames;
    let stationList = [];
    let lines = data.lineNames;
    let allLines = [];

    for (let i = 0; i < stationNames.length; i++) {
        for (let j = 0; j < stationNames[i].length; j++) {
            if (!stationList.includes(stationNames[i][j]))
                stationList.push(stationNames[i][j]);
        }
    }

    stationList = stationList.map(name => {
        return new Station(name);
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
        allLines[i] = new SubwayLine(lines[i], lineStations);
        lineStations = [];
    }

    return new Subway(allLines);
}
