import { Route } from './Route';

export function getRoute(from = '', to = '', subwayLines) {
    const fromName = from.toLowerCase().trim();
    const toName = to.toLowerCase().trim();
    let fromStation = null;
    let toStation = null;
    let routes = [];
    const lineLen = subwayLines.length;

    for (let i = 0; i < lineLen; i++) {
        const stationLen = subwayLines[i].stations.length;
        for (let j = 0; j < stationLen; j++) {
            const name = subwayLines[i].stations[j].name.toLowerCase();

            if (fromStation && toStation) {
                break;
            }
            if (name === fromName) {
                fromStation = subwayLines[i].stations[j];
            } else if (name === toName) {
                toStation = subwayLines[i].stations[j];
            }
        }
    }

    if (!fromStation) {
        throw new Error(`Station name ${from} is not correct`);
    }
    if (!toStation) {
        throw new Error(`Station name ${to} is not correct`);
    }

    routes = createRoutes(fromStation, toStation);

    if (routes.length) {
        routes.sort((a, b) => {
            return a.length - b.length;
        });
        return routes[0];
    } else {
        return null;
    }
}

function createRoutes(start, end, route = [], routes = []) {
    if (start === end) {
        route.push(start);
        routes.push(route);
        return routes;
    }

    route.push(start);
    start.getSiblings().forEach(station => {
        if (station === end) {
            route.push(station);
            // It works with the link to current array, because I'm creating new array here
            routes.push(new Route(route.concat()));
            route.pop();
        } else if (!route.includes(station)) {
            route = createRoutes(station, end, route, routes);
        }
    });
    if (route.length === 1) {
        return routes;
    }
    route.pop();

    return route;
}

export function createNavList(route, subwayLines) {
    let lineList = {};
    let nav = {};
    let stations = route.stations;
    const len = stations.length;

    stations.forEach(station => {
        let lines = [];
        subwayLines.forEach(line => {
            if (line.hasStation(station.name)) {
                lines.push(line);
                lineList[station.name] = lines;
            }
        });
    });

    for (let i = 0; i < len; i++) {
        const currentList = lineList[stations[i].name];
        let nextList = [];
        let prevList = [];

        i !== len - 1
            ? (nextList = lineList[stations[i + 1].name])
            : (prevList = lineList[stations[i - 1].name]);

        for (let line of currentList) {
            /// If next station has connection with current station, then add line to data
            if (nextList.includes(line)) {
                nav[stations[i].name] = line;
                break;
                /// If it is the last iteration to add last line to data
            } else if (prevList.includes(line)) {
                nav[stations[i].name] = line;
                break;
            }
        }
    }
    return nav;
}
