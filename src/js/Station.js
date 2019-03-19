class Station {
    constructor(name) {
        this.name = name;
        this.connections = [];
        this.siblings = [];
    }

    isLine(line) {
        return this.connections.includes(line);
    }
}
