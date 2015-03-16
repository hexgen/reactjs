/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
//var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var db = require('monk')('localhost/wepo_company_acl');
var collection = db.get('Lead');

var _items = [];

var randomResponseTime = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


module.exports = {
    name: 'items',
    read: function (req, resource, params, config, callback) {

            collection.find({ }, function(err, docs) {
                _items = docs;
                callback(null, docs);
                db.close();
            });
            //callback(null, JSON.parse(JSON.stringify(_items)));
    },
    create: function (req, resource, params, body, config, callback) {
        var newTodo = {
            id: params.id,
            title: params.title
        };

        if (params.title.indexOf('fail') > -1) {
            var err = new Error('Shenanigans');
            setTimeout(function () {
                callback(err);
            }, randomResponseTime(10, 20));
            return;
        }
        else {
            _items.push(newTodo);

            setTimeout(function () {
                callback(null, newTodo);
            }, randomResponseTime(10, 20));
        }
    },
    update: function (req, resource, params, body, config, callback) {
        if (resource === 'todo.toggleAll') {
            _items.forEach(function (todo, index) {
                todo.completed = params.checked;
            });

            setTimeout(function () {
                callback(null, _items);
            }, randomResponseTime(10, 20));
        }
        else {
            var foundTodo;

            _items.forEach(function (todo, index) {
                if (params.id === todo.id) {
                    todo.title = params.title;
                    todo.completed = params.completed;
                    _items[index] = todo;
                    foundTodo = todo;
                }
            });

            setTimeout(function () {
                callback(null, foundTodo);
            }, randomResponseTime(10, 20));
        }
    },
    delete: function(req, resource, params, config, callback) {
        _items = _items.filter(function (todo, index) {
            return params.ids.indexOf(todo.id) === -1;
        });

        setTimeout(function () {
            callback(null, _items);
        }, randomResponseTime(10, 20));
    }
};
