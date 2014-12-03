'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', '$sce', '$filter', 'Authentication', 'Articles', 'Categories', 'Tags', 'Users',
    function($scope, $stateParams, $location, $sce, $filter, Authentication, Articles, Categories, Tags, Users) {
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
        $scope.article = new Articles({
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
                $location.path('articles/' + response._id);
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
                $scope.article.category = window._.findWhere($scope.categories, {
                    _id: $scope.article.category._id
                });
                var subcategory = window._.findWhere($scope.article.tags, {
                    isSubcategory: true
                });
                $scope.article.subcategory = window._.findWhere($scope.article.category.subcategories, {
                    _id: subcategory._id
                });
                $scope.users = Users.query(function() {
                    $scope.article.user = window._.findWhere($scope.users, {
                        _id: $scope.article.user._id
                    });
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

        $scope.openDatepicker = function(event) {
            event.preventDefault();
            event.stopPropagation();
            $scope.datepickerOpened = true;
        };
    }
]);
