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
    const stations = route.route.stations;
    const navList = route.navList;
    const routeList = document.querySelector('.route-list');

    while (routeList.firstChild) {
        routeList.removeChild(routeList.firstChild);
    }

    stations.forEach(station => {
        let liStationList = document.createElement('li');
        routeList.appendChild(liStationList);
        liStationList.innerHTML = `${
            station.name
        } <span class='red-text'> on </span> <b>${
            navList[station.name].name
        }</b>`;
    });
}
