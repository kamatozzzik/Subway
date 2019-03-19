export class Station {
    constructor(name) {
        this.name = name;
        this._siblings = [];
    }

    setSibling(sibling) {
        this._siblings.push(sibling);
    }

    getSiblings() {
        return this._siblings;
    }
}
