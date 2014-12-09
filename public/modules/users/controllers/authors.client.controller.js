'use strict';

angular.module('users').controller('AuthorsController', ['$scope', '$stateParams', 'Authors', 'Users',
	function($scope, $stateParams, Authors, Users) {
		$scope.author = Authors.get({authorId: $stateParams.authorId});

		$scope.find = function() {
			$scope.authors = Users.query();
		};
	}
]);