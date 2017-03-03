const Struct = require('../Struct');
const DataDirectory = require('./DataDirectory');

module.exports = class extends Struct {
    constructor() {
        super();

        this
            .uint32le('cb')
            .uint16le('majorRuntimeVersion')
            .uint16le('minorRuntimeVersion')
            .struct('metaData', DataDirectory)
            .uint32le('flags')
            .uint32le('entryPointToken')
            .struct('resources', DataDirectory)
            .struct('strongNameSignature', DataDirectory)
            .struct('codeManagerTable', DataDirectory)
            .struct('vTableFixups', DataDirectory)
            .struct('exportAddressTableJumps', DataDirectory)
            .struct('managedNativeHeader', DataDirectory);
    }
}