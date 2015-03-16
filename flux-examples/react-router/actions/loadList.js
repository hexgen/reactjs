/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (context, payload, done) {
    console.log('loadList Action!!!!121112');
    context.dispatch('RECEIVE_LIST_START', payload);
    context.dispatch('UPDATE_PAGE_TITLE', 'WEPO | Lead List');

    //TODO Create connection to database and read Lead List

    context.service.read('items', {}, {}, function (err, items) {
        if (err) {
            context.dispatch('RECEIVE_LIST_FAILURE', payload);
            done();
            return;
        }
        context.dispatch('RECEIVE_LIST_SUCCESS', items);
        done();
    });
};
