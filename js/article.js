'use strict';
/**
 *  Module
 *
 * Module that handles the data
 * concerning the article page.
 */
angular.module('article', ['ngRoute'])
    .factory('articleData', ['$http',
        function($http) {
            return {
                getArticleData: function(articleUrl, callback) {
                    $http.post('/article.php', {
                        article_url: articleUrl
                    })
                        .success(callback)
                        .error(function(data, status, headers, config) {
                            console.log('http error: ' + status);
                        })
                },
                getRelevantArticlesData: function(articleUrl, callback) {
                    $http.post('/relevantArticles.php', {
                        article_url: articleUrl
                    })
                        .success(callback)
                        .error(function(data, status, headers, config) {
                            console.log('http error: ' + status);
                        })
                }
            };
        }
    ])
    .controller('ArticleCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'articleData', 'picturesqueData',
        function($scope, $rootScope, $routeParams, $location, articleData, picturesqueData) {

            $scope.article = {};
            $scope.picturesque = [];
            $scope.relevants = [];
            var articleUrl = $routeParams.articleId;

            if ($rootScope.current.length == 0) {
                articleData.getArticleData(articleUrl, function(data) {
                    $scope.article = data;

                    $rootScope.title = $scope.article.title;
                    $rootScope.article_title = $scope.article.title;
                    $rootScope.article_description = $scope.article.summary;
                });
            } else {
                for (var i = 0; i < $rootScope.current.length; i++) {
                    if ($rootScope.current[i].url == articleUrl) {
                        $scope.article = $rootScope.current[i];

                        $rootScope.title = $scope.article.title;
                        $rootScope.article_title = $scope.article.title;
                        $rootScope.article_description = $scope.article.summary;

                        break;
                    }
                }
                $rootScope.current.length = 0;
            }
            articleData.getRelevantArticlesData(articleUrl, function(data) {
                $scope.relevants = data;
                for (var i = 0; i < data.length; i++) {
                    $rootScope.current.push(data[i]);
                }
            })
            if ($rootScope.picturesque.length == 0) {
                picturesqueData.getPicturesque(function(data) {
                    $scope.picturesque = data;
                    $rootScope.picturesque = data;
                    $rootScope.current.push(data.articles[0]);
                });
            } else {
                $scope.picturesque = $rootScope.picturesque;
                $rootScope.current.push($scope.picturesque.articles[0]);
            }

            $scope.go = function(index) {
                $location.path('tag/' + $scope.article.tags[index].url);
            }

        }
    ]);
