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
        $scope.article =  new Articles({
            title: '',
            content: '',
            summary: '',
            tags: []
        });
        $scope.status = {
            isopen: false
        };

        $scope.create = function() {
            var article = $scope.article;
            article.tags.push(article.subcategory);
            article.category = article.category._id;
            article.tags = window._.pluck(article.tags, '_id');
            delete article.subcategory;
            article.$save(function(response) {
                $location.path('manage/articles/' + response._id);
                $scope.status.isopen = false;
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
                    $location.path('manage/articles');
                });
            }
        };

        $scope.update = function() {
            var article = $scope.article;

            article.$update(function() {
                $location.path('manage/articles/' + article._id);

                $scope.status.isopen = false;
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
            }, function() {
                $scope.article.subcategory = window._.where($scope.article.tags, {
                    isSubcategory: true
                });
            });
        };

        $scope.trustAsHtml = function(content) {
            return $sce.trustAsHtml(content);
        };

        $scope.addTag = function(tag, index) {
            $scope.article.tags.push(tag);
            $scope.tags.splice(index, 1);
        };
        $scope.removeTag = function(tag, index) {
            $scope.tags.push(tag);
            $scope.article.tags.splice(index, 1);
        };
    }
]);
