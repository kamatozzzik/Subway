export class SubwayLine {
    constructor(name, stations) {
        this.name = name;
        this.stations = stations || [];
    }

    isCicle() {
        if(this.stations.length) {
            const last = stations.length - 1;
            return this.stations[0] === stations[last];
        }
        else return TypeError('Stations are not defined!');
    }

    hasStation(stationName) {
        return this.stations.some(station => {
            return stationName === station.name;
        });
    }
}
