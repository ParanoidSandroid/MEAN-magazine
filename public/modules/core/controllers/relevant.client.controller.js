'use strict';


angular.module('core').controller('RelevantController', ['$scope', '$stateParams', '$window', 'Articles',
    function($scope, $stateParams, $window, Articles) {
        $scope.article = Articles.get({
            articleId: $stateParams.articleId
        }, function() {
            //Get all the articles that belong to the same category
            $scope.relevants = Articles.query({category : $scope.article.category._id}, function() {
                var _ = $window._;
                for(var a in $scope.relevants) {
                    var mutual_tags = _.intersection(_.pluck($scope.relevants[a].tags, '_id'), _.pluck($scope.article.tags, '_id'));
                    if (mutual_tags.length > 0) {
                        $scope.relevants[a].relativity = mutual_tags.length;
                    }
                    else {
                        $scope.relevants[a].relativity = 0;
                    }
                }  
            });
        });
    }
]);