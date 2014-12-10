'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', '$timeout', 'Users', 'Authentication',
    function($scope, $http, $location, $timeout, Users, Authentication) {
        $scope.user = Authentication.user;

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');

         // initialize image-uploader
        $scope.interface = {};
        $scope.uploadCount = 0;
        $scope.success = false;
        $scope.error = false;

        // Listen for when the interface has been configured.
        $scope.$on('$dropletReady', function whenDropletReady() {

            $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif', 'svg']);
            $scope.interface.setRequestUrl('users/uploads');
            $scope.interface.defineHTTPSuccess([/2.{2}/]);
            $scope.interface.useArray(false);

        });
        // Listen for when the files have been successfully uploaded.
        $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {
            $scope.user.img = response.path;
            $scope.uploadCount = files.length;
            $scope.success = true;

            $timeout(function timeout() {
                $scope.success = false;
            }, 5000);
        });

        // Listen for when the files have failed to upload.
        $scope.$on('$dropletError', function onDropletError(event, response) {

            $scope.error = true;
            console.log(response);

            $timeout(function timeout() {
                $scope.error = false;
            }, 5000);
        });

        // Check if there are additional accounts
        $scope.hasConnectedAdditionalSocialAccounts = function(provider) {
            for (var i in $scope.user.additionalProvidersData) {
                return true;
            }

            return false;
        };

        // Check if provider is already in use with current user
        $scope.isConnectedSocialAccount = function(provider) {
            return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
        };

        // Remove a user social account
        $scope.removeUserSocialAccount = function(provider) {
            $scope.success = $scope.error = null;

            $http.delete('/users/accounts', {
                params: {
                    provider: provider
                }
            }).success(function(response) {
                // If successful show success message and clear form
                $scope.success = true;
                $scope.user = Authentication.user = response;
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        // Update a user profile
        $scope.updateUserProfile = function(isValid) {
            if (isValid) {
                $scope.success = $scope.error = null;
                var user = new Users($scope.user);

                user.$update(function(response) {
                    $scope.success = true;
                    Authentication.user = response;
                }, function(response) {
                    $scope.error = response.data.message;
                });
            } else {
                $scope.submitted = true;
            }
        };

        // Change user password
        $scope.changeUserPassword = function() {
            $scope.success = $scope.error = null;

            $http.post('/users/password', $scope.passwordDetails).success(function(response) {
                // If successful show success message and clear form
                $scope.success = true;
                $scope.passwordDetails = null;
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        // Get list of users
        $scope.find = function() {
            $scope.users = Users.query();
        };

        $scope.promoteToAdmin = function() {
            $scope.isAdmin = true;
        };
    }
]);
