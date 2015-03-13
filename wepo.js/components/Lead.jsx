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
        <ListItem
            key={item.id}
            item={item}
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
        return {
            items: this.getStore(ListStore).getAll()
        };
    },
    loadLeads: function (event) {
        //var checked = event.target.checked;
        this.executeAction(loadList);
    },
    render: function () {
        //console.log('On render state = ', this.state.items.map);
        var listItems = this.state.items.map(getListItem);
        return (
            <div className="message-section">
                <h3 className="message-thread-heading">Leads list</h3>
                <a href="#" onClick={this.loadLeads}>
                    Load Leads from db
                </a>
                <ul className="message-list" ref="messageList">
                </ul>
                {listItems}
            </div>
        );
    },
    _onChange: function () {
        console.log('On Change');
        this.setState(this.getStateFromStores());
    }
});

module.exports = Lead;
