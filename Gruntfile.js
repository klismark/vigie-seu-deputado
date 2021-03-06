module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {style: 'compressed'},
                files: {
                    'public/css/main.min.css': 'src/_sass/main.scss',
                    'public/css/congressman.min.css': 'src/_sass/congressman.scss',
                    'public/css/accessibility.min.css': 'src/_sass/accessibility.scss',
                }
            }
        },
        uglify: {
            //'public/js/main.min.js': 'public/js/main.min.js'
            build: {
                files: [{
                    expand: true,
                    src: '**/*.js',
                    dest: 'public/js',
                    cwd: 'src/js'
                }]
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
                        cwd: 'lib_frontend/font-awesome',
                        src: ['fonts/**'], 
                        dest: 'public/'
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
                        dest: 'public/js/lib/',
                        dot: true
                    },
                    {
                        expand: true,
                        cwd: 'lib_frontend/annyang/dist',
                        src: [
                            'annyang.min.js',
                            'annyang.min.map'
                        ],
                        dest: 'public/js/lib/',
                        dot: true
                    },
                    {
                        expand: true,
                        cwd: 'lib_frontend/highcharts',
                        src: [
                            'highcharts.js'
                        ],
                        dest: 'public/js/lib/',
                        dot: true
                    },
                    {
                        expand: true,
                        cwd: 'lib_frontend/bootstrap/dist/js',
                        src: [
                            'bootstrap.min.js',
                        ],
                        dest: 'public/js/lib/',
                        dot: true
                    },
                    {
                        expand: true,
                        cwd: 'lib_frontend/bootstrap/dist/css',
                        src: [
                            'bootstrap.min.css',
                            'bootstrap.min.css.map'
                        ],
                        dest: 'public/css',
                        dot: true
                    },
                    {
                        expand: true,
                        cwd: 'lib_frontend/vue/dist/',
                        src: [
                            'vue.min.js'
                        ],
                        dest: 'public/js/lib/',
                        dot: true
                    },
                    {
                        expand: true,
                        cwd: 'lib_frontend/firebase/',
                        src: [
                            'firebase.js'
                        ],
                        dest: 'public/js/lib/',
                        dot: true
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            'robots.txt',
                            'sitemap.xml'
                        ],
                        dest: 'public',
                        dot: true
                    },
                    {
                        expand: true,
                        cwd: 'lib_frontend/bootstrap/dist/fonts',
                        src: [
                            '**'
                        ],
                        dest: 'public/fonts',
                        dot: true
                    }
                ]
            }
        },
        concat: {
            basic_and_extras: {
                files: {
                  'public/css/home.css': ['public/css/font-awesome.min.css','public/css/bootstrap.min.css','public/css/main.min.css'],
                  'public/css/congressman.css': ['public/css/font-awesome.min.css','public/css/bootstrap.min.css','public/css/congressman.min.css'],
                  'public/css/accessibility.css': ['public/css/font-awesome.min.css','public/css/bootstrap.min.css','public/css/accessibility.min.css'],
                },
              }
        },
        cssmin: {
          options: {
              shorthandCompacting: false,
              roundingPrecision: -1
          },
          target: {
              files: {
                'public/css/home.css': ['public/css/home.css'],
                'public/css/congressman.css': ['public/css/congressman.css'],
                'public/css/accessibility.css': ['public/css/accessibility.css']
              }
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
                        dest: 'public/',
                    }],
            }
        },
        rename: {
            main: {
                files: [
                    //{src: ['public/index.ejs'], dest: 'public/index.html'},
                    ]
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

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    

    grunt.registerTask('default', ['sass', 'uglify','copy','concat','cssmin','htmlmin','rename', 'imagemin']);
};
