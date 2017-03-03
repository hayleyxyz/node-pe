module.exports = class {

    resolveRvaToOffset(rva) {
        var section = this.resolveRvaToSection(rva);
        if(section === null) {
            throw 'Bad format';
        }

        return rva + section.pointerToRawData - section.virtualAddress;
    }

    resolveRvaToSection(rva) {
        for(var i = 0; i < this.sections.length; i++) {
            var section = this.sections[i];
            if(rva >= section.virtualAddress && rva < section.virtualAddress + section.sizeOfRawData) {
                return section;
            }
        }

        return null;
    }

}