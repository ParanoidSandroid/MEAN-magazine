'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', '$sce', '$filter', 'Authentication', 'Articles', 'Categories', 'Tags',
    function($scope, $stateParams, $location, $sce, $filter, Authentication, Articles, Categories, Tags) {
        $scope.authentication = Authentication;


        $scope.editorOptions = {
            language: 'en',
            allowedContent: true,
            entities: false,
            disableAutoInline: true
        };

        // Called when the editor is completely ready.
        $scope.editorReady = function() {

        };

        // Define and initialize scope vars.
        $scope.categories = Categories.query();
        $scope.tags = Tags.query();
        $scope.articleTags = [];
        $scope.status = {
            isopen: false
        };

        $scope.create = function() {
            $scope.articleTags = window._.pluck($scope.articleTags, '_id');

            var article = new Articles({
                title: this.title,
                content: this.content,
                summary: this.summary,
                tags: this.articleTags
            });
            article.$save(function(response) {
                $location.path('articles/' + response._id);

                $scope.title = '';
                $scope.summary = '';
                $scope.content = '';
                $scope.articleTags = [];
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

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

        $scope.update = function() {
            var article = $scope.article;

            article.$update(function() {
                $location.path('articles/' + article._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.articles = Articles.query();
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
