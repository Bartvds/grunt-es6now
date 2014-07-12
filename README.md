# grunt-es6now

> Grunt [plugin](http://gruntjs.com/) to compile ES5 to ES6 with [es6now](https://github.com/zenparsing/es6now)

[![Build Status](https://secure.travis-ci.org/Bartvds/grunt-es6now.png?branch=master)](http://travis-ci.org/Bartvds/grunt-es6now) [![Dependency Status](https://gemnasium.com/Bartvds/grunt-es6now.png)](https://gemnasium.com/Bartvds/grunt-es6now) [![NPM version](https://badge.fury.io/js/grunt-es6now.png)](http://badge.fury.io/js/grunt-es6now)

Write programs using next-generation Javascript features without having to wait for Node or browsers to fully implement ES6.

Early release, use with care :sunglasses:


## Getting Started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install grunt-es6now --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-es6now');
```

## The "grunt-es6now" task

### Default Options

Options are passed directly to [es6now](https://github.com/zenparsing/es6now) so check there for more details.

Make sure to specify a directory as the destination. Files keep their original basename unless you use grunt's rename features.

```js
grunt.initConfig({
	es6now: {
		build: {
			options: {
				// parse the input as a module (optional).
				// - default: false
				module: false,
				// include the es6now runtime library in the output (optional).
				// - default: false
				runtime: false,
				// wrap the output in COmmonJS + AMD boilerplate (optional).
				// - default: false
				wrap: false,
				// the name of the global variable (optional).
				global: null
			},
			src: ['./src/**/*.js']
			dest: './dist'
		}
	}
});
```

## History

* 0.1.0 - First release


## Contributing

Contributions are very welcome, please create an Issue before doing something major.

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## License

Copyright (c) 2014 [Bart van der Schoor](https://github.com/Bartvds)

Licensed under the MIT license.

