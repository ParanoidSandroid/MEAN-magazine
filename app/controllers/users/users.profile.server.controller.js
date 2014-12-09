'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article');

/**
 * Update user details
 */
exports.update = function(req, res) {
    // Init Variables
    var user = req.user;
    var message = null;

    // For security measurement we remove the roles from the req.body object
    delete req.body.roles;

    if (user) {
        // Merge existing user
        user = _.extend(user, req.body);
        user.updated = Date.now();
        user.displayName = user.firstName + ' ' + user.lastName;

        user.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                req.login(user, function(err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.jsonp(user);
                    }
                });
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Send Author profile of user
 */
exports.authorProfile = function(req, res) {
    var author = {};

    author._id = req.profile._id;
    author.displayName = req.profile.displayName;
    author.email = req.profile.email;
    author.img = req.profile.img;
    author.articles = [];

    // Add the articles written by the author.
    Article.find({
        user: author._id
    }).sort('-created').populate('tags').populate('category').exec(function(err, articles) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            // Sent the author.
            author.articles = articles;
            res.jsonp(author);
        }
    });

};
