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
    let array = data;
    array = array.split('\n');
    array = Array.from(array);

    array = array.map(name => name.trim());

    return array;
}

function convertToSubway(data) {
    let stationNames = [], allNames = [], lineNames = [];

    data.forEach(name => {
        if (!name || data.lastIndexOf(name) === data.length - 1) {
            if (data.lastIndexOf(name) === data.length - 1) {
                allNames.push(name);
            }
            let lineName = allNames.shift();

            stationNames.push(allNames);
            lineNames.push(lineName);
            names = [];
        } else {
        allNames.push(name);
        }
    });

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
        new SubwayLine(lines[i], lineStations);
        lineStations = [];
    }

    return new Subway(allLines);
}
