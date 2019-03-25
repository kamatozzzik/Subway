import { Route } from './Route';

export function getRoute(from = '', to = '', subway) {
    const fromName = from.toLowerCase().trim();
    const toName = to.toLowerCase().trim();
    let fromStation = null;
    let toStation = null;
    let routes = [];

    const lineLen = subway.lines.length;
    const stationLen = subway.lines.stations.length;

    for (let i = 0; i < lineLen; i++) {
        for (let j = 0; j < stationLen; j++) {
            const name = subway.lines[i].stations[j].name.toLowerCase();
            a;
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

    routes = createRoutes(fromStation, toStation);

    if (routes.length) {
        routes.sort((a, b) => {
            return a.length - b.length;
        });
        return routes[0];
    } else {
        throw new Error('Route is not found');
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
