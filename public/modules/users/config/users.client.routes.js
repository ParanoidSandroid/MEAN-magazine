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
