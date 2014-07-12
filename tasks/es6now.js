'use strict';

/* jshint -W098 */

module.exports = function (grunt) {

	var path = require('path');
	var es6now = require('es6now');

	function compile(job) {
		var source = grunt.file.read(job.src);
		var output = es6now.translate(source, job.options);
		grunt.file.write(job.dest, output);
	}

	grunt.registerMultiTask('es6now', 'Compile ES6 to ES5.', function () {
		var options = this.options({
			module: false,
			runtime: false,
			wrap: false,
			global: null
		});

		var success = true;
		var jobs = [];

		this.files.forEach(function (f) {
			f.src.forEach(function (src) {
				if (!grunt.file.exists(src)) {
					grunt.fail.warn('File "' + src + '" not found.');
					return;
				}
				var srcR = path.resolve(src);
				var destR = path.join(path.resolve(f.dest), path.basename(src));
				if (srcR === destR) {
					grunt.fail.warn('Cannot overwrite "' + src + '".');
					return;
				}
				jobs.push({
					src: srcR,
					dest: destR,
					options: options
				});
			});
		});

		jobs.forEach(function (job) {
			compile(job);
		});

		return success;
	});

};
