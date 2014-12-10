'use strict';

angular.module('articles').controller('ViewArticlesController', ['$scope', '$stateParams', '$location', '$sce', '$filter', '$window', 'Authentication', 'Articles',
    function($scope, $stateParams, $location, $sce, $filter, $window, Authentication, Articles) {
        $scope.authentication = Authentication;


        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function() {
                    $location.path('articles');
                });
            }
        };

        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
        };

        $scope.trustAsHtml = function(content) {
            return $sce.trustAsHtml(content);
        };
    }
]);
