require("../common");
var fixgen = require('fixgen'),
	suite;
		 
suite = vows.describe('Capturing packets')
suite.addBatch({
	'when instantiated': {
		topic: function () {
			return fixgen();
		},
		'it returns a value': function(topic) {
				assert.ok(typeof topic !== "undefined");
		},
		'its a object': function(topic) {
			assert.ok(topic.constructor.toString().indexOf("Object") !== -1);
		}
	},
	'when calling start-method': {
		topic: function () {
			var fix = fixgen();
			
			fix.start();
			return fix;
		},
		'it sets the internal status to capturing': function (topic) {
			assert.equal(topic.getStatus(), "capturing");
		},
		'it creates a pcap session': function (topic) {
			
		}
	}
});

exports.suite = suite;