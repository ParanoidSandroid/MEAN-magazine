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
                templateUrl: 'modules/core/views/home.client.view.html'
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
