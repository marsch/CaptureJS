require ("../common");

var compress = require("node-compress/lib/compress");

suite1 = vows.describe('Simple Tests with node-compress');
suite1.addBatch({
	'GIVE a compressed string is decompressed': {
		topic: function () {
			var gunzip = new compress.Gunzip;
			gunzip.init();  
			var decoded = gunzip.inflate(this.FIX, "binary");
			var end = gunzip.end();
			var decoded_total = decoded+end;
			return decoded_total;
		},
		'THEN the decompressed string SHOULD be greater then the compressed string': function (topic) {
			console.log(topic);
			assert.ok((topic.length > this.FIX.length));
		}
	}
	
});
exports.suite1 = suite1;

