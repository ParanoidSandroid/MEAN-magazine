'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Tag Schema
 */
var TagSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Tag name',
        trim: true
    },
    isSubcategory: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Tag', TagSchema);
