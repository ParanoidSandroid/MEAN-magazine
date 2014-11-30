'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
    function($stateProvider) {
        // Articles state routing
        $stateProvider.
        state('listArticles', {
            url: '/manage/articles',
            templateUrl: 'modules/articles/views/list-articles.client.view.html',
            data: {
                requiresLogin: true
            }
        }).
        state('createArticle', {
            url: '/manage/articles/create',
            templateUrl: 'modules/articles/views/create-article.client.view.html',
            data: {
                requiresLogin: true
            }
        }).
        state('viewArticle', {
            url: '/manage/articles/:articleId',
            templateUrl: 'modules/articles/views/view-article.client.view.html',
            data: {
                requiresLogin: true
            }
        }).
        state('editArticle', {
            url: '/manage/articles/:articleId/edit',
            templateUrl: 'modules/articles/views/edit-article.client.view.html',
            data: {
                requiresLogin: true
            }
        });
    }
]);
