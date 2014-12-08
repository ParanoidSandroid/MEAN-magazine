'use strict';

angular.module('users').controller('AuthorsController', ['$scope', '$stateParams', 'Authors',
	function($scope, $stateParams, Authors) {
		$scope.author = Authors.get({authorId: $stateParams.authorId});
	}
]);