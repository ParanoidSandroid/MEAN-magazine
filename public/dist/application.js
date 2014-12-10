'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
    // Init module configuration options
    var applicationModuleName = 'skra-punk';
    var applicationModuleVendorDependencies = ['ngResource', 'ui.router', 'ui.bootstrap', 'ezfb', 'ui.utils', 'angulartics',
    'angulartics.google.analytics'];

    // Add a new vertical module
    var registerModule = function(moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
// Configuring FB api
// Configuring the google analytics
angular.module(ApplicationConfiguration.applicationModuleName).config(['ezfbProvider', '$locationProvider', '$analyticsProvider',
    function(ezfbProvider, $locationProvider, $analyticsProvider) {
        $locationProvider.hashPrefix('!');

        ezfbProvider.setLocale('el_GR');
        ezfbProvider.setInitParams({
            appdId: '296559977173451',
            xfbml: true,
            version: 'v2.0'
        });

        $analyticsProvider.virtualPageView(false);
    }
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles', ['ckeditor']);

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('categories');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('tags');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');

'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
        Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
        Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
    }
]);

'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
    function($stateProvider) {
        // Articles state routing
        $stateProvider.
        state('listArticles', {
            url: '/articles',
            views: {
                '': {
                    templateUrl: 'modules/articles/views/list-articles.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('createArticle', {
            url: '/articles/create',
            views: {
                '': {
                    templateUrl: 'modules/articles/views/create-article.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('viewArticle', {
            url: '/articles/:articleId',
            views: {
                '': {
                    templateUrl: 'modules/articles/views/view-article.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_relevant.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            }
        }).
        state('editArticle', {
            url: '/articles/:articleId/edit',
            views: {
                '': {
                    templateUrl: 'modules/articles/views/edit-article.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        });
    }
]);

'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', '$sce', '$filter', '$window', 'Authentication', 'Articles', 'Categories', 'Tags', 'Users',
    function($scope, $stateParams, $location, $sce, $filter, $window, Authentication, Articles, Categories, Tags, Users) {
        $scope.authentication = Authentication;


        $scope.editorOptions = {
            language: 'en',
            allowedContent: true,
            entities: false,
            disableAutoInline: true
        };

        // Called when the editor is completely ready.
        $scope.editorReady = function() {

        };

        // Define and initialize scope vars.
        $scope.categories = Categories.query();
        $scope.tags = Tags.query();
        $scope.article = new Articles({
            title: '',
            content: '',
            summary: '',
            tags: []
        });
        $scope.status = {
            isopen: false
        };

        $scope.create = function() {
            var article = $scope.article;
            if (article.hasOwnProperty('category')) {
                if (article.hasOwnProperty('subcategory')) {
                    article.tags.push(article.subcategory);
                }
                article.category = article.category._id;
            }
            if (article.tags.length) {
                article.tags = $window._.pluck(article.tags, '_id');
            }
            delete article.subcategory;
            article.$save(function(response) {
                $location.path('articles/' + response._id);
                $scope.status.isopen = false;
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function() {
                    $location.path('articles');
                });
            }
        };

        $scope.update = function() {
            var article = $scope.article;

            article.$update(function() {
                $location.path('articles/' + article._id);

                $scope.status.isopen = false;
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.articles = Articles.query();
        };

        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            }, function() {
                $scope.article.category = $window._.findWhere($scope.categories, {
                    _id: $scope.article.category._id
                });
                var subcategory = $window._.findWhere($scope.article.tags, {
                    isSubcategory: true
                });
                if (typeof subcategory !== 'undefined') {
                    $scope.article.subcategory = $window._.findWhere($scope.article.category.subcategories, {
                        _id: subcategory._id
                    });
                }
                $scope.users = Users.query(function() {
                    $scope.article.user = $window._.findWhere($scope.users, {
                        _id: $scope.article.user._id
                    });
                });
            });
        };

        $scope.trustAsHtml = function(content) {
            return $sce.trustAsHtml(content);
        };

        $scope.addTag = function(tag, index) {
            $scope.article.tags.push(tag);
            $scope.tags.splice(index, 1);
        };
        $scope.removeTag = function(tag, index) {
            $scope.tags.push(tag);
            $scope.article.tags.splice(index, 1);
        };

        $scope.openDatepicker = function(event) {
            event.preventDefault();
            event.stopPropagation();
            $scope.datepickerOpened = true;
        };
    }
]);

'use strict';

angular.module('articles').controller('ViewArticlesController', ['$scope', '$stateParams', '$location', '$sce', '$filter', '$window', 'Authentication', 'Articles',
    function($scope, $stateParams, $location, $sce, $filter, $window, Authentication, Articles) {
        $scope.authentication = Authentication;


        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function() {
                    $location.path('articles');
                });
            }
        };

        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
        };

        $scope.trustAsHtml = function(content) {
            return $sce.trustAsHtml(content);
        };
    }
]);

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
    function($resource) {
        return $resource('articles/:articleId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

// Configuring the Articles module
angular.module('categories').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Categories', 'categories', 'dropdown', '/categories(/create)?');
        Menus.addSubMenuItem('topbar', 'categories', 'List Categories', 'categories');
        Menus.addSubMenuItem('topbar', 'categories', 'New Category', 'categories/create', 'menuItemURL', false, ['admin']);
    }
]);

'use strict';

//Setting up route
angular.module('categories').config(['$stateProvider',
    function($stateProvider) {
        // Categories state routing
        $stateProvider.
            // User states
        state('listCategories', {
            url: '/categories',
            views: {
                '': {
                    templateUrl: 'modules/categories/views/list-categories.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('createCategory', {
            url: '/categories/create',
            views: {
                '': {
                    templateUrl: 'modules/categories/views/create-category.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('viewCategory', {
            url: '/categories/:categoryId',
            views: {
                '': {
                    templateUrl: 'modules/categories/views/view-category.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            }
        }).
        state('editCategory', {
            url: '/categories/:categoryId/edit',
            views: {
                '': {
                    templateUrl: 'modules/categories/views/edit-category.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        });
    }
]);

'use strict';

// Categories controller
angular.module('categories').controller('CategoriesController', ['$scope', '$stateParams', '$location', '$window', 'Authentication', 'Categories', 'Tags',
    function($scope, $stateParams, $location, $window, Authentication, Categories, Tags) {
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
            category.subcategories = $window._.pluck(category.subcategories, '_id');

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

'use strict';

//Categories service used to communicate Categories REST endpoints
angular.module('categories').factory('Categories', ['$resource',
	function($resource) {
		return $resource('categories/:categoryId', { categoryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // Redirect to home view when route not found
            $urlRouterProvider.otherwise('/');

            // Home state routing
            $stateProvider.
            state('home', {
                url: '/',
                views: {
                    '': {
                        templateUrl: 'modules/core/views/home.client.view.html'
                    },
                    'rightbar': {
                        templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                    },
                    'leftbar': {
                        templateUrl: 'modules/core/views/leftbar.client.view.html'
                    }
                }
            }).
            state('about', {
                url: '/about',
                views: {
                    '': {
                        templateUrl: 'modules/core/views/about.client.view.html'
                    },
                    'rightbar': {
                        templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                    },
                    'leftbar': {
                        templateUrl: 'modules/core/views/leftbar.client.view.html'
                    }
                }
            });
        }
    ])
    .run(['$rootScope', '$state', 'Authentication',
        function($rootScope, $state, Authentication) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                if (toState.hasOwnProperty('data') && toState.data.requiresLogin && !Authentication.user) {
                    event.preventDefault();
                    $state.go('home');
                    return false;
                }
            });
        }
    ]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', 'Categories',
    function($scope, Authentication, Menus, Categories) {
        $scope.authentication = Authentication;
        $scope.categories = Categories.query(function() {
            $scope.categories = $scope.categories.reverse();
        });
        $scope.isCollapsed = false;
        $scope.menu = Menus.getMenu('topbar');

        $scope.toggleCollapsibleMenu = function() {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function() {
            $scope.isCollapsed = false;
        });
    }
]);

'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Articles',
    function($scope, Authentication, Articles) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.slides = Articles.query({tag: '5480ffa699fe89ea050c0cbb'});
        $scope.recents = Articles.query({limit: 10});
    }
]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

    function() {
        // Define a set of default roles
        this.defaultRoles = ['*'];

        // Define the menus object
        this.menus = {};

        // A private function for rendering decision
        var shouldRender = function(user) {
            if (user) {
                if (!!~this.roles.indexOf('*')) {
                    return true;
                } else {
                    for (var userRoleIndex in user.roles) {
                        for (var roleIndex in this.roles) {
                            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                                return true;
                            }
                        }
                    }
                }
            } else {
                return this.isPublic;
            }

            return false;
        };

        // Validate menu existance
        this.validateMenuExistance = function(menuId) {
            if (menuId && menuId.length) {
                if (this.menus[menuId]) {
                    return true;
                } else {
                    throw new Error('Menu does not exists');
                }
            } else {
                throw new Error('MenuId was not provided');
            }

            return false;
        };

        // Get the menu object by menu id
        this.getMenu = function(menuId) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Return the menu object
            return this.menus[menuId];
        };

        // Add new menu object by menu id
        this.addMenu = function(menuId, isPublic, roles) {
            // Create the new menu
            this.menus[menuId] = {
                isPublic: isPublic || false,
                roles: roles || this.defaultRoles,
                items: [],
                shouldRender: shouldRender
            };

            // Return the menu object
            return this.menus[menuId];
        };

        // Remove existing menu object by menu id
        this.removeMenu = function(menuId) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Return the menu object
            delete this.menus[menuId];
        };

        // Add menu item object
        this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Push new menu item
            this.menus[menuId].items.push({
                title: menuItemTitle,
                link: menuItemURL,
                menuItemType: menuItemType || 'item',
                menuItemClass: menuItemType,
                uiRoute: menuItemUIRoute || ('/' + menuItemURL),
                isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
                roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
                position: position || 0,
                items: [],
                shouldRender: shouldRender
            });

            // Return the menu object
            return this.menus[menuId];
        };

        // Add submenu item object
        this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Search for menu item
            for (var itemIndex in this.menus[menuId].items) {
                if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
                    // Push new submenu item
                    this.menus[menuId].items[itemIndex].items.push({
                        title: menuItemTitle,
                        link: menuItemURL,
                        uiRoute: menuItemUIRoute || ('/' + menuItemURL),
                        isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
                        roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
                        position: position || 0,
                        shouldRender: shouldRender
                    });
                }
            }

            // Return the menu object
            return this.menus[menuId];
        };

        // Remove existing menu object by menu id
        this.removeMenuItem = function(menuId, menuItemURL) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Search for menu item to remove
            for (var itemIndex in this.menus[menuId].items) {
                if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
                    this.menus[menuId].items.splice(itemIndex, 1);
                }
            }

            // Return the menu object
            return this.menus[menuId];
        };

        // Remove existing menu object by menu id
        this.removeSubMenuItem = function(menuId, submenuItemURL) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Search for menu item to remove
            for (var itemIndex in this.menus[menuId].items) {
                for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
                    if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
                        this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
                    }
                }
            }

            // Return the menu object
            return this.menus[menuId];
        };

        //Adding the topbar menu
        this.addMenu('topbar', false, ['user', 'admin']);
    }
]);

'use strict';

// Configuring the Articles module
angular.module('tags').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Tags', 'tags', 'dropdown', '/tags(/create)?');
        Menus.addSubMenuItem('topbar', 'tags', 'List Tags', 'tags');
        Menus.addSubMenuItem('topbar', 'tags', 'New Tag', 'tags/create');
    }
]);

'use strict';

//Setting up route
angular.module('tags').config(['$stateProvider',
    function($stateProvider) {
        // Tags state routing
        $stateProvider.
        state('listTags', {
            url: '/tags',
            views: {
                '': {
                    templateUrl: 'modules/tags/views/list-tags.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('createTag', {
            url: '/tags/create',
            views: {
                '': {
                    templateUrl: 'modules/tags/views/create-tag.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('viewTag', {
            url: '/tags/:tagId',
            views: {
                '': {
                    templateUrl: 'modules/tags/views/view-tag.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            }
        }).
        state('editTag', {
            url: '/tags/:tagId/edit',
            views: {
                '': {
                    templateUrl: 'modules/tags/views/edit-tag.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        });
    }
]);

'use strict';

// Tags controller
angular.module('tags').controller('TagsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tags',
    function($scope, $stateParams, $location, Authentication, Tags) {
        $scope.authentication = Authentication;

        $scope.tag = new Tags({
            name: '',
            isSubcategory: false
        });

        // Create new Tag
        $scope.create = function() {
            var tag = $scope.tag;

            // Redirect after save
            tag.$save(function(response) {
                $location.path('tags/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Tag
        $scope.remove = function(tag) {
            if (tag) {
                tag.$remove();

                for (var i in $scope.tags) {
                    if ($scope.tags[i] === tag) {
                        $scope.tags.splice(i, 1);
                    }
                }
            } else {
                $scope.tag.$remove(function() {
                    $location.path('tags');
                });
            }
        };

        // Update existing Tag
        $scope.update = function() {
            var tag = $scope.tag;

            tag.$update(function() {
                $location.path('tags/' + tag._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Tags
        $scope.find = function() {
            $scope.tags = Tags.query();
        };

        // Find existing Tag
        $scope.findOne = function() {
            $scope.tag = Tags.get({
                tagId: $stateParams.tagId
            });
        };
    }
]);

'use strict';

angular.module('tags').controller('ViewTagsController',['$scope', '$stateParams', 'Authentication', 'Articles', 'Tags',
	function($scope, $stateParams, Authentication, Articles, Tags) {
		$scope.authentication = Authentication;
		$scope.tag = Tags.get({tagId: $stateParams.tagId});

		$scope.articles = Articles.query({tag: $stateParams.tagId});
	}
]);
'use strict';

//Tags service used to communicate Tags REST endpoints
angular.module('tags').factory('Tags', ['$resource',
    function($resource) {
        return $resource('tags/:tagId', {
            tagId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
    function($httpProvider) {
        // Set the httpProvider "not authorized" interceptor
        $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
            function($q, $location, Authentication) {
                return {
                    responseError: function(rejection) {
                        switch (rejection.status) {
                            case 401:
                                // Deauthenticate the global user
                                Authentication.user = null;

                                // Redirect to signin page
                                $location.path('signin');
                                break;
                            case 403:
                                // Add unauthorized behaviour
                                break;
                        }

                        return $q.reject(rejection);
                    }
                };
            }
        ]);
    }
])
// Configuring the Articles module
.run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Users', 'users', 'dropdown', '/users(/create)?', false, ['admin']);
        Menus.addSubMenuItem('topbar', 'users', 'List Users', 'users', 'menuItemURL', false, ['admin']);
        Menus.addSubMenuItem('topbar', 'users', 'Add User', 'signup', 'menuItemURL', false, ['admin']);
    }
]);

'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
        state('profile', {
            url: '/settings/profile',
            views: {
                '': {
                    templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('password', {
            url: '/settings/password',
            views: {
                '': {
                    templateUrl: 'modules/users/views/settings/change-password.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('accounts', {
            url: '/settings/accounts',
            views: {
                '': {
                    templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('signup', {
            url: '/signup',
            views: {
                '': {
                    templateUrl: 'modules/users/views/authentication/signup.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('signin', {
            url: '/signin',
            views: {
                '': {
                    templateUrl: 'modules/users/views/authentication/signin.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            }
        }).
        state('forgot', {
            url: '/password/forgot',
            views: {
                '': {
                    templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            }
        }).
        state('reset-invlaid', {
            url: '/password/reset/invalid',
            views: {
                '': {
                    templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            }
        }).
        state('reset-success', {
            url: '/password/reset/success',
            views: {
                '': {
                    templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            }
        }).
        state('reset', {
            url: '/password/reset/:token',
            views: {
                '': {
                    templateUrl: 'modules/users/views/password/reset-password.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            }
        }).
        state('listUsers', {
            url: '/users',
            views: {
                '': {
                    templateUrl: 'modules/users/views/admin/list-users.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            },
            data: {
                requiresLogin: true
            }
        }).
        state('viewAuthor', {
            url: '/authors/:authorId',
            views: {
                '': {
                    templateUrl: 'modules/users/views/authors/author.client.view.html'
                },
                'rightbar': {
                    templateUrl: 'modules/core/views/rightbar_columns.client.view.html'
                },
                'leftbar': {
                    templateUrl: 'modules/core/views/leftbar.client.view.html'
                }
            }
        });
    }
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
    function($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;

        // If user is signed in and is not admin then redirect back home
        if ($scope.authentication.user && $scope.authentication.user.roles[0] !== 'admin') $location.path('/');

        $scope.signup = function() {
            $http.post('/auth/signup', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.signin = function() {
            $http.post('/auth/signin', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
    }
]);

'use strict';

angular.module('users').controller('AuthorsController', ['$scope', '$stateParams', 'Authors', 'Users',
	function($scope, $stateParams, Authors, Users) {
		$scope.author = Authors.get({authorId: $stateParams.authorId});

		$scope.find = function() {
			$scope.authors = Users.query();
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
    function($scope, $stateParams, $http, $location, Authentication) {
        $scope.authentication = Authentication;

        //If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');

        // Submit forgotten password account id
        $scope.askForPasswordReset = function() {
            $scope.success = $scope.error = null;

            $http.post('/auth/forgot', $scope.credentials).success(function(response) {
                // Show user success message and clear form
                $scope.credentials = null;
                $scope.success = response.message;

            }).error(function(response) {
                // Show user error message and clear form
                $scope.credentials = null;
                $scope.error = response.message;
            });
        };

        // Change user password
        $scope.resetUserPassword = function() {
            $scope.success = $scope.error = null;

            $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
                // If successful show success message and clear form
                $scope.passwordDetails = null;

                // Attach user profile
                Authentication.user = response;

                // And redirect to the index page
                $location.path('/password/reset/success');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
    }
]);

'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
    function($scope, $http, $location, Users, Authentication) {
        $scope.user = Authentication.user;

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');

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

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [

    function() {
        var _this = this;

        _this._data = {
            user: window.user
        };

        return _this._data;
    }
]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Authors', ['$resource',
    function($resource) {
        return $resource('authors/:authorId', {
            authorId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
    function($resource) {
        return $resource('users', {}, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
