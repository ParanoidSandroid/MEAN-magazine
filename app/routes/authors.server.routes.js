'use strict';


module.exports = function(app) {
    // User Routes
    var users = require('../../app/controllers/users');

    // Setting the authors api.
    app.route('/authors/:authorId').get(users.authorProfile);

    // // Finish by binding the user middleware
    app.param('authorId', users.userByID);
};
