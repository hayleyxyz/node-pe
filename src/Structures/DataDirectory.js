const Struct = require('../Struct');

module.exports = class extends Struct {
    constructor() {
        super();

        this.uint32le('relativeVirtualAddress')
            .uint32le('size');
    }
    
}