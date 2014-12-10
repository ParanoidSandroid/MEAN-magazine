'use strict';

// Categories controller
angular.module('categories').controller('ViewCategoriesController', ['$scope', '$stateParams', '$location', '$window', 'Authentication', 'Categories', 'Articles',
    function($scope, $stateParams, $location, $window, Authentication, Categories, Articles) {
        $scope.authentication = Authentication;
        $scope.category = Categories.get({
            categoryId: $stateParams.categoryId
        }, function() {
            if ($scope.category.subcategories.length !== 0) {
                for (var i=0; i<$scope.category.subcategories.length; i++) {
                    var subcategories = $scope.category.subcategories;
                    subcategories[i].articles = Articles.query({
                        tag: subcategories[i]._id
                    });
                }
            } else {
                $scope.category.articles = Articles.query({
                    category: $scope.category._id
                });
            }
        });

        // Remove existing Category
        $scope.remove = function(category) {
            var categories = Categories.query(function() {
                if (category) {
                    category.$remove();

                    for (var i in categories) {
                        if (categories[i] === category) {
                            categories.splice(i, 1);
                        }
                    }
                } else {
                    $scope.category.$remove(function() {
                        $location.path('categories');
                    });
                }
            });

        };
    }
]);
