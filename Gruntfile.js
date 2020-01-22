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
        sass: {
            options: {
                implementation: nodeSass,
                sourceMap: true
            },
            dist: {
                files: {
                    'public/dist/css/main.min.css':'public/src/sass/main.scss'
                }
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
            html: {
                files: ['public/src/**/*.html'],
                tasks: ['htmlhint', 'htmlmin']
            },
            sass: {
                files: ['public/src/**/*.scss'],
                tasks:['stylelint:sass', 'sass', 'stylelint:css']
            }
        }
    });

    grunt.registerTask('serve', [
        'htmlhint',
        'htmlmin',
        'stylelint:sass',
        'sass',
        'stylelint:css',
        'express',
        'open',
        'watch'
    ]);
}