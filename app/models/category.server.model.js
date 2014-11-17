'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Category name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	subcategories: [{
		type: Schema.ObjectId,
		ref: 'Tag',
		default: [{}]
	}]
});

mongoose.model('Category', CategorySchema);