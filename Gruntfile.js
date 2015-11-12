module.exports = function(grunt) {

    grunt.initConfig({

        // gather inputs to customize the theme
        // TODO error checking for theme name. Theme name should be one word since a slugify function is currently not implemented.
        // TODO sanitize user inputs for values that have white space.
 
        prompt: {
            name: {
                options: {
                    questions: [{
                        config: 'config.name',
                        type: 'input',
                        message: 'What is the name of your theme?', 
                        default: '_s'
                    }, {
                        config: 'config.url',
                        type: 'input',
                        message: 'What is the URL of your theme?',
                        default: 'http://underscores.me'
                    }, {
                        config: 'config.author',
                        type: 'input',
                        message: 'What is your name?',
                        default: 'Automattic'
                    }, {
                        config: 'config.authoruri',
                        type: 'input',
                        message: 'What is your URL?',
                        default: 'http://automattic.com/'
                    }, {
                        config: 'config.description',
                        type: 'input',
                        message: 'Enter the theme description:',
                        default: 'A starter theme based on _s'
                    }]
                }
            }
        },

        // set up a work directory and download components for the theme

        shell: {
            setup: {
                command: 'mkdir -p lib',
                options: {
                    stdout: true
                }

            },
            bootstrap: {
                options: {
                    stderr: false,
                    execOptions: {
                        cwd: 'lib'
                    }
                },
                command: 'git clone https://github.com/twbs/bootstrap-sass.git'
            },
            underscore: {
                options: {
                    stderr: false,
                    execOptions: {
                        cwd: 'lib'
                    }
                },
                command: 'git clone https://github.com/Automattic/_s.git'
            },
            wp_navwalker: {
                options: {
                    stderr: false,
                    execOptions: {
                        cwd: 'lib'
                    }
                },
                command: 'git clone https://github.com/twittem/wp-bootstrap-navwalker.git'
            }
        },

        // customize the theme and copy over to final directory
        // TODO sanitize user inputs for values that have white space
        // TODO replace automatic link in footer.php

        replace: {
            mvtheme: {
                options: {
                    patterns: [{
                        match: /('_s')/g,
                        replacement: "'" + '<%= config.name %>' + "'", // slugify?

                    }, {
                        match: /(_s_)/g,
                        replacement: '<%= config.name %>' + '_', // _underscored?

                    }, {
                        match: /(\s_s)/g,
                        replacement: ' ' + '<%= config.name %>',

                    }, {
                        match: /(_s-)/g,
                        replacement: '<%= config.name %>' + '-', // slugify?

                    }]
                },
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: 'lib/_s/',
                    src: ['**/*.php', '**/*.css', '**/*.pot',  '**/*.png', '!style.css', '!**/sass/**', '!**/layouts/**', '!readme.txt', '!README.md'],
                    dest: '<%= config.name %>'
                }]
            },

            mvstyle: {
                options: {
                    patterns: [{
                        match: /(Theme Name:)/,
                        replacement: '$1 ' + '<%= config.name %>',
                    }, {
                        match: /(Theme URI:)/,
                        replacement: '$1 ' + '<%= config.url %>',
                    }, {
                        match: /(Author: )/g,
                        replacement: '$1 ' + '<%= config.author %>',

                    }, {
                        match: /(Author URI: )/g,
                        replacement: '$1 ' + '<%= config.authoruri %>',

                    }, {
                        match: /(Description: )/g,
                        replacement: '$1 ' + '<%= config.description %>',

                    }]
                },
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: 'templates',
                    src: ['style.scss'],
                    dest: '<%= config.name %>' + '/assets/'
                },{
                    expand: true,
                    flatten: false,
                    cwd: 'templates',
                    src: ['style.css'],
                    dest: '<%= config.name %>'
                }]
            },

        },


        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        dest: '<%= config.name %>' + '/assets/',
                        src: ['**'],
                        cwd: 'lib/bootstrap-sass/assets'
                    }, {
                        expand: true,
                        dest: '<%= config.name %>' + '/assets/',
                        src: ['bootstrap.min.js'],
                        cwd: '/lib/bootstrap-sass/assets/javascripts/'
                    },{
                        expand: true,
                        dest: '<%= config.name %>' + '/assets/',
                        src: ['**/*.scss'],
                        cwd: 'templates'
                    },{
                        expand: true,
                        dest: '<%= config.name %>' + '/inc/',
                        src: ['lib/wp-bootstrap-navwalker/wp_bootstrap_navwalker.php'],
                        cwd: 'templates'
                    }, {
                        expand: true,
                        dest: '<%= config.name %>' + '/js/',
                        src: ['**.*'],
                        cwd: 'lib/_s/js'
                    },{
                        expand: true,
                        dest: '<%= config.name %>',
                        src: ['package.json', 'Gruntfile.js', 'readme.txt', 'README.md'],
                        cwd: 'templates'
                    },{
                        expand: true,
                        dest: '<%= config.name %>' + '/js/',
                        src: ['_theme.js'],
                        cwd: 'templates/',
                        rename: function(dest, src) {
                                return dest + src.replace("_theme.js", "theme.js");
                            }
                    }, {
                        expand: true,
                        dest: '<%= config.name %>',
                        src: ['package.json'],
                        cwd: 'templates/',
                    }
                ],
                options: {
                    process: function(content, srcpath) {
                        return content.replace(/config.name([^"]*)/g, grunt.config('config.name'));
                    }
                },

            }
        },
    });

    /* instead of grunt.loadNpmTasks(); */

    require('load-grunt-tasks')(grunt);

    grunt.registerTask("download-assets", ["shell"]);

    grunt.registerTask("replace-theme", ["replace"]);

    grunt.registerTask("build", ["copy"]);

    grunt.registerTask('default', ['prompt', 'download-assets', 'replace-theme', 'build']);

};