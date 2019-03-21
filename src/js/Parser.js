import { Station } from './Station';
import { SubwayLine } from './SubwayLine';
import { Subway } from './Subway';

export function parse(data) {
    let allNames = [];
    let stationNames = [];
    let subwayLines = [];
    let result = {};
    data = data
            .split('\n')
            .map(name => name.trim());

    for (let i = 0; i < data.length; i++) {
        if (!data[i] || i === data.length - 1) {
            if (i === data.length - 1) {
                allNames.push(data[i]);
            }
            let lineName = allNames.shift();
            stationNames = stationNames.concat(allNames);
            result[lineName] = allNames;
            allNames = [];
        } else {
            allNames.push(data[i]);
        }
    }

    stationNames.forEach(name => {
        if(!allNames.includes(name)) {
            allNames.push(name);
        }
    });

    allNames = allNames.map(name => {
        return new Station(name);
    });

    for(let key in result) {
        let stations = [];
        stations = result[key].map(name => {
            for (let station of allNames) {
                if (station.name === name) {
                    return station;
                }
            }
        });
        subwayLines.push(new SubwayLine(key, stations));
    }
    return new Subway(subwayLines);
}