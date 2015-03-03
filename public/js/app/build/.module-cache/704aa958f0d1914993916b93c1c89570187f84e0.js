/**
 * Created by vlad on 03.03.15.
 */
// tutorial1.js
var CommentBox = React.createClass({displayName: "CommentBox",
    render: function ()
    {
        return (
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "Comments:")
            )
        );
    }
});

React.render(
    React.createElement(CommentBox, null),
    document.getElementById('content')
);
