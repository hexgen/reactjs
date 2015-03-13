/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var Fluxible = require('fluxible');
var MongoClient = require('mongodb').MongoClient;

var app = new Fluxible({
    component: require('./components/Routes.jsx')
});

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/ListStore'));
app.registerStore(require('./stores/TimeStore'));
app.registerStore(require('./stores/PageStore'));

module.exports = app;
