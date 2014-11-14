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
    created: {
        type: Date,
        default: Date.now
    },
    roles: {
        type: [{
            type: String,
            enum: ['tag', 'category', 'column']
        }],
        default: ['tag']
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Tag', TagSchema);
