import { createSubway } from './subway func'
import { Parser } from './Parser'

let fileReader = new FileReader();
let textInput = document.querySelector('#file-input');
let subwayData = null;

textInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    fileReader.readAsBinaryString(file);
});

fileReader.addEventListener('loadend', function() {
    subwayData = this.result;
});


