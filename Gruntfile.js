'use strict';

/* jshint -W098 */

module.exports = function (grunt) {

	var vm = require('vm');
	var path = require('path');
	var assert = require('assert');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.loadTasks('tasks');

	grunt.initConfig({
		clean: {
			test: ['./test/*/tmp']
		},
		jshint: {
			options: grunt.util._.extend(grunt.file.readJSON('.jshintrc'), {
				reporter: './node_modules/jshint-path-reporter'
			}),
			all: [
				'Gruntfile.js',
				'tasks/**/*.js'
			]
		},
		es6now: {
			basic: {
				fail: false,
				expected: [
					'Foo.js'
				],
				options: {
					module: true
				},
				src: ['./test/basic/src/*.js'],
				dest: './test/basic/tmp'
			},
			bad: {
				fail: /^Warning: Unexpected token export/,
				options: {
					module: false
				},
				src: ['./test/bad/src/*.js'],
				dest: './test/bad/tmp'
			}
		}
	});

	var tasks = [];
	var verify = [];

	grunt.util._.forEach(grunt.config.get('es6now'), function (value, key, obj) {
		var name = 'es6now:' + key;
		if (!value.fail) {
			tasks.push(name);
			verify.push({
				key: key,
				value: value
			});
		}
		else {
			var task = 'fail-' + name;
			tasks.push(task);

			grunt.registerTask(task, function () {
				var done = this.async();
				var options = {
					grunt: true,
					args: [name, '--no-color']
				};
				grunt.util.spawn(options, function (error, result, code) {
					var stdout = String(result.stdout);
					var stderr = String(result.stderr);
					if (stdout) {
						grunt.log.writeln('--stdout--');
						grunt.log.writeln(stdout);
						grunt.log.writeln('----');
					}
					if (stderr) {
						grunt.log.writeln('--stderr--');
						grunt.log.writeln(stderr);
						grunt.log.writeln('----');
					}
					if (code !== 0) {
						var check = stdout.match(/^.*\r?\n(.+?) Use --force to continue\.[\r?\n$]/)[1];
						if (!value.fail.test(check)) {
							grunt.log.warn('failed but expected "' + check + '" to match ' + value.fail);
							done(false);
						}
						else {
							grunt.log.ok('properly failed ' + name);
							done(true);
						}
					}
					else {
						grunt.log.warn('expected task to fail: ' + name);
						done(false);
					}
				});
			});
		}
	});

	grunt.registerTask('verify', function () {
		var bad = [];
		verify.forEach(function (job) {
			assert.ok(job.value.expected);
			job.value.expected.forEach(function (expect) {
				var p = path.join(process.cwd(), 'test', job.key, 'tmp', expect);
				if (!grunt.file.exists(p)) {
					bad.push(job.key + ' missing: ' + p);
				}
				else {
					var code = grunt.file.read(p);
					var context = vm.createContext({});
					try {
						vm.runInContext(code, context, p);
					}
					catch (e) {
						if (e.name !== 'ReferenceError') {
							bad.push(job.key + ': ' + e.name + ':' + e.message);
						}
					}
				}
			});
		});
		if (bad.length > 0) {
			bad.forEach(function (str) {
				grunt.log.writeln('>> '.red + str);
			});
			return false;
		}
	});

	grunt.registerTask('tasks', tasks);

	grunt.registerTask('test', ['clean', 'jshint', 'tasks', 'verify']);

	grunt.registerTask('default', ['test']);
};
