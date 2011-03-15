var pcap = require('pcap'),
	fs = require('fs')
	events     = require('events'),
	util = require("util");


var fixgen = function (options) {
	var that = Object.create(events.EventEmitter.prototype, { constructor: { value: {}, enumerable: false }}),
		//that.super_ = events.EventEmitter,
		tcp_tracker,
		flow,
		pcapSession,
		options = options || {};
	 
	
	that.init = function () {
		flow = [];
		tcp_tracker = new pcap.TCP_tracker();
		if (options.filter_method) {
			options.filter_method = new RegExp(options.filter_method);
		}
		if (options.filter_url) {
			options.filter_method = new RegExp(options.filter_url);
		}
		if (options.filter_hostname) {
			options.filter_hostname = new RegExp(options.filter_hostname);
		}
		if (options.filter_content_type) {
			options.filter_content_type = new RegExp(options.filter_content_type);
		}
		if (options.filter_url) {
			options.filter_url = new RegExp(options.filter_url);
		}
		if (options.filter_user_agent) {
			options.filter_user_agent = new RegExp(options.filter_user_agent);
		}
		 
	}
	
	/** shameless copy from http_tracer
	function filter_match(http) {
	    var filters = [
	        [http.request.method, options.method],
	        [http.request.url, options.url],
	        [http.request.headers.Host, options.host],
	        [http.request.headers["User-Agent"], options["user-agent"]],
	    ], filter_pair_num, filter_index;

	    if (options.method || options.host || options.url || options["user-agent"]) {
	        return filters.some(function (filter_pair) {
	            if (typeof filter_pair[1] === 'object') {
	                return filter_pair[1].some(function (filter) {
	                    return filter.test(filter_pair[0]);
	                });
	            }
	            return false;
	        });
	    } else {
	        return true; // if no filters, then everything "matches"
	    }
	}
	**/
	
	that.readFile = function (path, filter) { 
		that.init();
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
		that.init();
		buffersize = buffersize || 1024;
		pcapSession = pcap.createSession(device, filter, buffersize);
		//pcapSession = pcap.createOfflineSession(device, filter);
		
		tcp_tracker.on('http request', that.onHttpRequest);
		tcp_tracker.on('http request body', that.onHttpRequestBody);
		tcp_tracker.on('http request complete', that.onHttpRequestComplete);
		tcp_tracker.on('http response', that.onHttpResponse);
		tcp_tracker.on('http response body', that.onHttpResponseBody);
		tcp_tracker.on('http response complete', that.onHttpResponseComplete);
		tcp_tracker.on('end', that.onEnd); 
		pcapSession.on('packet', that.onPacket);
	};
	that.onEnd = function () { 
		that.emit("end", arguments[0]);
	};
	that.getFlow = function () {
		return flow;
	};
	
	that.save = function (callback) {
		if (typeof options.outputfile === "undefined" || options.outputfile === false) {
			//okay now flush to stdout 
			process.stdout.write(JSON.stringify(flow, null, 4));
			return;
		}
		fs.open(options.outputfile, "w+", "0666", function (err, fd) {
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
	
	that.matchesFilter = function (http) { 
		if(options.filter_method) {
			if (!options.filter_method.test(http.request.method)) {
				return false;
			}
		}
		if(options.filter_url) {
			if (!options.filter_url.test(http.request.url)) {
				return false;
			}
		}
		if(options.filter_hostname) {
			if (!options.filter_hostname.test(http.request.headers.Host)) {
				return false;
			}
		}
		if(options.filter_user_agent) {
			if (!options.filter_user_agent.test(http.request.headers["User-Agent"])) {
				return false;
			}
		}
		if(options.filter_content_type) {
			if (!options.filter_content_type.test(http.response.headers["Content-Type"])) { 
				return false;
			}
		}
		return true;
	};
	that.onHttpRequest = function (session, http) { 
		if (!that.matchesFilter(http)) return;
		http.request.body = "";
		if (http.request.method === "") {
			http.request.method = "GET"; //i guess this is correct
		}
	};
	that.onHttpRequestBody = function (session, http, data) { 
		if (!that.matchesFilter(http)) return;
		http.request.body += data.toString("utf8");
	};
	that.onHttpRequestComplete = function (session, http) {
	//	
	// ("onHttpRequestComplete") 
	};
	
	that.onHttpResponse = function (session, http) { 
		if (!that.matchesFilter(http)) return;
		http.response.body = "";
	};
	that.onHttpResponseBody = function (session, http, data) { 
		if (!that.matchesFilter(http)) return;
		http.response.body += data.toString("utf8"); // data.toString("utf8"); 
	};
	that.onHttpResponseComplete = function (session, http) { 
		if (!that.matchesFilter(http)) return;
		flow.push({'request': http.request, 'response': http.response});  
	
		that.save(); 
	};
	that.getOptions = function () {
		return options;
	};
	that.getPcapSession = function () {
		return pcapSession;
	};
	that.stop = function () {
		pcapSession.close();
	}; 
	that.getDeviceName = function () {
		return pcapSession.device_name;
	}; 
	return that;
}; 

exports = module.exports = fixgen;  