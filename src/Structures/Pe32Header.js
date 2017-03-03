const Struct = require('../Struct');

module.exports = class extends Struct {
    constructor() {
        super();

        this.uint16le('magic')
            .uint8('majorLinkerVersion')
            .uint8('minorLinkerVersion')
            .uint32le('sizeOfCode')
            .uint32le('sizeOfInitializedData')
            .uint32le('sizeOfUninitializedData')
            .uint32le('addressOfEntryPoint')
            .uint32le('baseOfCode')
            .uint32le('baseOfData')
            .uint32le('imageBase')
            .uint32le('sectionAlignment')
            .uint32le('fileAlignment')
            .uint16le('majorOperatingSystemVersion')
            .uint16le('minorOperatingSystemVersion')
            .uint16le('majorImageVersion')
            .uint16le('minorImageVersion')
            .uint16le('majorSubsystemVersion')
            .uint16le('minorSubsystemVersion')
            .uint32le('win32VersionValue')
            .uint32le('sizeOfImage')
            .uint32le('sizeOfHeaders')
            .uint32le('checkSum')
            .uint16le('subsystem')
            .uint16le('dllCharacteristics')
            .uint32le('sizeOfStackReserve')
            .uint32le('sizeOfStackCommit')
            .uint32le('sizeOfHeapReserve')
            .uint32le('sizeOfHeapCommit')
            .uint32le('loaderFlags')
            .uint32le('numberOfRvaAndSizes');
    }
}