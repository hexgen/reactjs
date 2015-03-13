/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var MongoClient = require('../../node_modules/mongodb').MongoClient, assert = require('assert');


var url = 'mongodb://192.168.10.170:27017/wepo_company_zoho_bk_26_02_15';

var find = function (db, collectionName, callback) {
    var collection = db.collection(collectionName);
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(err, docs);
    });
}

module.exports = function (context, payload, done) {
    console.log('loadList Action!!!!121112');
    context.dispatch('RECEIVE_LIST_START', payload);

    //TODO Create connection to database and read Lead List

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected to the MongoDB");
        find(db, 'User', function (err, items) {
            if (err) {
                context.dispatch('RECEIVE_LIST_FAILURE', payload);
                done();
                return;
            }
            context.dispatch('RECEIVE_LIST_SUCCESS', items);
            done();
        });
    });
};
