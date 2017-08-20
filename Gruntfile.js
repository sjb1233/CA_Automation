module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        execute: {
            parse: {
                src: ['./Code/Parse.js']
            },
            priority_school: {
                src: ['./Code/Priority_School.js']
            },
            clean: {
                src: ['./Code/Clean.js']
            },
            priority_country: {
                src: ['./Code/Priority_Country.js']
            },
            match: {
                src: ['./Code/executeMatching.js']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-execute');

    // Default task(s).
    grunt.registerTask('parse', ['execute:clean', 'execute:parse', 'execute:priority_school', 'execute:priority_country']);


    grunt.registerTask('parse_form', ['execute:parse']);
    grunt.registerTask('parse_school_priority', ['execute:priority_school']);
    grunt.registerTask('parse_country_priority', ['execute:priority_country']);
    grunt.registerTask('clean', ['execute:clean'])
    grunt.registerTask('match', ['execute:match'])

};