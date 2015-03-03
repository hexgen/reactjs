/**
 * Created by vlad on 03.03.15.
 */
// tutorial1.js
var CommentBox = React.createClass({displayName: "CommentBox",
    render: function ()
    {
        return (
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "Comments:"), 
                React.createElement(CommentList, {data: this.props.data}), 
                React.createElement(CommentForm, null)
            )
        );
    }
});

var CommentList = React.createClass({displayName: "CommentList",
    render: function ()
    {
        var commentNodes = this.props.data.map(function (comment)
        {
            return (
                React.createElement(Comment, {author: comment.author, key: comment.id}, 
                    comment.text
                )
            );
        });
        return (
            React.createElement("div", {className: "commentList"}, 
                commentNodes
            )
        );
    }
});

var CommentForm = React.createClass({displayName: "CommentForm",
    render: function ()
    {
        return (
            React.createElement("div", {className: "commentForm"}, 
                "Hello, world! I am a CommentForm."
            )
        );
    }
});

var Comment = React.createClass({displayName: "Comment",
    render: function ()
    {
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            React.createElement("div", {className: "comment"}, 
                React.createElement("h2", {className: "commentAuthor"}, 
                    this.props.author
                ), 
                React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
            )
        );
    }
});

var converter = new Showdown.converter();

var data = [
    {id:1, author: "Pete Hunt", text: "This is one comment"},
    {id:2, author: "Jordan Walke", text: "This is *another* comment"}
];

React.render(
    React.createElement(CommentBox, {url: "comments.json"}),
    document.getElementById('content')
);
