const Struct = require('../Struct');

module.exports = class extends Struct {
    constructor() {
        super();

        this
            .uint32le('signature')
            .uint16le('machine')
            .uint16le('numberOfSections')
            .uint32le('timeDateStamp')
            .uint32le('pointerToSymbolTable')
            .uint32le('numberOfSymbols')
            .uint16le('sizeOfOptionalHeader')
            .uint16le('characteristics');
    }
}