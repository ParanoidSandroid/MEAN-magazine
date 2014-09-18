/**
 * skra-punk Module
 *
 * Main module of website, used to bundle
 * all the necessary modules.
 */
angular.module('skra-punk', [
    'ezfb',
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'ngLoadScript',
    'angulartics',
    'angulartics.google.analytics',
    'home',
    'categories',
    'article',
    'tags'
])
    .config(['ezfbProvider', '$routeProvider', '$locationProvider', '$analyticsProvider',
        function(ezfbProvider, $routeProvider, $locationProvider, $analyticsProvider) {
            ezfbProvider.setInitParams({
                appId: '296559977173451',
                xfbml: true,
                version: 'v2.0'
            });
            $routeProvider
                .when('/home', {
                    controller: 'HomeCtrl',
                    controllerAs: 'home',
                    templateUrl: 'home.html'
                })
                .when('/read/:articleId', {
                    controller: 'ArticleCtrl',
                    templateUrl: 'article.html'
                })
                .when('/category/:categoryId', {
                    controller: 'CategoriesCtrl',
                    controllerAs: 'categories',
                    templateUrl: 'categories.html'
                })
                .when('/author/:authorId', {
                    controller: 'AuthorCtrl',
                    templateUrl: 'author.html'
                })
                .when('/tag/:tagId', {
                    controller: 'TagCtrl',
                    templateUrl: 'tags.html'
                })
                .otherwise({
                    redirectTo: '/home'
                });
                $analyticsProvider.virtualPageView(false);
        }
    ])
    .factory('picturesqueData', ['$http',
        function($http) {
            return {
                getPicturesque: function(callback) {
                    $http.post('/tag.php', {
                        tag_url: 'picturesque'
                    })
                        .success(callback)
                        .error(function(data, status, headers, config) {
                            console.log('Error: ' + status);
                        });
                    console.log('Sending get request to /tag.php with arg: picturesque');
                }
            };
        }
    ])
    .controller('MainCtrl', ['$scope', '$rootScope',
        function($scope, $rootScope) {
            $rootScope.categories = {
                audio: {
                    name: 'Audio',
                    url: 'audio'
                },
                visual: {
                    name: 'Visual',
                    url: 'visual'
                },
                readings: {
                    name: 'Readings',
                    url: 'readings'
                },
                pressing: {
                    name: 'Pressing',
                    url: 'pressing'
                },
                plus: {
                    name: 'Σκρα-punk Plus',
                    url: 'plus'
                },
            };
            $rootScope.current = [];
            $rootScope.featured = [];
            $rootScope.recents = [];
            $rootScope.picturesque = [];
            $rootScope.title;
            // facebook meta variables
            $rootScope.article_title;
            $rootScope.article_description;
        }
    ]);
