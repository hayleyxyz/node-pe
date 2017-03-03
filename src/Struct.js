class Struct {

    constructor() {
        this.members = [ ];
    }

    uint8(name) {
        return this.addMember(new Struct.Types.UInt8(), name);
    }

    uint16le(name) {
        return this.addMember(new Struct.Types.UInt16LE(), name);
    }

    uint16leArray(name, length) {
        return this.addMember(new Struct.Types.UInt16LEArray(length), name);
    }

    uint32le(name) {
        return this.addMember(new Struct.Types.UInt32LE(), name);
    }

    nullTerminatedString(name, length) {
        return this.addMember(new Struct.Types.NullTerminatedString(length), name);
    }

    struct(name, struct) {
        return this.addMember(new Struct.Types.Struct(struct), name);
    }

    addMember(type, name) {
        this.members.push({ type, name });

        return this;
    }

    readIo(io) {
        var result = this.targetObject;

        for(var i = 0; i < this.members.length; i++) {
            var member = this.members[i];
            result[member.name] = member.type.readIo(io, result);
        }

        return result;
    }

    get targetObject() {
        return { };
    }

}

Struct.Types = {
    UInt8: class {
        readIo(io) {
            return io.readUInt8();
        }
    },

    UInt16LE: class {
        readIo(io) {
            return io.readUInt16LE();
        }
    },

    UInt16LEArray: class {
        constructor(size) {
            this.size = size;
        }

        readIo(io) {
            var result = [ ];

            for(var i = 0; i < this.size; i++) {
                result.push(
                    io.readUInt16LE()
                );
            }

            return result;
        }
    },

    UInt32LE: class {
        readIo(io) {
            return io.readUInt32LE();
        }
    },

    NullTerminatedString: class {
        constructor(size) {
            this.size = size;
        }

        readIo(io, targetObject) {
            var buf = io.read(this.resolveSize(targetObject));
            var result = '';

            for(var i = 0; i < buf.length; i++) {
                if(buf[i] === 0) {
                    return buf.slice(0, i).toString();
                }
            }
        }

        resolveSize(targetObject) {
            var result = this.size;

            if(result instanceof Struct.Misc.MemberReference) {
                result = targetObject[result.name];
            }

            return result;
        }
    },

    Struct: class {
        constructor(struct) {
            this.struct = struct;
        }

        readIo(io) {
            return new (this.struct)().readIo(io);
        }
    }
};

Struct.Misc = {

    MemberReference: class {
        constructor(name) {
            this.name = name;
        }
    }

};

module.exports = Struct;