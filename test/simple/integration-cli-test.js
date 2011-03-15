require("../common");
var suite,
	fs = require('fs'),
	child_process  = require('child_process');
	
suite1 = vows.describe('Testing CLI (## watch timeout option ##)');
suite1.addBatch({
	'GIVEN fixgen is started as a node Program in readFile-Mode': {
		topic: function () {
			var me = this;
			me.TEST_OUTPUTFILE = "./testoutput.json";
			me.TESTFIXTURE_JSON_FILE = "./test/simple/fixtures/testpcap.json";
			me.TEST_COMMAND = "./fixgen --outputfile "+me.TEST_OUTPUTFILE+" readfile ./test/simple/fixtures/test.pcap";
			
			fs.readFile(me.TESTFIXTURE_JSON_FILE, function (err, data) {
				if (err) throw err;
				me.TESTFIXTURE_JSON = JSON.parse(data.toString("utf8"));
				me.TESTFIXTURE_JSON_MOD = JSON.parse(data.toString("utf8"));
				me.TESTFIXTURE_JSON_MOD[0].request.url = "www.noop.noop.com";
				
				me.CHILD_PROC = child_process.exec(me.TEST_COMMAND, {timeout: 1500},function (err, stdout, stderr) {
					/*if (err) {
						throw err;
					}*/
					me.callback(null, stdout);
				});
			});
			//return true;
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
				assert.deepEqual(topic, this.TESTFIXTURE_JSON, " JSON contents are as expetected");
			},
			'THEN a modification of the Fixture SHOULD not Equal the loaded file-json': function(topic) {
				assert.notDeepEqual(topic, this.TESTFIXTURE_JSON_MOD, "JSON contents are different");
			}
		}
	},
	'GIVEN fixgen is started as a node-Program in readFile-Mode without a output file': {
		topic: function () {
			var me = this;
			me.TEST_OUTPUTFILE = "./testoutput.json";
			me.TESTFIXTURE_JSON_FILE = "./test/simple/fixtures/testpcap.json";
			me.TEST_COMMAND = "./fixgen readfile ./test/simple/fixtures/test.pcap";
			
			fs.readFile(me.TESTFIXTURE_JSON_FILE, function (err, data) {
				if (err) throw err;
				me.TESTFIXTURE_JSON = JSON.parse(data.toString("utf8"));
				me.TESTFIXTURE_JSON_MOD = JSON.parse(data.toString("utf8"));
				me.TESTFIXTURE_JSON_MOD[0].request.url = "www.noop.noop.com";
				
				me.CHILD_PROC = child_process.exec(me.TEST_COMMAND, {timeout: 1500},function (err, stdout, stderr) {
					/*if (err) {
						throw err;
					}*/
					me.callback(null, JSON.parse(stdout));
				});
			});
		},
		'THEN the output should redirected to the stdout of the Child process': function (topic) {
			assert.deepEqual(topic, this.TESTFIXTURE_JSON, "the output is like as expected");
		}
	}
});

exports.suite1 = suite1;