export function renderSubwayList(subway) {
    const lineList = document.createElement('ul');
    const subwayList = document.querySelector('.subway-list');
    lineList.classList.add('line-list');

    while (subwayList.firstChild) {
        subwayList.removeChild(subwayList.firstChild);
    }

    subway.lines.forEach(line => {
        const liLineList = document.createElement('li');
        liLineList.classList.add('line-name');
        const ulStationList = document.createElement('ul');

        liLineList.textContent = line.name;
        lineList.appendChild(liLineList);
        liLineList.appendChild(ulStationList);

        line.stations.forEach(station => {
            let liStationList = document.createElement('li');

            ulStationList.appendChild(liStationList);
            liStationList.textContent = station.name;
        });
    });
    subwayList.appendChild(lineList);
}

export function renderRoute(route) {
    const routeList = document.querySelector('.route-list');

    while (routeList.firstChild) {
        routeList.removeChild(routeList.firstChild);
    }

    route.stations.forEach(station => {
        let liStationList = document.createElement('li');
        routeList.appendChild(liStationList);
        liStationList.textContent = station.name;
    });
}
