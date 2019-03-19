export class SubwayLine {
    constructor(name, stations) {
        this.name = name;
        this.stations = stations;
        this.connections = [];
    }

    hasStation(stationName) {
        return this.stations.some(station => {
            let currentName = station.name.toLowerCase();
            let requestName = stationName.toLowerCase();
            
            return currentName === requestName ? true : false;
        });
    }
}
