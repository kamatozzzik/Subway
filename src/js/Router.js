import { Route } from './Route';

export function getRoute(from = '', to = '', subway) {
    const fromName = from.toLowerCase().trim();
    const toName = to.toLowerCase().trim();
    let fromStation = null;
    let toStation = null;
    let routes = [];

    subway.lines.forEach(line => {
        line.stations.forEach(station => {
            const name = station.name.toLowerCase();
            if (name === fromName) {
                fromStation = station;
            } else if (name === toName) {
                toStation = station;
            }
        });
    });

    routes = createRoutes(fromStation, toStation);
    routes.sort((a, b) => {
        return a.length - b.length;
    });

    return routes[0];
}

function createRoutes(start, end, route = [], routes = []) {
    if (start === end) {
        return routes;
    }
    route.push(start);
    start.getSiblings().forEach(station => {
        if (station === end) {
            route.push(station);
            routes.push(new Route(route.concat())); ///// It works with the link to current array, because I'm creating new array here
            route.pop();
        } else if (!route.includes(station)) {
            route = createRoutes(station, end, route, routes);
        }
    });
    if (route.length === 1) return routes;
    route.pop();
    return route;
}
