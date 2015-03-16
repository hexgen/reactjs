/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');

var PageStore = createStore({
    storeName: 'PageStore',
    handlers: {
        'LOAD_PAGE': 'handleContentChange',
        'UPDATE_PAGE_TITLE': 'updatePageTitle'
    },
    initialize: function () {
        this.content = 'initial content...';
        this.pageTitle = '';
    },
    handleContentChange: function (payload) {
        this.content = 'content for page with id '+payload.id;
        this.pageTitle = title;
        this.emitChange();
    },
    updatePageTitle: function (title) {
        this.pageTitle = title;
        this.emitChange();
    },
    getState: function () {
        return {
            content: this.content,
            pageTitle: this.pageTitle
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.content = state.content;
        this.pageTitle = state.pageTitle;
    }
});

module.exports = PageStore;
