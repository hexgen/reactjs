var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var Application = require('./Application.jsx');
var Home = require('./Home.jsx');
var About = require('./About.jsx');
var Lead = require('./Lead.jsx');

var routes = (
    <Route name="app" path="/" handler={Application}>
        <DefaultRoute name="home" handler={Home}/>
        <Route name="lead" handler={Lead}/>
        <Route name="about" handler={About}/>
    </Route>
);

module.exports = routes;