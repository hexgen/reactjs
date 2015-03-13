/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');

var ListStore = createStore({
    storeName: 'ListStore',
    handlers: {
        'RECEIVE_LIST_SUCCESS': '_receiveList'
    },
    initialize: function () {
        this.items = [];
        //this.items = [{'id':3,'title':'lead3'},{'id':4,'title':'lead4'}];
    },
    //receiveMessages: function (items) {
    //    var self = this;
    //    items.forEach(function (item) {
    //        self.items[item.id] = item;
    //    });
    //    self.emitChange();
    //},
    _receiveList: function (items) {
        this.items = items;
        this.emitChange();
    },
    getAll: function () {
        return this.items;
    },
    get: function (id) {
        return this.item[id];
    },
    dehydrate: function () {
        return {
            items: this.items
        };
    },
    rehydrate: function (state) {
        this.items = state.items;
    }
});

module.exports = ListStore;
