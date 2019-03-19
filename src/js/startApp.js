import { Station } from './Station';
import { SubwayLine } from './SubwayLine';
import { Subway } from './Subway';
import { Route } from './Route';

let fileReader = new FileReader();
let textInput = document.querySelector('#file-input');

textInput.addEventListener('change', function(e) {
file = e.target.files[0];
fileReader.readAsBinaryString(file);
});
