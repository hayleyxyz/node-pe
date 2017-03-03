const yuilib = require('yuilib');
const {PE, PeReader, } = require('./src');

var io = new yuilib.IO.FileIO('hello.exe', 'r');
var pe = new PE();
var peReader = new PeReader(pe);

peReader.read(io);