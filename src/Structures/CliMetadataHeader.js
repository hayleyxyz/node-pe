const Struct = require('../Struct');

module.exports = class extends Struct {
    constructor() {
        super();

        this
            .uint32le('signature')
            .uint16le('majorVersion')
            .uint16le('minorVersion')
            .uint32le('reserved')
            .uint32le('stringLength')
            .nullTerminatedString('version', new Struct.Misc.MemberReference('stringLength'))
            .uint16le('flags')
            .uint16le('numberOfStreams');
    }
}