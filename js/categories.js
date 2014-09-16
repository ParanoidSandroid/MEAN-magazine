'use strict';
/**
 * categories Module
 *
 * Module that handles the data
 * presented to all the category
 * pages.
 */
angular.module('categories', ['ngRoute'])
    .factory('categoriesData', ['$http',
        function($http) {
            return {
                getCategoriesData: function(categoryurl, callback) {
                    $http.post('/category.php', {
                        category_url: categoryurl
                    })
                        .success(callback)
                        .error(function(data, status, headers, config) {
                            console.log('http error: ' + status);
                        })
                }
            };
        }
    ])
    .controller('CategoriesCtrl', ['$scope', '$rootScope', '$routeParams', '$location',
        'categoriesData', 'picturesqueData',
        function($scope, $rootScope, $routeParams, $location, categoriesData, picturesqueData) {

            $scope.category = {};
            $scope.picturesque = [];
            var categoryurl = $routeParams.categoryId;

            // First load whatever we have locally.
            $scope.category = $rootScope.categories[categoryurl];
            $rootScope.current.length = 0;
            $rootScope.title = $scope.category.name;

            if (!(($rootScope.categories[categoryurl]).hasOwnProperty('subcats'))) {
                categoriesData.getCategoriesData(categoryurl, function(data) {
                    // attach downloaded data.
                    $scope.category.subcats = data;
                    // attach new data for future use.
                    $rootScope.categories[categoryurl].subcats = data;
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].articles.length; j++) {
                            $rootScope.current.push(data[i].articles[j]);
                        }
                    }
                })
            } else {
                // attach all the new articles for easier access.
                for (var i = 0; i < $scope.category.subcats.length; i++) {
                    for (var j = 0; j < $scope.category.subcats[i].articles.length; j++) {
                        $rootScope.current.push($scope.category.subcats[i].articles[j]);
                    }
                }
            }

            // get picturesque if not present.
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

            $scope.go = function(url) {
                $location.path('tag/' + url);
            }
        }
    ]);
