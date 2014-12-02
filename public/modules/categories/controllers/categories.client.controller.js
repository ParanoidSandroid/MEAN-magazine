'use strict';

// Categories controller
angular.module('categories').controller('CategoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Categories', 'Tags',
    function($scope, $stateParams, $location, Authentication, Categories, Tags) {
        $scope.authentication = Authentication;

        $scope.tags = Tags.query();
        $scope.category = new Categories({
            name: '',
            subcategories: []
        });
        $scope.status = {
            isopen: false
        };

        // Create new Category
        $scope.create = function() {
            var category = $scope.category;
            category.subcategories = window._.pluck(category.subcategories, '_id');

            // Redirect after save
            category.$save(function(response) {
                $location.path('categories/' + response._id);

                // Clear form fields
                $scope.category.name = '';
                $scope.category.subcategories = [];
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Category
        $scope.remove = function(category) {
            if (category) {
                category.$remove();

                for (var i in $scope.categories) {
                    if ($scope.categories[i] === category) {
                        $scope.categories.splice(i, 1);
                    }
                }
            } else {
                $scope.category.$remove(function() {
                    $location.path('categories');
                });
            }
        };

        // Update existing Category
        $scope.update = function() {
            var category = $scope.category;

            category.$update(function() {
                $location.path('categories/' + category._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Categories
        $scope.find = function() {
            $scope.categories = Categories.query();
        };

        // Find existing Category
        $scope.findOne = function() {
            $scope.category = Categories.get({
                categoryId: $stateParams.categoryId
            });
        };

        // Add an existing subcategory to category object.
        $scope.addSubcategory = function(subcategory, index) {
            $scope.category.subcategories.push(subcategory);
            $scope.tags.splice(index, 1);
        };

        // Remove an existing subcategory to category object.
        $scope.removeSubcategory = function(subcategory, index) {
            $scope.tags.push(subcategory);
            $scope.category.subcategories.splice(index, 1);
        };
    }
]);
