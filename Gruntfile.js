var nodeSass = require('node-sass');
var loadGruntTasks = require('load-grunt-tasks');

module.exports = function(grunt){
    loadGruntTasks(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlhint: {
            all: ['public/src/index.html', 'public/src/**/*.html']
        },
        stylelint: {
            options: {
                configFile: 'etc/.stylelint'
            },
            sass: {
                all: 'public/src/**/*.scss'
            },
            css: {
                all: 'public/src/**/*.css'
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'public/src/**/*.js']
        },
        htmlmin: {
            options: {
                    compress: true,
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
            },
            dist: {
                src:'public/src/index.html',
                dest:'public/dist/index.html'
            }
        },
        ngtemplates: {
            app: {
                cwd: 'public/src/app',
                src: ['views/**/*.html'],
                dest: 'public/src/app.templates.js',
                options: {
                    module: 'app',
                    htmlmin: '<%= htmlmin.options %>'
                }
            }
        },
        sass: {
            options: {
                implementation: nodeSass,
                sourceMap: true
            },
            dist: {
               src: 'public/src/sass/main.scss',
               dest: 'public/src/css/main.css'
            }
        },
        cssmin: {
            options: {
                sourceMap: true
            },
            libs: {
                src: [

                ],
                dest:'public/dist/css/libs.css'
            },
            dist: {
                src: [
                    'public/src/css/main.css'
                ],
                dest:'public/dist/css/main.min.css'
            }
        },
        uglify: {
            options: {
                compress: true,
                removeComments: true,
                mangle: {
                    reserved: [
                        '$stateProvider',
                        '$urlRouterProvider'
                    ]
                }
            },
            libs: {
                src: [
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/@fortawesome/fontawesome-free/js/all.js',
                    'node_modules/angular/angular.js',
                    'node_modules/angular-animate/angular-animate.js',
                    'node_modules/@uirouter/angularjs/release/angular-ui-router.js'
                ],
                dest: 'public/dist/js/libs.js'
            },
            dist: {
                src: [
                    'public/src/app.js',
                    'public/src/app.templates.js',
                    'public/src/app/**/*.js'
                ],
                dest: 'public/dist/app.js'
            }
        },
        express: {
            all: {
                options: {
                    port: 9001,
                    hostname: '0.0.0.0',
                    bases: ['public/dist'],
                    livereload: true
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= express.all.options.port %>'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            gruntfile: {
                files: [
                    'Gruntfile.js'
                ],
                tasks: [
                    'htmlhint',
                    'htmlmin',
                    'stylelint:sass',
                    'sass',
                    'stylelint:css',
                    'jshint',
                    'uglify:dist'
                ]
            },
            html: {
                files: [
                    'public/src/**/*.html'
                ],
                tasks: [
                    'htmlhint',
                    'htmlmin',
                    'ngtemplates',
                    'jshint',
                    'uglify:dist'
                ]
            },
            sass: {
                files: [
                    'public/src/**/*.scss'
                ],
                tasks:[
                    'stylelint:sass',
                    'sass',
                    'stylelint:css',
                    'cssmin'
                ]
            },
            js: {
                files: [
                    'public/src/**/*.js'
                ],
                tasks: [
                    'jshint',
                    'uglify:dist'
                ]
            }
        }
    });

    grunt.registerTask('serve', [
        'htmlhint',
        'htmlmin',
        'ngtemplates',
        'stylelint:sass',
        'sass',
        'stylelint:css',
        'cssmin',
        'uglify',
        'express',
        'open',
        'watch'
    ]);
};