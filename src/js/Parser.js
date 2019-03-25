import { Station } from './Station';
import { SubwayLine } from './SubwayLine';
import { Subway } from './Subway';

export function parse(data) {
    let allNames = [];
    let stationNames = {};
    let subwayLines = [];

    data = data.split('\n').map(name => name.trim());

    for (let i = 0; i < data.length; i++) {
        if (!data[i] || i === data.length - 1) {
            if (i === data.length - 1) {
                allNames.push(data[i]);
            }
            let lineName = allNames.shift();

            let stationList = allNames.map(name => {
                if (!stationNames[name]) {
                    stationNames[name] = new Station(name);
                }
                return stationNames[name];
            });

            subwayLines.push(new SubwayLine(lineName, stationList));
            allNames = [];
        } else {
            allNames.push(data[i]);
        }
    }
    setConnections(subwayLines);

    return new Subway(subwayLines);
}

function setConnections(lines) {
    lines.forEach(line => {
        const len = line.stations.length;
        for (let i = 0; i < len; i++) {
            let next = line.stations[i + 1];
            if (next && !line.stations[i].getSiblings().includes(next)) {
                line.stations[i].setSibling(next);
            }
        }
        for (let i = len - 1; i > 0; i--) {
            let prev = line.stations[i - 1];
            if (prev && !line.stations[i].getSiblings().includes(prev)) {
                line.stations[i].setSibling(prev);
            }
        }
    });
}
