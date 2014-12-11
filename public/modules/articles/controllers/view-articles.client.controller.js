'use strict';

angular.module('articles').controller('ViewArticlesController', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$filter', '$window', 'Authentication', 'Articles',
    function($scope, $rootScope, $stateParams, $location, $sce, $filter, $window, Authentication, Articles) {
        $scope.authentication = Authentication;


        $scope.remove = function(article) {
            var articles = Articles.query(function() {
                if (article) {
                    article.$remove();

                    for (var i in articles) {
                        if (articles[i] === article) {
                            articles.splice(i, 1);
                        }
                    }
                } else {
                    $scope.article.$remove(function() {
                        $location.path('articles');
                    });
                }
            });
        };

        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            }, function() {
                $rootScope.title = $scope.article.title;
                $rootScope.image = $scope.article.img;
                $rootScope.articleTitle = $scope.article.title;
                $rootScope.articleDescription = $scope.article.summary;
            });
        };

        $scope.trustAsHtml = function(content) {
            return $sce.trustAsHtml(content);
        };
    }
]);
