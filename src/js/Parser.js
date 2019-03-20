export class Parser {

    handleToArray(data) {
        let array = data;
        array = array.split('\n');
        array = Array.from(array);
    
        array = array.map(name => {
            return name.trim();
        });
    
        return array;
    }

    handleToSubway(data) {
        let stationNames = [], names = [], lineNames = [];
        let lineName = null;
    
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

}