'use strict';

module.exports = {
    app: {
        title: 'Skra-punk',
        description: 'Full-Stack',
        keywords: 'MongoDB, Express, AngularJS, Node.js'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'swig',
    sessionSecret: 'MEAN',
    sessionCollection: 'sessions',
    assets: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/font-awesome/css/font-awesome.css',
                'public/lib/bootstrap-social/bootstrap-social.css'
            ],
            js: [
                'public/lib/angular/angular.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-ui-utils/ui-utils.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/ckeditor/ckeditor.js',
                'public/lib/angular-ckeditor/angular-ckeditor.js',
                'public/lib/underscore/underscore.js',
                'public/lib/angular-easyfb/angular-easyfb.js',
                'public/lib/angular-google-analytics/dist/angular-google-analytics.js',
                'public/lib/ng-droplet/dist/ng-droplet.js'
            ]
        },
        css: [
            'public/modules/**/css/*.css'
        ],
        js: [
            'public/config.js',
            'public/application.js',
            'public/modules/*/*.js',
            'public/modules/*/*[!tests]*/*.js'
        ],
        tests: [
            'public/lib/angular-mocks/angular-mocks.js',
            'public/modules/*/tests/*.js'
        ]
    }
};
