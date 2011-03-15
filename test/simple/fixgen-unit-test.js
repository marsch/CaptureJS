require ("../common");
var fixgen = require('fixgen');

suite1 = vows.describe('Fixgen Unit Tests');
suite1.addBatch({
	'GIVEN the Fixgen class is instantiated with FilterOptions': {
		topic: function () {
			this.FIXGEN_OPTIONS = {
				outputfile: "/tmp/testfile.json", 
				filter_method: "POST",
				filter_hostname: "ox.sourcegarden.de",
				filter_url: "/ajax",
				filter_user_agent: "Chrome",
				filter_content_type: "json"
			}
			this.FIXGEN = fixgen(this.FIXGEN_OPTIONS);
			return this.FIXGEN;
		},
		'AND the init-Method is called': {
			topic: function (test) {
				test.init();
				return test;
			},
			'THEN getOptions().filter_method returns the correct RegExp-Object': function (test) {
				assert.strictEqual(test.getOptions().filter_method.toString(), new RegExp(this.FIXGEN_OPTIONS.filter_method).toString());
			},
			'THEN getOptions().filter_hostname returns the correct RegExp-Object': function (test) {
				assert.strictEqual(test.getOptions().filter_hostname.toString(), new RegExp(this.FIXGEN_OPTIONS.filter_hostname).toString());
			},
			'THEN getOptions().filter_url returns the correct RegExp-Object': function (test) {
				assert.strictEqual(test.getOptions().filter_url.toString(), new RegExp(this.FIXGEN_OPTIONS.filter_url).toString());
			},
			'THEN getOptions().filter_user_agent returns the correct RegExp-Object': function (test) {
				assert.strictEqual(test.getOptions().filter_user_agent.toString(), new RegExp(this.FIXGEN_OPTIONS.filter_user_agent).toString());
			},
			'THEN getOptions().filter_content_type returns the correct RegExp-Object': function (test) {
				assert.strictEqual(test.getOptions().filter_content_type.toString(), new RegExp(this.FIXGEN_OPTIONS.filter_content_type).toString());
			},
			'AND the matchesFilter method is called with matching param': {
				topic: function (test) {
					var mockHttp = { 
						request: { 
							headers: {
								Host: this.FIXGEN_OPTIONS.filter_hostname,
								"User-Agent": this.FIXGEN_OPTIONS.filter_user_agent
							},
							method: this.FIXGEN_OPTIONS.filter_method,
							url: this.FIXGEN_OPTIONS.filter_url
						}, 
						response: {
							headers: {
								"Content-Type": this.FIXGEN_OPTIONS.filter_content_type
							}
						}
					};
					return test.matchesFilter(mockHttp);
				},
				'THEN it SHOULD return true': function (topic) {
					assert.ok(topic, "filter matches the given object");
				}
			},
			'AND the matchesFilter method is called with no matching param': {
				topic: function(test) {
					var mockHttp = { 
						request: { 
							headers: {
								Host: this.FIXGEN_OPTIONS.filter_hostname,
								"User-Agent": "no one knows"
							},
							method: this.FIXGEN_OPTIONS.filter_method,
							url: this.FIXGEN_OPTIONS.filter_url
						}, 
						response: {
							headers: {
								"Content-Type": "other"
							}
						}
					};
					return test.matchesFilter(mockHttp);
				},
				'THEN it SHOULD return false': function (topic) {
					assert.ok(!topic, "filter does not match the given Object");
				}
			}
		}
	}
});

exports.suite1 = suite1;