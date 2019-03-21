import { Station } from './Station';
import { SubwayLine } from './SubwayLine';
import { Subway } from './Subway';

export function parseToSubway(data) {
    let currentData = data;

    currentData = handleToArray(currentData);
    currentData = handleToSubway(currentData);


    return createSubway(currentData);
} 

function handleToArray(data) {
    let array = data;
    array = array.split('\n');
    array = Array.from(array);

    array = array.map(name => {
        return name.trim();
    });

    return array;
}

function handleToSubway(data) {
    let stationNames = [], names = [], lineNames = [];
    let lineName = null;

    data.forEach(name => {
        if (!name || data.lastIndexOf(name) === data.length - 1) {
            if (data.lastIndexOf(name) === data.length - 1) {
                names.push(name);
            }
            lineName = names.shift();
            stationNames.push(names);
            lineNames.push(lineName);
            names = [];
        } else {
        names.push(name);
        }
    });

    return { lineNames: lineNames, stationNames: stationNames };
}

function createSubway(data) {
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