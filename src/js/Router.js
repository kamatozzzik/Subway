import { Route } from './Route';

export function getRoute(from = '', to = '', subway) {
    const fromName = from.toLowerCase().trim();
    const toName = to.toLowerCase().trim();
    let fromStation = null;
    let toStation = null;
    let routes = [];
    const lineLen = subway.lines.length;

    for (let i = 0; i < lineLen; i++) {
        const stationLen = subway.lines[i].stations.length;
        for (let j = 0; j < stationLen; j++) {
            const name = subway.lines[i].stations[j].name.toLowerCase();

            if (fromStation && toStation) {
                break;
            }
            if (name === fromName) {
                fromStation = subway.lines[i].stations[j];
            } else if (name === toName) {
                toStation = subway.lines[i].stations[j];
            }
        }
    }
    if (!fromStation) {
        throw new Error(`${from} is not correct name`);
    }
    if (!toStation) {
        throw new Error(`${to} is not correct name`);
    }

    routes = createRoutes(fromStation, toStation);

    if (routes.length) {
        routes.sort((a, b) => {
            return a.length - b.length;
        });
        const navList = createNavList(routes[0], subway);
        return { route: routes[0], navList: navList };
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

export function createNavList(route, subway) {
    let lineList = {};
    let nav = {};
    let stations = route.stations;
    const len = stations.length;

    stations.forEach(station => {
        let lines = [];
        subway.lines.forEach(line => {
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
            if (nextList.includes(line)) {
                nav[stations[i].name] = line;
                break;
            } else if (prevList.includes(line)) {
                nav[stations[i].name] = line;
                break;
            }
        }
    }
    return nav;
}
