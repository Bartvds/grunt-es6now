'use strict';

/* jshint -W098 */

module.exports = function (grunt) {

	var path = require('path');
	var es6now = require('es6now');

	function compile(job) {
		var source = grunt.file.read(job.src);
		var output = es6now.translate(source, job.options);
		var dest = path.join(job.dest, path.basename(job.src));
		grunt.file.write(dest, output);
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
				}
				jobs.push({
					src: src,
					dest: f.dest,
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
