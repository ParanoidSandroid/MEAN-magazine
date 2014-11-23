'use strict';

// Configuring the Articles module
angular.module('categories').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Categories', 'categories', 'dropdown', '/categories(/create)?');
        Menus.addSubMenuItem('topbar', 'categories', 'List Categories', 'manage/categories');
        Menus.addSubMenuItem('topbar', 'categories', 'New Category', 'manage/categories/create', 'menuItemURL', false, ['admin']);
    }
]);
