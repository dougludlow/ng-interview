//jshint strict: false
module.exports = function(config) {
	config.set({

		basePath: './app',

		files: [
			'bower_components/url-join/lib/url-join.js',
			'bower_components/angular/angular.js',
			'**/*.module.js',
			'**/*.js'
		],

		exclude: [
			'bower_components/**/!(angular.js|angular-route.js|angular-mocks.js|url-join.js)'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: [
			// 'Chrome',
			'PhantomJS'
		],

		reporters: [
			// 'coverage',
			'spec'
		],

		plugins: [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-junit-reporter',
			'karma-spec-reporter',
			'karma-coverage'
		],

		preprocessors: {
			'app.*.js': ['coverage'],
			'!(bower_components)/**/*.js': ['coverage']
		},

		junitReporter: {
			outputFile: '../test_out/unit.xml',
			suite: 'unit'
		},

		coverageReporter: {
			dir: '../test_out/',
			type: 'html'
		}

	});
};
