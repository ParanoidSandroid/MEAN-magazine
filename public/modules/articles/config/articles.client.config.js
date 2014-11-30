'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/manage/articles(/create)?');
        Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'manage/articles');
        Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'manage/articles/create');
    }
]);
