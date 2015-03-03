/**
 * Created by vlad on 03.03.15.
 */
// tutorial1.js
var CommentBox = React.createClass({
    render: function ()
    {
        return (
            <div className="commentBox">
                <h1>Comments:</h1>
                <CommentList data={this.props.data} />
                <CommentForm />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function ()
    {
        var commentNodes = this.props.data.map(function (comment)
        {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function ()
    {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});

var Comment = React.createClass({
    render: function ()
    {
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});

var converter = new Showdown.converter();

var data = [
    {id:1, author: "Pete Hunt", text: "This is one comment"},
    {id:2, author: "Jordan Walke", text: "This is *another* comment"}
];

React.render(
    <CommentBox url="comments.json" />,
    document.getElementById('content')
);
