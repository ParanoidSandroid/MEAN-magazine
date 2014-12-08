'use strict';

//Setting up route
angular.module('categories').config(['$stateProvider',
    function($stateProvider) {
        // Categories state routing
        $stateProvider.
            // User states
        state('listCategories', {
            url: '/categories',
            views: {
                '': {
                    templateUrl: 'modules/categories/views/list-categories.client.view.html'
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
        state('createCategory', {
            url: '/categories/create',
            views: {
                '': {
                    templateUrl: 'modules/categories/views/create-category.client.view.html'
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
        state('viewCategory', {
            url: '/categories/:categoryId',
            views: {
                '': {
                    templateUrl: 'modules/categories/views/view-category.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            }
        }).
        state('editCategory', {
            url: '/categories/:categoryId/edit',
            views: {
                '': {
                    templateUrl: 'modules/categories/views/edit-category.client.view.html'
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
