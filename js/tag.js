/**
 * tags Module
 *
 * Module that handles the tag page.
 */
angular.module('tags', ['ngRoute'])
    .factory('tagData', ['$http',
        function($http) {
            return {
                getTagData: function(tagUrl, callback) {
                    $http.post('/tag.php', {
                        tag_url: tagUrl
                    })
                        .success(callback)
                        .error(function(data, status, headers, config) {
                            console.log('http error: ' + status);
                        })
                }
            };
        }
    ])
    .controller('TagCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'tagData', 'picturesqueData',
        function($scope, $rootScope, $routeParams, $location, tagData, picturesqueData) {

            $scope.tag = {};
            $scope.picturesque = [];
            var tagUrl = $routeParams.tagId;
            $rootScope.current.length = 0;

            tagData.getTagData(tagUrl, function(data) {
                $rootScope.current = data.articles;
                $scope.tag = data;

                $rootScope.title = $scope.tag.name;
            });

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
