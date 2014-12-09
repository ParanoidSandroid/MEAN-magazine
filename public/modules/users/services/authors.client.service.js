'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Authors', ['$resource',
    function($resource) {
        return $resource('authors/:authorId', {
            authorId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);