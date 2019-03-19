export class Route {
constructor(stations) {
this.stations = [];
this._setRoute(stations);
this.length = this.stations.length;
}

_setRoute(stations) {
stations.forEach(station => {
this.stations.push(station);
});
}
}
