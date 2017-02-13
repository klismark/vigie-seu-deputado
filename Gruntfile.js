module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: "src/js/*.js",
                dest: "public/js/main.min.js"
            }
        },
        sass: {
            dist: {
                options: {style: 'compressed'},
                files: {
                    'public/css/main.min.css': 'src/_sass/main.scss',
                }
            }
        },
        uglify: {
            'public/js/main.min.js': 'public/js/main.min.js'
        },
        cssmin: {
          options: {
              shorthandCompacting: false,
              roundingPrecision: -1
          },
          target: {
              files: {
                'public/css/main.min.css': ['public/css/main.min.css']
              }
          }
        },
        copy: {
            main: {
                files: [
                    {   expand: true,
                        cwd: 'lib_frontend/font-awesome/css',
                        src: ['font-awesome.min.css','font-awesome.css.map'],
                        dest: 'public/css/'
                    },
                    {   expand: true, 
                        cwd: 'src/',
                        src: ['fonts/**'], 
                        dest: 'public/'
                    },
                    {
                        expand: true,
                        cwd: 'lib_frontend/jquery/dist',
                        src: [
                            'jquery.min.js',
                            'jquery.min.map'
                        ],
                        dest: 'public/js/',
                        dot: true
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                        expand: true,
                        cwd: 'src/',
                        src: '*.html',
                        dest: 'public_html/',
                    }],
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                        expand: true,
                        cwd: 'src/img',
                        src: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
                        dest: 'public/img',
                    }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['concat','sass', 'uglify','cssmin','copy','htmlmin', 'imagemin']);
};
