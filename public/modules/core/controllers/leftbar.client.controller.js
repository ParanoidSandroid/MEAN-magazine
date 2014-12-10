'use strict';


angular.module('core').controller('LeftbarController', ['$scope', 'Articles',
    function($scope, Articles) {
        $scope.editorial = Articles.query({tag: '54882a14d1076ddf1564bf5d', limit:1},
        	function() {
        		$scope.editorial = $scope.editorial[0];
        	});
        $scope.picturesque = Articles.query({tag: '5480ff9899fe89ea050c0cba', limit:1},
        	function() {
        		$scope.picturesque = $scope.picturesque[0];
        	});
    }
]);