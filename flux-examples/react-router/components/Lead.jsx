/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var ListStore = require('../stores/ListStore');
var ListItem = require('./ListItem.jsx');
var FluxibleMixin = require('fluxible').Mixin;

function getListItem(item) {
    return (
        <ListItem
            key={item.id}
            message={item}
        />
    );
}

var Lead = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: {
            _onChange: [ListStore]
        }
    },
    getInitialState: function () {
        return this.getStateFromStores();
    },
    getStateFromStores: function () {
        console.log('12321312323',this.getStore(ListStore).getAll());
        return {
            //items: this.getStore(ListStore).getAll()
            items: [{'id':3,'title':'lead3'},{'id':4,'title':'lead4'}]
        };
    },
    render: function () {
        //var listItems = this.state.messages.map(getListItem);
        var Leads = this.state.items.map(getListItem);
        //var Leads = [{'id':1,'title':'lead1'},{'id':2,'title':'lead2'}];
        var listItems = Leads.map(getListItem);
        return (
            <div className="message-section">
                <h3 className="message-thread-heading">Leads list</h3>
                <ul className="message-list" ref="messageList">
                </ul>
                {listItems}
            </div>
        );
    },
    _onChange: function () {
        this.setState(this.getStateFromStores());
    }
});

module.exports = Lead;
