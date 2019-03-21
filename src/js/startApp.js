import { parse } from './Parser'

let fileReader = new FileReader();
let textInput = document.querySelector('#file-input');
let currentSubway = null; 
const storageDataKey = 'data';


textInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    fileReader.readAsBinaryString(file);
});

fileReader.addEventListener('loadend', function() {
    currentSubway = parse(this.result);
    const storageData = JSON.stringify(currentSubway);
    localStorage.setItem(storageDataKey, storageData);
});

window.addEventListener('load', () => {
    const storageData = localStorage.getItem(storageDataKey);
    if (storageData) {
        currentSubway = JSON.parse(localStorageData);
    }
});



