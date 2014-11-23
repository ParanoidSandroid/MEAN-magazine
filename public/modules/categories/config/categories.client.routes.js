'use strict';

//Setting up route
angular.module('categories').config(['$stateProvider',
    function($stateProvider) {
        // Categories state routing
        $stateProvider.
            // User states
        state('listCategories', {
            url: '/manage/categories',
            templateUrl: 'modules/categories/views/list-categories.client.view.html'
        }).
        state('createCategory', {
            url: '/manage/categories/create',
            templateUrl: 'modules/categories/views/create-category.client.view.html'
        }).
        state('viewCategory', {
            url: '/manage/categories/:categoryId',
            templateUrl: 'modules/categories/views/view-category.client.view.html'
        }).
        state('editCategory', {
                url: '/manage/categories/:categoryId/edit',
                templateUrl: 'modules/categories/views/edit-category.client.view.html'
        }).
        // Visitor states
        state('visitCategory', {
            url: '/categories/:categoryId',
            templateUrl: 'modules/categories/views/visit-category.client.view.html'
        });
    }
]);
