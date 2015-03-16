/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    handlers: {
        'CHANGE_ROUTE': 'handleNavigate',
        'UPDATE_PAGE_TITLE': 'updatePageTitle'
    },
    initialize: function () {
        this.currentRoute = null;
        this.pageTitle = 'Default App Title';
    },
    handleNavigate: function (route) {
        if (this.currentRoute && route.path === this.currentRoute.path) {
            return;
        }

        this.currentRoute = route;
        this.emitChange();
    },
    updatePageTitle: function (title) {
        this.pageTitle = title.pageTitle;
        this.emitChange();
    },
    getPageTitle: function () {
        return this.pageTitle;
    },
    getState: function () {
        return {
            route: this.currentRoute,
            title: this.pageTitle
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.currentRoute = state.route;
        this.pageTitle = state.pageTitle;
    }
});


module.exports = ApplicationStore;
