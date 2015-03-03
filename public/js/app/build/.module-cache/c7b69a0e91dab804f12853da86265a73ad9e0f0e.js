/**
 * Created by vlad on 03.03.15.
 */
// tutorial1.js
var CommentBox = React.createClass({displayName: "CommentBox",
    render: function ()
    {
        return (
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "Comments"), 
                React.createElement(CommentList, null), 
                React.createElement(CommentForm, null)
            )
        );
    }
});

// tutorial2.js
var CommentList = React.createClass({displayName: "CommentList",
    render: function() {
        return (
            React.createElement("div", {className: "commentList"}, 
                "Hello, world! I am a CommentList."
            )
        );
    }
});

var CommentForm = React.createClass({displayName: "CommentForm",
    render: function() {
        return (
            React.createElement("div", {className: "commentForm"}, 
                "Hello, world! I am a CommentForm."
            )
        );
    }
});

React.render(
    React.createElement(CommentBox, null),
    document.getElementById('content')
);


React.render(
    React.createElement("h1", null, "Hello, world!"),
    document.getElementById('example')
);
