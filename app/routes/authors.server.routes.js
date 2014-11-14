'use strict';


module.exports = function(app) {
    // User Routes
    var users = require('../../app/controllers/users');

    // Setting the authors api.
    app.route('authors').get(authors.list);
    app.route('authors:authorId').get(authors.profile);

    // Finish by binding the user middleware
    app.param('authorId', users.userByID);
}
