require("../common");
var fs = require('fs'),
	child_process  = require('child_process');


var pcap = require('pcap');

var fixgen = require('fixgen'),
	suite;

var helper = {
	isType: function (val, type) {
		if(typeof val === "undefined" || val === null) {
			return false;
		}
		if(val.constructor && val.constructor.toString().indexOf(type) !== -1) {
			return true;
		}
		return false;
	}
}
		 
suite1 = vows.describe('Capturing Traffic');
suite1.addBatch({
	'GIVEN a "fixgen" - constructor is called': {
		topic: function () {
			this.TEST_OUTPUTFILE = "/tmp/testfile.json";
			this.SUT = fixgen({outputfile: this.TEST_OUTPUTFILE});
			return this.SUT;
		},
		'THEN it returns a value': function(topic) {
			assert.ok(typeof topic !== "undefined");
		},
		'THEN the returned value is a object': function(topic) {
			assert.ok(topic.constructor.toString().indexOf("Object") !== -1);
		},
		'AND the start-method is called': {
			topic: function (test) {
				var me = this;
				this.NAME_OF_DEVICE = "en1";
				this.FILTER = "tcp";
				this.BUFFER_SIZE = 2048;
				this.TEST_HOST = "www.google.de";
				this.TEST_PATH = "/";
 
				this.SPY_PCAP_CREATESESSION = sinon.spy(pcap, "createSession"); 
				this.SPY_PCAP_ON = sinon.spy(pcap.Pcap.prototype, "on");
				this.SPY_PCAP_OPEN = sinon.spy(pcap.Pcap.prototype, "open");	
				this.SPY_PCAP_DECODE_PACKET = sinon.spy(pcap.decode, "packet");
				this.SPY_TCP_TRACKER_ON = sinon.spy(pcap.TCP_tracker.prototype, "on"); 
				this.SPY_TCP_TRACKER_TRACKPACKET = sinon.spy(pcap.TCP_tracker.prototype, "track_packet");  
				
				this.SPY_ON_HTTP_REQUEST = sinon.spy(test, "onHttpRequest");
				this.SPY_ON_HTTP_REQUEST_BODY = sinon.spy(test, "onHttpRequestBody");
				this.SPY_ON_HTTP_REQUEST_COMPLETE = sinon.spy(test, "onHttpRequestComplete");
				this.SPY_ON_HTTP_RESPONSE = sinon.spy(test, "onHttpResponse");
				this.SPY_ON_HTTP_RESPONSE_BODY = sinon.spy(test, "onHttpResponseBody");
				
				this.ORIGIN_HTTP_RESPONSE_COMPLETE = test.onHttpResponseComplete;
				this.SPY_ON_HTTP_RESPONSE_COMPLETE = sinon.spy(test, "onHttpResponseComplete");

				
				
				//send some contents
				test.start(this.NAME_OF_DEVICE, this.FILTER, this.BUFFER_SIZE); 
				
				child_process.exec("curl http://"+this.TEST_HOST+this.TEST_PATH, function (err, stdout, stderr) {
					if (err) throw err;
					//me.callback(null, me.SUT); //some unclean i think
				});
				
				test.on('end', function () {
					console.log("HHAHAHAH");
					me.callback(null, me.SUT);
				});
			},
			'THEN the Pcap-Session is created by called createSession': function (topic) {
				assert.ok(this.SPY_PCAP_CREATESESSION.called, "createSession method is called");
				assert.ok(this.SPY_PCAP_CREATESESSION.calledWith(this.NAME_OF_DEVICE, this.FILTER, this.BUFFER_SIZE), "createSession is called with the right params");
			},
			'THEN the getDeviceName-Method SHOULD exist AND return a String': function (topic) {
				assert.ok((helper.isType(this.SUT.getDeviceName, "Function")), "exists");
				assert.ok((helper.isType(this.SUT.getDeviceName(), "String")), "return a string");
			},
			'THEN the TCPTracker registers to required handlers': function (topic) {
				assert.ok(this.SPY_TCP_TRACKER_ON.calledWith('http request'), "http_request handler");
				assert.ok(this.SPY_TCP_TRACKER_ON.calledWith('http request body'), "http_request_body handler");
				assert.ok(this.SPY_TCP_TRACKER_ON.calledWith('http request complete'), "http_request_complete handler");
				assert.ok(this.SPY_TCP_TRACKER_ON.calledWith('http response'), "http_response handler");
				assert.ok(this.SPY_TCP_TRACKER_ON.calledWith('http response body'), "http_response_body handler");
				assert.ok(this.SPY_TCP_TRACKER_ON.calledWith('http response complete'), "http_response_complete handler");
			},
			'THEN the PCap Session SHOULD register to the packet handler': function (topic) {
				assert.ok(this.SPY_PCAP_ON.calledWith('packet'), "registers to packet handler");
			},
			'THEN raw-packets SHOULD be decoded': function (topic) {
				assert.ok(this.SPY_PCAP_DECODE_PACKET.called, "is called");
			},
			'THEN the decoded packets SHOULD be redirected to the TCP_TRACER': function(topic) {
				assert.ok(this.SPY_TCP_TRACKER_TRACKPACKET.called, "tracepacket is called");
			},
			'THEN the onHttpRequest-Method is called': function (topic) {
				assert.ok(this.SPY_ON_HTTP_REQUEST.called);
			},
			'THEN the onHttpRequestComplete-Method is called': function (topic) {
				assert.ok(this.SPY_ON_HTTP_REQUEST_COMPLETE.called);
			},
			'THEN the onHttpResponse-Method is called': function (topic) {
				assert.ok(this.SPY_ON_HTTP_RESPONSE.called);
			},
			'THEN the onHttpResponseComplete-Method is called': function (topic) {
				assert.ok(this.SPY_ON_HTTP_RESPONSE_COMPLETE.called);
			},
			'AND if the getFlow-method is called': {
				topic: function (topic) {
					return topic.getFlow();
				},
				'THEN the result is an Array': function (topic) {
					assert.ok(topic.constructor.toString().indexOf("Array") !== -1, "returns an array");
				},
				'THEN the resulting Array contains Objects with request and response-Objects': function (topic) {
					assert.ok(topic[0].request.constructor.toString().indexOf("Object") !== -1);
					assert.ok(topic[0].response.constructor.toString().indexOf("Object") !== -1);

					assert.equal(topic[0].request.headers["Host"], this.TEST_HOST);
					assert.equal(topic[0].request.url, this.TEST_PATH);
				}
			},
			'AND after that the stop-method is called': {
				topic: function (topic) {
					this.SPY_PCAP_CLOSE = sinon.spy(pcap.Pcap.prototype, "close");
					this.SUT.stop();
					return this;
				},
				'THEN the Pcap.prototype.close Method is internally called': function (topic) {
					assert.ok(this.SPY_PCAP_CLOSE.called);
				},
				teardown: function(test) {
					this.SPY_PCAP_CLOSE.restore();
				}
			},
			'AND the Contents of the Flow are stored implicity AND the outputfile is read': {
				topic: function (topic) {
					var outer = this;
					fs.readFile(this.TEST_OUTPUTFILE, function (err, data) {
						if (err) throw err;
						outer.callback(null, JSON.parse(data.toString("utf8")));
					});
						
				},
				'THEN the file contents should be the same as expected': function (topic) {
					assert.deepEqual(this.SUT.getFlow(),topic);
				},
				teardown: function (topic) {
					//remove the test file
					var fs = require('fs');
					fs.unlinkSync(this.TEST_OUTPUTFILE);
				}
			},
			teardown: function(test) {
				this.SPY_PCAP_CREATESESSION.restore(); 
				this.SPY_PCAP_ON.restore(); 
				this.SPY_PCAP_OPEN.restore(); 	
				this.SPY_PCAP_DECODE_PACKET.restore(); 
				this.SPY_TCP_TRACKER_ON.restore(); 
				this.SPY_TCP_TRACKER_TRACKPACKET.restore(); 
				
				this.SPY_ON_HTTP_REQUEST.restore(); 
				this.SPY_ON_HTTP_REQUEST_BODY.restore(); 
				this.SPY_ON_HTTP_REQUEST_COMPLETE.restore(); 
				this.SPY_ON_HTTP_RESPONSE.restore(); 
				this.SPY_ON_HTTP_RESPONSE_BODY.restore(); 
				this.SPY_ON_HTTP_RESPONSE_COMPLETE.restore(); 
				
				var sess = test.getPcapSession(); 
				sess.readWatcher.callback = this.ORIGIN_READWATCHER_CALLBACK; 
			//	test.stop();
			}
		}
	}
});

//test reading, event-handling, decoding and creation of fix

//handle if no network device is selected
//the device should be settable
//also the user should be able to apply filters
//there also should be an option to generate the fixtures with a autogenerated __validation (look if some thing is string, method is correct, status is correct, request is correct, some things must be left out, like dates, timestamps etc.)
//also there should be a replay option, to fire a collection of collected request packets and validate the responses out of nodejs and the browser - so validation must be switched to throws
exports.suite1 = suite1;