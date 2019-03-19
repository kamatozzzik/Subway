export class SubwayLine {
constructor(name, isCicle, stations) {
this.name = name;
this.isCicle = isCicle;
this.stations = stations;
this.connections = [];
}

hasStation(stationName) {
return this.stations.some(station => {
return stationName === station.name ? true : false;
});
}
}
