const Structures = require('./Structures');
const Constants = require('./Constants');

module.exports = class {

    constructor(pe) {
        this.pe = pe;
    }

    read(io) {
        this.pe.dosHeader = new Structures.DosHeader().readIo(io);
        io.position = this.pe.dosHeader.addressOfNewExeHeader;

        this.pe.coffFileHeader = new Structures.CoffFileHeader().readIo(io);
        this.pe.pe32Header = new Structures.Pe32Header().readIo(io);

        this.pe.dataDirectory = [ ];
        for(var i = 0; i < this.pe.pe32Header.numberOfRvaAndSizes; i++) {
            this.pe.dataDirectory.push(
                new Structures.DataDirectory().readIo(io)
            );
        }

        this.readSectionHeaders(io);
        this.readImportDirectory(io);
        this.readCliHeader(io);
        this.readCliMetaData(io);

        console.log(this.pe);
    }

    readSectionHeaders(io) {
        this.pe.sections = [ ];
        for(var i = 0; i < this.pe.coffFileHeader.numberOfSections; i++) {
            this.pe.sections.push(
                new Structures.CoffSectionHeader().readIo(io)
            );
        }
    }

    readImportDirectory(io) {
         if(this.pe.dataDirectory[Constants.DataDirectoryIndex.ImportTable].isZero) {
            return;
        }

        this.moveToRva(io, this.pe.dataDirectory[Constants.DataDirectoryIndex.ImportTable].relativeVirtualAddress);

        console.log(io.position);

        this.pe.importDirectoryEntries = [ ];

        while(true) {
            var entry = new Structures.ImportDirectoryTableEntry().readIo(io);

            if(entry.isZero) {
                break;
            }

            this.pe.importDirectoryEntries.push(entry);
        }
    }

    readCliHeader(io) {
        if(this.pe.dataDirectory[Constants.DataDirectoryIndex.CLIHeader].isZero) {
            return;
        }

        this.moveToRva(io, this.pe.dataDirectory[Constants.DataDirectoryIndex.CLIHeader].relativeVirtualAddress);

        this.pe.cliHeader = new Structures.CliHeader().readIo(io);
    }

    readCliMetaData(io) {
        this.moveToRva(io, this.pe.cliHeader.metaData.relativeVirtualAddress);

        this.pe.cliMetaDataHeader = new Structures.CliMetaDataHeader().readIo(io);
    }

    moveToRva(io, rva) {
        io.position = this.pe.resolveRvaToOffset(rva);
    }

}