'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
// Configuring the google analytics
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', 'AnalyticsProvider',
    function($locationProvider, AnalyticsProvider) {
        $locationProvider.hashPrefix('!');

        AnalyticsProvider.setAccount('UA-46126105-1');
        AnalyticsProvider.trackPages(true);
        AnalyticsProvider.ignoreFirstPageLoad(true);
        AnalyticsProvider.setPageEvent('$stateChangeSuccess');
    }
]);

// Because we are relying on automatic page tracking, we need to inject
// Analytics al least once in our application.
angular.module(ApplicationConfiguration.applicationModuleName).run(['Analytics', '$rootScope', function(Analytics, $rootScope) {
    $rootScope.title = 'site';
    $rootScope.image = 'modules/core/img/brand/zymbra.jpg';
    $rootScope.contentUrl = '/';
    $rootScope.articleTitle = '';
    $rootScope.articleDescription = '';
}]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
