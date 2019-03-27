import { parse } from './Parser';
import { getRoute, createNavList } from './Router';
import { renderSubwayList, renderRoute } from './View';

let fileReader = new FileReader();
const textInput = document.querySelector('#file-input');
const searchButton = document.querySelector('#search-button');
let currentSubway = null;
const storageDataKey = 'data';

textInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    fileReader.readAsBinaryString(file);
});

fileReader.addEventListener('loadend', function() {
    const storageData = JSON.stringify(this.result);
    localStorage.setItem(storageDataKey, storageData);
    currentSubway = parse(this.result);
    renderSubwayList(currentSubway.lines);
});

window.addEventListener('load', () => {
    let storageData = localStorage.getItem(storageDataKey);
    if (storageData) {
        storageData = JSON.parse(storageData);
        currentSubway = parse(storageData);
        renderSubwayList(currentSubway.lines);
    }
});

searchButton.addEventListener('click', e => {
    e.preventDefault();
    const fromInput = document.querySelector('#from');
    const toInput = document.querySelector('#to');
    const route = getRoute(fromInput.value, toInput.value, currentSubway.lines);
    const navList = createNavList(route, currentSubway.lines);
    renderRoute({ route: route, navList: navList });
});
