'use strict';


angular.module('core').controller('HomeController', ['$scope', '$rootScope', 'Authentication', 'Articles',
    function($scope, $rootScope, Authentication, Articles) {

        $rootScope.title = 'home';

        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.slides = Articles.query({tag: '5480ffa699fe89ea050c0cbb'});
        $scope.recents = Articles.query({limit: 10});

    }
]);
