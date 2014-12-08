'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Articles',
    function($scope, Authentication, Articles) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.slides = Articles.query({tag: '5480ffa699fe89ea050c0cbb'});
        $scope.recents = Articles.query({limit: 10});
    }
]);
