'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
    function($stateProvider) {

        var genResolveRandomBooleanAsync = function() {
            return function($timeout, $q) {
                var dfd = $q.defer();
                $timeout(function() {
                    dfd.resolve(true);
                }, 50);
                return dfd.promise;
            };
        };

        // Articles state routing
        $stateProvider.
        state('listArticles', {
            url: '/articles',
            views: {
                '': {
                    templateUrl: 'modules/articles/views/list-articles.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('createArticle', {
            url: '/articles/create',
            views: {
                '': {
                    templateUrl: 'modules/articles/views/create-article.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('viewArticle', {
            url: '/articles/:articleId',
            views: {
                '': {
                    templateUrl: 'modules/articles/views/view-article.client.view.html',
                    resolve: {
                        fbLike: genResolveRandomBooleanAsync()
                    },
                    controller: 'ViewArticlesController'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_relevant.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            }
        }).
        state('editArticle', {
            url: '/articles/:articleId/edit',
            views: {
                '': {
                    templateUrl: 'modules/articles/views/edit-article.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        });
    }
]);
