import { Station } from './Station';
import { SubwayLine } from './SubwayLine';
import { Subway } from './Subway';

export function parse(data) {
    let allNames = [];
    let stationNames = {};
    let subwayLines = [];
    // let result = {};

    data = data.split('\n').map(name => name.trim());

    for (let i = 0; i < data.length; i++) {
        if (!data[i] || i === data.length - 1) {
            if (i === data.length - 1) {
                allNames.push(data[i]);
            }
            let lineName = allNames.shift();

            allNames = allNames.map(name => {
                if (!stationNames[name]) {
                    stationNames[name] = new Station(name);
                }
                return stationNames[name];
            });

            subwayLines.push(new SubwayLine(lineName, allNames));
            allNames = [];
        } else {
            allNames.push(data[i]);
        }
    }
    console.log(subwayLines);
    return new Subway(subwayLines);
}
