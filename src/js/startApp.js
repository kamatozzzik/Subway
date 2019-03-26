import { parse } from './Parser';
import { getRoute } from './Router';

let fileReader = new FileReader();
let textInput = document.querySelector('#file-input');
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
});

window.addEventListener('load', () => {
    let storageData = localStorage.getItem(storageDataKey);
    if (storageData) {
        storageData = JSON.parse(storageData);
        currentSubway = parse(storageData);
    }
});
