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
            $scope.articleTags.push($scope.selectedSubcategory);
            $scope.articleTags.push(window._.findWhere($scope.tags, {
                name: $scope.selectedCategory.name
            }));
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
                    $location.path('articles');
                });
            }
        };

        $scope.update = function() {
            var article = $scope.article;

            article.$update(function() {
                $location.path('articles/' + article._id);

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
                var categoryTags = window._.where($scope.article.tags, {
                    isCategory: true
                });
                $scope.selectedCategory = window._.find($scope.categories, function(category) {
                    return window._.contains(window._.pluck(categoryTags, 'name'), category.name);
                });
                if ($scope.selectedCategory.subcategories.length > 0) {
                    $scope.selectedSubcategory = window._.intersection($scope.selectedCategory.subcategories, categoryTags);
                }
            });

        };

        $scope.trustAsHtml = function(content) {
            return $sce.trustAsHtml(content);
        };

        $scope.addTag = function(tag, index) {
            $scope.articleTags.push(tag);
            $scope.tags.splice(index, 1);
        };
        $scope.removeTag = function(tag, index) {
            $scope.tags.push(tag);
            $scope.articleTags.splice(index, 1);
        };
    }
]);
