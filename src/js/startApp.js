import { parse } from './Parser'

let fileReader = new FileReader();
let textInput = document.querySelector('#file-input');
let currentSubway = null; 
const localStorageKey = 'data';


textInput.addEventListener('change', function(e) {
    let file = e.target.files[0];
    fileReader.readAsBinaryString(file);
});

fileReader.addEventListener('loadend', function() {
    currentSubway = parse(this.result);

    let storageObj = JSON.stringify(currentSubway);
    localStorage.setItem(localStorageKey, storageObj);

});

window.addEventListener('load', () => {
    let localStorageData = localStorage.getItem(localStorageKey);

    if (localStorageData) {
        currentSubway = JSON.parse(localStorageData);
    }
});



