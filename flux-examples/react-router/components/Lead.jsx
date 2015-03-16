/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var ListStore = require('../stores/ListStore');
var ListItem = require('./ListItem.jsx');
var loadList = require('../actions/loadList');
var FluxibleMixin = require('fluxible').Mixin;

function getListItem(item) {
    return (
        <ListItem key={item._id} item={item} />
    );
}

var Lead = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [ListStore]
    },
    getInitialState: function () {
        return this.getStateFromStores();
    },
    getStateFromStores: function () {
        return {
            items: this.getStore(ListStore).getAll()
        };
    },
    componentDidMount: function()
    {
        this.executeAction(loadList);
    },
    loadLeads: function (event) {
        //var checked = event.target.checked;
        this.executeAction(loadList);
    },
    render: function () {
        //console.log('render', this.state.items);
        var listItems = '';
        //if ( this.state.items !== null )
        //{
            listItems = this.state.items.map(getListItem);
        //}
        return (
            <div className="message-section">
                <h3 className="message-thread-heading">Leads list</h3>
                <a href="#" onClick={this.loadLeads}>
                    Load Leads from db
                </a>
                <ul className="message-list" ref="messageList">
                    {listItems}
                </ul>
            </div>
        );
    },
    onChange: function () {
        //console.log('On Change');
        this.setState(this.getStateFromStores());
    }
});

module.exports = Lead;
