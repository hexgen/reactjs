/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');

var app = new Fluxible({
    component: require('./components/Routes.jsx')
});

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/ListStore'));
app.registerStore(require('./stores/TimeStore'));

module.exports = app;
