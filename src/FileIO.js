const fs = require('fs');

class FileIO {

    constructor(filename, flags, mode) {
        this.filename = filename;
        this.fd = fs.openSync(filename, flags, mode);
        this._position = 0;

        var stat = fs.fstatSync(this.fd);
        this._size = stat.size;

        this.buffer = new Buffer(16);
    }

    get size() {
        return this._size;
    }

    set position(value) {
        if(value < 0) {
            throw 'position < 0';
        }

        return this._position = value;
    }

    get position() {
        return this._position;
    }

    peek(fn) {
        var pos = this.position;
        var value = fn();
        this.position = pos;
        return value;
    }

    read(length) {
        var buf = new Buffer(length);
        fs.readSync(this.fd, buf, 0, length, this.position);
        this.position += length;
        return buf;
    }

    readInt8() {
        this.fillBuffer(1);
        return this.buffer[0];
    }

    readUInt8() {
        this.fillBuffer(1);
        return this.buffer[0] >>> 0;
    }

    readInt16LE() {
        this.fillBuffer(2);
        return this.buffer.readInt16LE(0);
    }

    readInt16BE() {
        this.fillBuffer(2);
        return this.buffer.readInt16BE(0);
    }

    readUInt16LE() {
        this.fillBuffer(2);
        return this.buffer.readUInt16LE(0);
    }

    readUInt16BE() {
        this.fillBuffer(2);
        return this.buffer.readUInt16BE(0);
    }

    readInt32LE() {
        this.fillBuffer(4);
        return this.buffer.readInt32LE(0);
    }

    readInt32BE() {
        this.fillBuffer(4);
        return this.buffer.readInt32BE(0);
    }

    readUInt32LE() {
        this.fillBuffer(4);
        return this.buffer.readUInt32LE(0);
    }

    readUInt32BE() {
        this.fillBuffer(4);
        return this.buffer.readUInt32BE(0);
    }


    readFloatLE() {
        this.fillBuffer(4);
        return this.buffer.readFloatLE(0);
    }

    readFloatBE() {
        this.fillBuffer(4);
        return this.buffer.readFloatBE(0);
    }

    write(buffer, length) {
        if(!(buffer instanceof Buffer)) {
            buffer = Buffer.from(buffer);
        }

        if(!length) {
            length = buffer.length;
        }

        fs.writeSync(this.fd, buffer, 0, length, this.position);
        this.position += length;
    }

    writeInt8(value) {
        this.buffer.writeInt8(value);
        this.write(this.buffer, 1);
    }

    writeUInt8(value) {
        this.buffer.writeUInt8(value);
        this.write(this.buffer, 1);
    }

    writeInt16LE(value) {
        this.buffer.writeInt16LE(value);
        this.write(this.buffer, 2);
    }

    writeInt16BE(value) {
        this.buffer.writeInt16BE(value);
        this.write(this.buffer, 2);
    }

    writeUInt16LE(value) {
        this.buffer.writeUInt16LE(value);
        this.write(this.buffer, 2);
    }

    writeUInt16BE(value) {
        this.buffer.writeUInt16BE(value);
        this.write(this.buffer, 4);
    }

    writeInt32LE(value) {
        this.buffer.writeInt32LE(value);
        this.write(this.buffer, 4);
    }

    writeInt32BE(value) {
        this.buffer.writeInt32BE(value);
        this.write(this.buffer, 4);
    }

    writeUInt32LE(value) {
        this.buffer.writeUInt32LE(value);
        this.write(this.buffer, 4);
    }

    writeUInt32BE(value) {
        this.buffer.writeUInt32BE(value);
        this.write(this.buffer, 4);
    }

    writeFloatLE(value) {
        this.buffer.writeFloatLE(value);
        this.write(this.buffer, 4);
    }

    fillBuffer(length) {
        if(length > this.buffer.length) {
            throw 'Length to read too large';
        }

        fs.readSync(this.fd, this.buffer, 0, length, this.position);
        this.position += length;
    }

}

module.exports = FileIO;