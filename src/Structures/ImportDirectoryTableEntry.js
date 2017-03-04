const Struct = require('../Struct');

module.exports = class extends Struct {

    constructor() {
        super();

        this
            .uint32le('importLookupTableRva')
			.uint32le('timeDateStamp')
			.uint32le('forwarderChain')
			.uint32le('nameRva')
			.uint32le('importAddressTableRva');
    }

}

