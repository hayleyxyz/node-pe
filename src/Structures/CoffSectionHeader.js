const Struct = require('../Struct');

module.exports = class extends Struct {

    constructor() {
        super();

        this
            .nullTerminatedString('name', 8)
            .uint32le('virtualSize')
            .uint32le('virtualAddress')
            .uint32le('sizeOfRawData')
            .uint32le('pointerToRawData')
            .uint32le('pointerToRelocations')
            .uint32le('pointerToLinenumbers')
            .uint16le('numberOfRelocations')
            .uint16le('numberOfLinenumbers')
            .uint32le('characteristics');
    }

}