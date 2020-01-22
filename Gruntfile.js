var loadGruntTasks = require('load-grunt-tasks');

module.exports = function(grunt){
    loadGruntTasks(grunt);
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlhint: {
            all: ['public/src/index.html', 'public/src/**/*.html']
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
            }
        }
    });

    grunt.registerTask('serve', [
        'htmlhint',
        'htmlmin',
        'express',
        'open',
        'watch'
    ]);
}