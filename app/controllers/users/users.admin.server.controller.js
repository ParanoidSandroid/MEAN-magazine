'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

/**
 * Make another user admin.
 */
exports.promoteToAdmin = function(req, res) {
    var user = req.profile;
    var message = null;

    if (user) {
        user.roles = ['admin'];
        user.updated = Date.now();

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
            message: 'User tried to promote is not found'
        });
    }
};

/*
 * Show all users.
 */
exports.list = function(req, res) {
      User.find({}, {displayName:1, img:1, roles:1}).sort('-created').exec(function(err, users) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(users);
        }
    });
};