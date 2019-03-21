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
    localStorage.setItem(storageDataKey, JSON.stringify(currentSubway));

});

window.addEventListener('load', () => {
    if (localStorage.getItem(storageDataKey)) {
        currentSubway = JSON.parse(localStorage.getItem(storageDataKey));
    }
});



