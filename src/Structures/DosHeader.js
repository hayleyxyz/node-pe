const Struct = require('../Struct');

module.exports = class extends Struct {
    constructor() {
        super();

        this.uint16le('magic')
            .uint16le('usedBytesInTheLastPage')
            .uint16le('fileSizeInPages')
            .uint16le('numberOfRelocationItems')
            .uint16le('headerSizeInParagraphs')
            .uint16le('minimumExtraParagraphs')
            .uint16le('maximumExtraParagraphs')
            .uint16le('initialRelativeSS')
            .uint16le('initialSP')
            .uint16le('checksum')
            .uint16le('initialIP')
            .uint16le('initialRelativeCS')
            .uint16le('addressOfRelocationTable')
            .uint16le('overlayNumber')
            .uint16leArray('reserved', 4)
            .uint16le('oemId')
            .uint16le('oemInfo')
            .uint16leArray('reserved2', 10)
            .uint32le('addressOfNewExeHeader');
    }
}