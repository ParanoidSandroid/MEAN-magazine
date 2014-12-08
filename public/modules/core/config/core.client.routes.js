'use strict';

// Setting up route
angular.module('core')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // Redirect to home view when route not found
            $urlRouterProvider.otherwise('/');

            // Home state routing
            $stateProvider.
            state('home', {
                url: '/',
                views: {
                    '': {
                        templateUrl: 'modules/core/views/home.client.view.html'
                    },
                    'rightbar': {
                        templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                    },
                    'leftbar': {
                        templateUrl: 'modules/core/views/leftbar.client.view.html'
                    }
                }
            }).
            state('about', {
                url: '/about',
                views: {
                    '': {
                        templateUrl: 'modules/core/views/about.client.view.html'
                    },
                    'rightbar': {
                        templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                    },
                    'leftbar': {
                        templateUrl: 'modules/core/views/leftbar.client.view.html'
                    }
                }
            });
        }
    ])
    .run(['$rootScope', '$state', 'Authentication',
        function($rootScope, $state, Authentication) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                if (toState.hasOwnProperty('data') && toState.data.requiresLogin && !Authentication.user) {
                    event.preventDefault();
                    $state.go('home');
                    return false;
                }
            });
        }
    ]);
