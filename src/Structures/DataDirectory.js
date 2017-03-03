const Struct = require('../Struct');

module.exports = class extends Struct {
    constructor() {
        super();

        this.uint32le('relativeVirtualAddress')
            .uint32le('size');
    }

    get targetObject() {
        return new (class {
            get isZero() {
                return !this.relativeVirtualAddress && !this.size;
            }
        });
    }
}