import { Station } from './Station';
import { SubwayLine } from './SubwayLine';
import { Subway } from './Subway';
import { Route } from './Route';

let fileReader = new FileReader();
let textInput = document.querySelector('#file-input');
let subwayData = null;

textInput.addEventListener('change', function(e) {
    file = e.target.files[0];
    fileReader.readAsBinaryString(file);
});

fileReader.addEventListener('loadend', function() {
	subwayData = this.result;
});


function handleToArray(data) {
    data = data.split('\n');
    data = Array.from(data);

    data = data.map(name => {
        return name.trim();
    });

    return data;
}

function handleToSubway(data) {
    let stationNames = [];
    let names = [];
    let lineNames = [];
    lineName = null;

    data.forEach(name => {
        if (!name || data.lastIndexOf(name) === data.length - 1) {
            if (data.lastIndexOf(name) === data.length - 1) {
                names.push(name);
            }

            lineName = names.shift();
            stationNames.push(names);
            lineNames.push(lineName);

            names = [];
        } else {
        names.push(name);
        }
    });
    return { lineNames: lineNames, stationNames: stationNames };
}