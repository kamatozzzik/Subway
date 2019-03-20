export class SubwayLine {
    constructor(name, stations) {
        this.name = name;
        this.stations = stations;
    }

    isCicle() {
        const last = stations.length - 1;
        return this.stations[0] === stations[last];
    }

    hasStation(stationName) {
        return this.stations.some(station => {
            return stationName === station.name;
        });
    }
}
