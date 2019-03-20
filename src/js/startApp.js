import { createSubway } from './subway func'
import { Parser } from './Parser'

let fileReader = new FileReader();
let parser = new Parser();
let textInput = document.querySelector('#file-input');
let currentSubway = null; 
let subwayData = null;
const lsKeys = {
    data: 'data'
}

textInput.addEventListener('change', function(e) {
    let file = e.target.files[0];
    fileReader.readAsBinaryString(file);
});

fileReader.addEventListener('loadend', function() {
    subwayData = this.result;
    subwayData = parser.handleToArray(subwayData);
    subwayData = parser.handleToSubway(subwayData);

    let storageObj = JSON.stringify(subwayData);
    localStorage.setItem(lsKeys.data, storageObj);

    currentSubway = createSubway(subwayData);
});

window.addEventListener('load', () => {
    let lsData = localStorage.getItem(lsKeys.data);

    if (lsData) {
        subwayData = JSON.parse(lsData);
	    currentSubway = createSubway(subwayData);
    }
});



