require("../common");
var fs = require('fs');

var FIX_REQUEST_1 = { 
	headers: { 
		'User-Agent': 'curl/7.21.2 (x86_64-apple-darwin10.5.0) libcurl/7.21.2 OpenSSL/1.0.0c zlib/1.2.5 libidn/1.19',
        Host: 'www.google.de',
        Accept: '*/*' 
	 },
     url: '/',
     method: 'GET',
     body_len: 0,
     http_version: '1.1',
	 body: ''
};


var FIX_RESPONSE_1 = { 
	headers: { 
		'Date': 'Wed, 09 Mar 2011 11:41:32 GMT',
        'Expires': '-1',
        'Cache-Control': 'private, max-age=0',
        'Content-Type': 'text/html; charset=ISO-8859-1',
        'Set-Cookie': 'NID=44=Bw8ED1I1peS0QrhY9J3DDtYQPr4csh-pfTxPT31pW4yZPGM8zZ5ON02ld44g2h2CQpw5R5xCsH_zRP0-ky0sF8ollIBzbTYjfi6auuSt22Ozl3ShBRJBU7JNcEPK4e4r; expires=Thu, 08-Sep-2011 11:41:32 GMT; path=/; domain=.google.de; HttpOnly',
        'Server': 'gws',
        'X-XSS-Protection': '1; mode=block',
        'Transfer-Encoding': 'chunked' 
	},
    status_code: 200,
    body_len: 9170,
    http_version: '1.1',
    body: "<!doctype html><html><head><meta http-equiv=\"content-type\" content=\"text/html; charset=ISO-8859-1\"><title>Google</title><script>window.google={kEI:\"bGd3Tf64IYjzsgaextXbDg\",kEXPI:\"28461,29006,29013,29095\",kCSI:{e:\"28461,29006,29013,29095\",ei:\"bGd3Tf64IYjzsgaextXbDg\",expi:\"28461,29006,29013,29095\"},ml:function(){},kHL:\"de\",time:function(){return(new Date).getTime()},log:function(c,d,\nb){var a=new Image,e=google,g=e.lc,f=e.li;a.onerror=(a.onload=(a.onabort=function(){delete g[f]}));g[f]=a;b=b||\"/gen_204?atyp=i&ct=\"+c+\"&cad=\"+d+\"&zx=\"+google.time();a.src=b;e.li=f+1},lc:[],li:0,Toolbelt:{}};\nwindow.google.sn=\"webhp\";var i=window.google.timers={};window.google.startTick=function(a,b){i[a]={t:{start:(new Date).getTime()},bfr:!(!b)}};window.google.tick=function(a,b,c){if(!i[a])google.startTick(a);i[a].t[b]=c||(new Date).getTime()};google.startTick(\"load\",true);try{}catch(v){}\nwindow.google.jsrt_kill=1;\nvar _gjwl=location;function _gjuc(){var e=_gjwl.href.indexOf(\"#\");if(e>=0){var a=_gjwl.href.substring(e);if(a.indexOf(\"&q=\")>0||a.indexOf(\"#q=\")>=0){a=a.substring(1);if(a.indexOf(\"#\")==-1){for(var c=0;c<a.length;){var d=c;if(a.charAt(d)==\"&\")++d;var b=a.indexOf(\"&\",d);if(b==-1)b=a.length;var f=a.substring(d,b);if(f.indexOf(\"fp=\")==0){a=a.substring(0,c)+a.substring(b,a.length);b=c}else if(f==\"cad=h\")return 0;c=b}_gjwl.href=\"/search?\"+a+\"&cad=h\";return 1}}}return 0}function _gjp(){!(window._gjwl.hash&&\nwindow._gjuc())&&setTimeout(_gjp,500)};\nwindow._gjp && _gjp()</script><style id=gstyle>body{margin:0}#gog{padding:3px 8px 0}td{line-height:.8em}.gac_m td{line-height:17px}form{margin-bottom:20px}body,td,a,p,.h{font-family:arial,sans-serif}.h{color:#36c;font-size:20px}.q{color:#00c}.ts td{padding:0}.ts{border-collapse:collapse}em{font-weight:bold;font-style:normal}.lst{height:25px;width:496px}.ds{border-bottom:solid 1px #e7e7e7;border-right:solid 1px #e7e7e7;display:-moz-inline-box;display:inline-block;margin:3px 0 4px;margin-left:4px}input{font-family:inherit}a.gb1,a.gb2,a.gb3,a.gb4{color:#11c !important}#gbar,#guser{font-size:13px;padding-top:1px !important}#gbar{height:22px}#guser{padding-bottom:7px !important;text-align:right}.gbh,.gbd{border-top:1px solid #c9d7f1;font-size:1px}.gbh{height:0;position:absolute;top:24px;width:100%}@media all{.gb1{height:22px;margin-right:.5em;vertical-align:top}#gbar{float:left}}a.gb1,a.gb4{color:#00c !important}body{background:#fff;color:black}input{-moz-box-sizing:content-box}a{color:#11c;text-decoration:none}a:hover,a:active{text-decoration:underline}.fl a{color:#36c}a:visited{color:#551a8b}a.gb1,a.gb4{text-decoration:underline}a.gb3:hover{text-decoration:none}#ghead a.gb2:hover{color:#fff!important}.sblc{padding-top:5px}.sblc a{display:block;margin:2px 0;margin-left:13px;font-size:11px;}.lsbb{background:#eee;border:solid 1px;border-color:#ccc #999 #999 #ccc;height:30px;display:block}.ftl,#fll a{display:inline-block;margin:0 12px}.lsb{background:url(/images/srpr/nav_logo37.png) bottom;border:none;color:#000;cursor:pointer;height:30px;margin:0;outline:0;font:15px arial,sans-serif;vertical-align:top}.lsb:active{background:#ccc}.lst:focus{outline:none}#addlang a{padding:0 3px}.gac_v div{display:none}.gac_v .gac_v2,.gac_bt{display:block!important}</style><script>google.y={};google.x=function(e,g){google.y[e.id]=[e,g];return false};</script></head><body bgcolor=#ffffff text=#000000 link=#0000cc vlink=#551a8b alink=#ff0000 onload=\"document.f.q.focus();if(document.images)new Image().src='/images/srpr/nav_logo37.png'\" ><textarea id=csi style=display:none></textarea><div id=ghead><div id=gbar><nobr><b class=gb1>Web</b> <a onclick=gbar.qs(this) href=\"http://www.google.de/imghp?hl=de&tab=wi\" class=gb1>Bilder</a> <a onclick=gbar.qs(this) href=\"http://video.google.de/?hl=de&tab=wv\" class=gb1>Videos</a> <a onclick=gbar.qs(this) href=\"http://maps.google.de/maps?hl=de&tab=wl\" class=gb1>Maps</a> <a onclick=gbar.qs(this) href=\"http://news.google.de/nwshp?hl=de&tab=wn\" class=gb1>News</a> <a onclick=gbar.qs(this) href=\"http://www.google.de/prdhp?hl=de&tab=wf\" class=gb1>Shopping</a> <a href=\"http://mail.google.com/mail/?hl=de&tab=wm\" class=gb1>E-Mail</a> <a href=\"http://www.google.de/intl/de/options/\" class=gb1 style=\"text-decoration:none\"><u>Mehr</u> &raquo;</a></nobr></div><div id=guser width=100%><nobr><span id=gbn class=gbi></span><span id=gbf class=gbf></span><span id=gbe><a href=\"/url?sa=p&pref=ig&pval=3&q=http://www.google.de/ig%3Fhl%3Dde%26source%3Diglk&usg=AFQjCNFjfPavRPBJrOKJS3MB2uzhpfN6zw\" class=gb4>iGoogle</a> | </span><a href=\"/preferences?hl=de\" class=gb4>Einstellungen</a> | <a href=\"https://www.google.com/accounts/Login?hl=de&continue=http://www.google.de/\" class=gb4>Anmelden</a></nobr></div><div class=gbh style=left:0></div><div class=gbh style=right:0></div></div><center><br clear=all id=lgpd><div id=lga><div style=\"padding:28px 0 3px\"><div align=left style=\"background:url(/intl/en_com/images/srpr/logo1w.png) no-repeat;height:110px;width:276px\" title=\"Google\" id=hplogo onload=\"window.lol&&lol()\"><div nowrap style=\"color:#777;font-size:16px;font-weight:bold;left:214px;position:relative;top:70px\">Deutschland</div></div></div><br></div><form action=\"/search\" name=f><table cellpadding=0 cellspacing=0><tr valign=top><td width=25%>&nbsp;</td><td align=center nowrap><input name=hl type=hidden value=de><input name=source type=hidden value=hp><input type=hidden name=ie value=\"ISO-8859-1\"><div class=ds style=\"height:32px;margin:4px 0\"><input autocomplete=off maxlength=2048 name=q class=\"lst\" title=\"Google-Suche\" value=\"\" size=57 style=\"background:#fff;border:1px solid #ccc;border-bottom-color:#999;border-right-color:#999;color:#000;font:18px arial,sans-serif bold;margin:0;padding:5px 8px 0 6px;vertical-align:top\"></div><br style=\"line-height:0\"><span class=ds ><span class=lsbb><input name=btnG type=submit value=\"Google-Suche\" class=lsb></span></span><span class=ds><span class=lsbb><input name=btnI type=submit value=\"Auf gut Gl�ck!\" class=lsb></span></span></td><td nowrap width=25% align=left class=\"fl sblc\"><a href=\"/advanced_search?hl=de\">Erweiterte Suche</a><a href=\"/language_tools?hl=de\">Sprachtools</a></td></tr></table></form><div style=\"font-size:83%;min-height:3.5em\"><br></div><div id=res></div><span id=footer><center id=fctr><div style=\"font-size:10pt\"><div id=fll style=\"margin:19px auto 19px auto;text-align:center\"><a href=\"/intl/de/ads/\">Werben mit Google</a><a href=\"/services/\">Unternehmensangebote</a><a href=\"/intl/de/about.html\">�ber Google</a><a href=\"http://www.google.com/ncr\">Google.com in English</a></div></div><p style=\"color:#767676;font-size:8pt\">&copy; 2011 - <a href=\"/intl/de/privacy.html\">Datenschutz</a></p></center></span> <div id=xjsd></div><div id=xjsi><script>if(google.y)google.y.first=[];google.dlj=function(b){window.setTimeout(function(){var a=document.createElement(\"script\");a.src=b;document.getElementById(\"xjsd\").appendChild(a)},0)};\nif(google.y)google.y.first=[];if(!google.xjs){google.dstr=[];google.rein=[];if(google.timers&&google.timers.load.t){google.timers.load.t.xjsls=new Date().getTime();}google.dlj('/extern_js/f/CgJkZRICZGUgACswRTgALCswWjgALCswDjgALCswFzgALCswJzgALCswPDgALCswUTgALCswCjgAQB0sKzAWOAAsKzAlOM-IASwrMEA4ACwrMEE4ACwrME04ASwrME44ACwrMFQ4ACwrMGk4ACwrMBg4ACwrMCY4ACyAAjaQAjI/s60dnqr2iBQ.js');google.xjs=1}google.neegg=1;google.mc = [];google.mc = google.mc.concat([[14,{}],[60,{}],[81,{}],[78,{}],[64,{}],[105,{}],[22,{\"m_errors\":{\"32\":\"Es gibt leider keine weiteren Ergebnisse.\",\"default\":\"\\u003Cfont color=red\\u003EFehler:\\u003C/font\\u003E Der Server konnte Ihre Anforderung nicht ausf�hren. Versuchen Sie es in 30 Sekunden noch einmal.\"},\"m_tip\":\"Klicken Sie hier, um weitere Informationen zu erhalten.\"}],[84,{}],[24,{}]]);google.y.first.push(function(){try{var form=document.f||document.f||document.gs;google.ac.i(form,form.q,'','','',{lm:1,o:1,sw:1});}catch(e){google.ml(e,false,{'cause':'defer'});}if(google.med) {google.med('init');google.initHistory();google.med('history');}google.History&&google.History.initialize('/')});if(google.j&&google.j.en&&google.j.xi){window.setTimeout(google.j.xi,0);}</script></div><script>(function(){\nvar b,d,e,f;function g(a,c){if(a.removeEventListener){a.removeEventListener(\"load\",c,false);a.removeEventListener(\"error\",c,false)}else{a.detachEvent(\"onload\",c);a.detachEvent(\"onerror\",c)}}function h(a){f=(new Date).getTime();++d;a=a||window.event;var c=a.target||a.srcElement;g(c,h)}var i=document.getElementsByTagName(\"img\");b=i.length;d=0;for(var j=0,k;j<b;++j){k=i[j];if(k.complete||typeof k.src!=\"string\"||!k.src)++d;else if(k.addEventListener){k.addEventListener(\"load\",h,false);k.addEventListener(\"error\",\nh,false)}else{k.attachEvent(\"onload\",h);k.attachEvent(\"onerror\",h)}}e=b-d;function l(){if(!google.timers.load.t)return;google.timers.load.t.ol=(new Date).getTime();google.timers.load.t.iml=f;google.kCSI.imc=d;google.kCSI.imn=b;google.kCSI.imp=e;google.timers.load.t.xjs&&google.report&&google.report(google.timers.load,google.kCSI)}if(window.addEventListener)window.addEventListener(\"load\",l,false);else if(window.attachEvent)window.attachEvent(\"onload\",l);google.timers.load.t.prt=(f=(new Date).getTime());\n})();\n</script>"
};


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
		 
suite1 = vows.describe('Read PCap Files');
suite1.addBatch({
	'GIVEN a "fixgen" - constructor is called': {
		topic: function () {
			this.SUT = fixgen();
			return this.SUT;
		},
		'THEN it returns a value': function(topic) {
			assert.ok(typeof topic !== "undefined");
		},
		'THEN the returned value is a object': function(topic) {
			assert.ok(topic.constructor.toString().indexOf("Object") !== -1);
		},
		'AND the readFile-method is called': {
			topic: function (test) {
				this.NAME_OF_DEVICE = "test/simple/test.pcap";
				this.FILTER = "tcp";
 
				this.SPY_PCAP_CREATEOFFLINESESSION = sinon.spy(pcap, "createOfflineSession"); 
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
				this.SPY_ON_HTTP_RESPONSE_COMPLETE = sinon.spy(test, "onHttpResponseComplete");

				test.readFile(this.NAME_OF_DEVICE, this.FILTER);

				
				//send some contents
				var sess = test.getPcapSession(); 
				this.ORIGIN_READWATCHER_CALLBACK = sess.readWatcher.callback;  
				var me = this;
				sess.readWatcher.callback = function (a, b) { 
					me.ORIGIN_READWATCHER_CALLBACK.apply(arguments);
					me.callback(null, me.SUT);
				};
			},
			'THEN the Pcap-Session is created by called CreateOfflineSession': function (topic) {
				assert.ok(this.SPY_PCAP_CREATEOFFLINESESSION.called, "createOfflineSession method is called");
				assert.ok(this.SPY_PCAP_CREATEOFFLINESESSION.calledWith(this.NAME_OF_DEVICE, this.FILTER), "createOfflineSession is called with the right params");
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
				'THEN the resulting Array contains Objects with expected request and response-Objects': function (topic) {
					assert.deepEqual(topic[0].request, FIX_REQUEST_1);
					assert.deepEqual(topic[0].response, FIX_RESPONSE_1);
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
			'AND the store Method is called with a filename-parameter': {
				topic: function (topic) {
					topic.save("/tmp/testfile.json", this.callback);
				},
				'AND WHEN THE CONTENTS ARE READ': {
					topic: function (topic) {
						var outer = this;
						fs.readFile('/tmp/testfile.json', function (err, data) {
							if (err) throw err;
							outer.callback(null, JSON.parse(data.toString("utf8")));
						});
							
					},
					'THEN the file contents should be the same as expected': function (topic) {
						assert.deepEqual(this.SUT.getFlow(),topic);
					}
				},
				teardown: function (topic) {
					//remove the test file
				//	var fs = require('fs');
					//fs.unlinkSync('/tmp/testfile.json');
				}
			},
			teardown: function(test) {
				this.SPY_PCAP_CREATEOFFLINESESSION.restore(); 
				this.SPY_PCAP_ON.restore(); 
				this.SPY_PCAP_OPEN.restore(); 	
				this.SPY_PCAP_DECODE_PACKET.restore(); 
				this.SPY_TCP_TRACKER_ON.restore(); 
				this.SPY_TCP_TRACKER_TRACKPACKET.restore(); 
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