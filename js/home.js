'use strict';
/**
 * home Module
 *
 * Module that handles the business
 * logic for the homepage of the site.
 */
angular.module('home', [])
    .factory('homeData', ['$http',
        function($http) {
            return {
                getCarouselData: function(callback) {
                    $http.get('/featured.php')
                        .success(callback)
                        .error(function(data, status, headers, config) {
                            console.log('http error: ' + status);
                        })
                    console.log('Sending request to /featured.php');
                },
                getRecentArticlesData: function(callback) {
                    $http.get('/recent.php')
                        .success(callback)
                        .error(function(data, status, headers, config) {
                            console.log('Error: ' + status);
                        });
                    console.log('Sending get request to /recent.php');
                }
            };
        }
    ])
    .controller('HomeCtrl', ['$scope', '$rootScope', '$location',
        'homeData', 'picturesqueData',
        function($scope, $rootScope, $location, homeData, picturesqueData) {
            $rootScope.title = 'home';
            /**
             * Scope variables declaration
             */
            $scope.slides = [];
            $scope.recents = [];
            $scope.picturesque = [];
            $scope.carouselInterval = 5000;

            $rootScope.current.length = 0;

            if ($rootScope.featured.length == 0) {
                homeData.getCarouselData(function(data) {
                    $scope.slides = data;
                    $rootScope.featured = data;
                    for (var i = 0; i < data.length; i++) {
                        $rootScope.current.push(data[i]);
                    }
                });
            } else {
                $scope.slides = $rootScope.featured;
                for (var i = 0; i < $scope.slides.length; i++) {
                    $rootScope.current.push($scope.slides[i]);
                }
            }

            if ($rootScope.recents.length == 0) {
                homeData.getRecentArticlesData(function(data) {
                    $scope.recents = data;
                    $rootScope.recents = data;
                    for (var i = 0; i < data.length; i++) {
                        $rootScope.current.push(data[i]);
                    }
                });
            } else {
                $scope.recents = $rootScope.recents;
                for (var i = 0; i < $scope.recents.length; i++) {
                    $rootScope.current.push($scope.recents[i]);
                }
            }

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
    ])
    .directive('setNgAnimate', ['$animate',
        function($animate) {
            return {
                link: function($scope, $element, $attrs) {
                    $scope.$watch(function() {
                        return $scope.$eval($attrs.setNgAnimate, $scope);
                    }, function(valnew, valold) {
                        $animate.enabled( !! valnew, $element);
                    });
                }
            };
        }
    ]);
