'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    summary: {
        type: String,
        default: '',
        trim: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: 'You must pick a category'
    },
    img: {
        type: String,
        default: ''
    },
    tags: [{
        type: Schema.ObjectId,
        ref: 'Tag',
        default: []
    }],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
ArticleSchema.index({
    tags: 1
});

mongoose.model('Article', ArticleSchema);
