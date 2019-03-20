import { createSubway } from './subway func'
import { Route } from './Route';
import { Parser } from './Parser'

let fileReader = new FileReader();
let parser = new Parser();
let textInput = document.querySelector('#file-input');
let subwayData = null;

textInput.addEventListener('change', function(e) {
    file = e.target.files[0];
    fileReader.readAsBinaryString(file);
});

fileReader.addEventListener('loadend', function() {
    subwayData = this.result;
    subwayData = parser.handleToArray(subwayData);
    subwayData = parser.handleToSubway(subwayData);

    let storageObj = JSON.stringify(subwayData);
	localStorage.setItem('data', storageObj);
});
