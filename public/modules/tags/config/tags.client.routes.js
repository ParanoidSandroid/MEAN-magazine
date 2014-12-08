'use strict';

//Setting up route
angular.module('tags').config(['$stateProvider',
    function($stateProvider) {
        // Tags state routing
        $stateProvider.
        state('listTags', {
            url: '/tags',
            views: {
                '': {
                    templateUrl: 'modules/tags/views/list-tags.client.view.html'
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
        state('createTag', {
            url: '/tags/create',
            views: {
                '': {
                    templateUrl: 'modules/tags/views/create-tag.client.view.html'
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
        state('viewTag', {
            url: '/tags/:tagId',
            views: {
                '': {
                    templateUrl: 'modules/tags/views/view-tag.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            }
        }).
        state('editTag', {
            url: '/tags/:tagId/edit',
            views: {
                '': {
                    templateUrl: 'modules/tags/views/edit-tag.client.view.html'
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
