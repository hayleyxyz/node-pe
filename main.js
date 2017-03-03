const {PE, PeReader, FileIO, } = require('./src');

var io = new FileIO('hello.exe', 'r');
var pe = new PE();
var peReader = new PeReader(pe);

peReader.read(io);