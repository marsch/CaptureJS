var pcap = require('pcap'),
	fs = require('fs');


var fixgen = function () {
	var that = {},
		tcp_tracker,
		flow,
		pcapSession;
	
	var init = function () {
		flow = [];
		tcp_tracker = new pcap.TCP_tracker();
	}
	
	that.readFile = function (path, filter) { 
		init();
		pcapSession = pcap.createOfflineSession(path, filter);
		tcp_tracker.on('http request', that.onHttpRequest);
		tcp_tracker.on('http request body', that.onHttpRequestBody);
		tcp_tracker.on('http request complete', that.onHttpRequestComplete);
		tcp_tracker.on('http response', that.onHttpResponse);
		tcp_tracker.on('http response body', that.onHttpResponseBody);
		tcp_tracker.on('http response complete', that.onHttpResponseComplete);
		pcapSession.on('packet', that.onPacket);
	},
	that.start = function (device, filter, buffersize) { 
		init();
		buffersize = buffersize || 1024;
		pcapSession = pcap.createSession(device, filter, buffersize);
		//pcapSession = pcap.createOfflineSession(device, filter);
		
		tcp_tracker.on('http request', that.onHttpRequest);
		tcp_tracker.on('http request body', that.onHttpRequestBody);
		tcp_tracker.on('http request complete', that.onHttpRequestComplete);
		tcp_tracker.on('http response', that.onHttpResponse);
		tcp_tracker.on('http response body', that.onHttpResponseBody);
		tcp_tracker.on('http response complete', that.onHttpResponseComplete);
		pcapSession.on('packet', that.onPacket);
	};
	
	that.getFlow = function () {
		return flow;
	};
	
	that.save = function (filename, callback) {
		fs.open(filename, "w+", "0666", function (err, fd) {
			if (err) {
				throw err;
			}
			var buf = new Buffer(JSON.stringify(flow, null, 4), encoding='utf8');
			fs.write(fd, buf, 0, buf.length, 0, function(err, written) {
				fs.close(fd, callback);
			});
		});
	};
	
	that.onPacket = function (rawPacket) { 
		var packet = pcap.decode.packet(rawPacket); 
		tcp_tracker.track_packet(packet);
	};
	
	that.onHttpRequest = function (session, http) {
	//	console.log("onHttpRequest");
	//	console.log(http);
		http.request.body = "";
	};
	that.onHttpRequestBody = function (session, http, data) {
	//	console.log("onHttpRequestBody"); 
		http.request.body += data.toString("utf8");
	};
	that.onHttpRequestComplete = function (session, http) {
	//	console.log("onHttpRequestComplete")
		
	};
	
	that.onHttpResponse = function (session, http) {
	//	console.log("onHttpResponse");
		http.response.body = "";
	};
	that.onHttpResponseBody = function (session, http, data) {
		//console.log("onHttpResponseBody") 
		http.response.body += data.toString("utf8"); // data.toString("utf8");
		//console.log(data);
	};
	that.onHttpResponseComplete = function (session, http) {
		//console.log("onHttpResponseComplete"); 
		flow.push({'request': http.request, 'response': http.response});  
	};
	
	that.getPcapSession = function () {
		return pcapSession;
	};
	that.stop = function () {
		pcapSession.close();
	};
	that.getStatus = function() {
		return status;
	};
	that.getDeviceName = function () {
		return pcapSession.device_name;
	};
	
	return that;
};

exports = module.exports = fixgen ;