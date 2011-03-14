var fixgen = require("./lib/fixgen");

var test = fixgen();
test.readFile("test/simple/test.pcap", "tcp");
console.log("LOAD HERE");
console.log(test.getDeviceName());