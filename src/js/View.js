export function renderSubwayList(subwayLines) {
    const lineList = document.createElement('ul');
    const subwayList = document.querySelector('.subway-list');
    lineList.classList.add('line-list');

    /// Before each render it cleans place for rendering
    subwayList.removeChild(subwayList.firstChild);

    subwayLines.forEach(line => {
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

export function renderRoute(routeMap) {
    const stations = routeMap.route.stations;
    const navList = routeMap.navList;
    const routeWindow = document.querySelector('.routes');
    const routeList = document.createElement('ul');
    routeList.classList.add('route-list');

    routeWindow.removeChild(routeWindow.firstChild);

    stations.forEach(station => {
        let liStationList = document.createElement('li');
        routeList.appendChild(liStationList);
        liStationList.innerHTML = `${
            station.name
        } <span class='red-text'> on </span> <b>${
            navList[station.name].name
        }</b>`;
    });
    routeWindow.appendChild(routeList);
}
