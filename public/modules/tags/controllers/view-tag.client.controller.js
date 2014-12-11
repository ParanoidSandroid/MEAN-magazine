'use strict';

angular.module('tags').controller('ViewTagsController', ['$scope', '$rootScope', '$stateParams', '$location', 'Authentication', 'Articles', 'Tags',
    function($scope, $rootScope, $stateParams, $location, Authentication, Articles, Tags) {
        $scope.authentication = Authentication;
        $scope.tag = Tags.get({
            tagId: $stateParams.tagId
        });

        $scope.articles = Articles.query({
            tag: $stateParams.tagId
        });

        // Remove existing Tag
        $scope.remove = function(tag) {
            var tags = Tags.query(function() {
                if (tag) {
                    tag.$remove();

                    for (var i in tags) {
                        if (tags[i] === tag) {
                            tags.splice(i, 1);
                        }
                    }
                } else {
                    $scope.tag.$remove(function() {
                        $location.path('tags');
                    });
                }
            });

        };
    }
]);
