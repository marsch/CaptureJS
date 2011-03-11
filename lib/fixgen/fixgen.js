var fixgen = function () {
	var that = {},
		status = "inactive";
	that.start = function () {
		status = "capturing";
	};
	that.getStatus = function() {
		return status;
	};
	return that;
};

exports = module.exports = fixgen ;