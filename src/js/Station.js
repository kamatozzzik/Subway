export class Station {
    constructor(name) {
        this.name = name;
        this._siblings = [];
    }

    addSibling(sibling) {
        if (!this._siblings.includes(sibling)) {
            this._siblings.push(sibling);
        }
    }

    getSiblings() {
        return this._siblings;
    }
}
