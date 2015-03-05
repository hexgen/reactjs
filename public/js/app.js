/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var Router = require('react-router');

var {
    Route,
    DefaultRoute,
    NotFoundRoute,
    RouteHandler,
    Link
    } = Router;

var WepoApp = require('./components/WepoApp.react');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <ul>
                    <li><Link to="dashboard">Dashboard</Link></li>
                    <li><Link to="form">Form</Link></li>
                </ul>
                <RouteHandler/>
            </div>
        );
    }
});

var Home = React.createClass({
    render: function () {
        return <h1>Home</h1>;
    }
});

var NewContact = React.createClass({
    render: function () {
        return <h1>Home</h1>;
    }
});

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Index}/>
        <Route name="new" path="contact/new" handler={NewContact}/>
        <Route name="contact" path="contact/:id" handler={Contact}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

Router.run(routes, function (Handler)
{
    React.render(<Handler/>, document.getElementById('example'));
});

//React.render(
//  <WepoApp />,
//  document.getElementById('wepoapp')
//);
//
