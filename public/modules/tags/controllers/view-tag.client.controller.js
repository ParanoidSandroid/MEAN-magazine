'use strict';

angular.module('tags').controller('ViewTagsController',['$scope', '$stateParams', 'Authentication', 'Articles', 'Tags',
	function($scope, $stateParams, Authentication, Articles, Tags) {
		$scope.authentication = Authentication;
		$scope.tag = Tags.get({tagId: $stateParams.tagId});

		$scope.articles = Articles.query({tag: $stateParams.tagId});
	}
]);