require("../common");
var suite,
	fs = require('fs'),
	child_process  = require('child_process');
	
suite1 = vows.describe('Capturing Traffic');
suite1.addBatch({
	'GIVEN fixgen is started as a node Program in readFile-Mode': {
		topic: function () {
			var me = this;
			me.TEST_OUTPUTFILE = "./testoutput.json";
			me.TEST_COMMAND = "node ./lib/fixgen/fixgen.js --readfile ./test/simple/fixtures/test.pcap --outputfile "+me.TEST_OUTPUTFILE;
			child_process.exec(this.TEST_COMMAND, function (err, stdout, stderr) {
				if (err) {
					throw err;
				}
				me.callback(null, stdout);
			})
		},
		'AND the generated Outputfile is opened and read': {
			topic: function (topic) { 
				var me = this;
				fs.readFile(me.TEST_OUTPUTFILE, function (err, data) {
					if (err) throw err;
					me.callback(null, JSON.parse(data.toString("utf8")));
				});
			},
			'THEN it SHOULD create the outputfile, specified by CLI-Options': function (topic) {
				console.log("topic:"+topic);
			}
		}
	}
});

exports.suite1 = suite1;