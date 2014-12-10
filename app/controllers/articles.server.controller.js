'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Article = mongoose.model('Article'),
    _ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
    res.jsonp(req.article);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * List of Articles
 */
exports.list = function(req, res) {

    var query = Article.find();
    if (req.query.hasOwnProperty('tag')) {
        query = Article.find({
            tags: req.query.tag
        });
    } else if (req.query.hasOwnProperty('category')) {
        query = Article.find({
            category: req.query.category
        });
    }
    query.sort('-created').populate('user', '_id displayName img roles').populate('tags').populate('category');

    if (req.query.hasOwnProperty('limit')) {
        query.limit(req.query.limit);
    }

    query.exec(function(err, articles) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(articles);
        }
    });
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {
    Article.findById(id).populate('user', '_id displayName img roles').populate('tags').populate('category').exec(function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    var isAdmin = _.intersection(req.user.roles, ['admin']).length;
    if (isAdmin) {
        return next();
    }
    if (req.article.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

/**
 * Article upload handler
 */
exports.uploadImg = function(req, res) {
    var imgPath = req.files.file.path;
    var splittedPath = imgPath.split('/');
    imgPath = 'uploads'+'/'+splittedPath[splittedPath.length-1];
    res.status(200).jsonp({
        path: imgPath
    });
};
