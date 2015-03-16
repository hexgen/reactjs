/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
require('babel/register');
var express = require('express');
var favicon = require('serve-favicon');
var serialize = require('serialize-javascript');
var debug = require('debug')('Example');
var React = require('react');
var Router = require('react-router');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

var app = require('./app');
var HtmlComponent = React.createFactory(require('./components/Html.jsx'));
var navigateAction = require('./actions/navigate');

var server = express();
server.use(favicon(__dirname + '/../favicon.ico'));
server.use('/public', express.static(__dirname + '/build'));

//server.set('state namespace', 'App');
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));


// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');

// Register our items REST service
fetchrPlugin.registerService(require('./services/items'));

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use(function (req, res, next) {
    var context = app.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });

    debug('Executing navigate action');
    Router.run(app.getComponent(), req.path, function (Handler, state) {
        context.executeAction(navigateAction, state, function (err) {
            if (err) {
                if (err.status && err.status === 404) {
                    next();
                } else {
                    next(err);
                }
                return;
            }

            debug('Exposing context state');
            var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

            debug('Rendering Application component into html');
            var Component = React.createFactory(Handler);
            var html = React.renderToStaticMarkup(HtmlComponent({
                title: 'default title',
                state: exposed,
                markup: React.renderToString(Component({context:context.getComponentContext()})),
                context: context.getComponentContext()
            }));

            debug('Sending markup');
            res.send(html);
        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
