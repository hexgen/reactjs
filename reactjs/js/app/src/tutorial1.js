/**
 * Created by vlad on 03.03.15.
 */
// tutorial1.js
var CommentBox = React.createClass({
    getInitialState: function ()
    {
        return {data: []};
    },
    handleCommentSubmit: function (comment)
    {
        var comments = this.state.data;
        var newComment = comment;
        newComment.id = comments.length+1;
        var newComments = comments.concat([newComment]);
        this.setState({data: newComments});

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function (data)
            {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err)
            {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadCommentsFromServer: function ()
    {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data)
            {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err)
            {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function ()
    {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function ()
    {
        return (

            <div className="commentBox">
                <h1>Comments:</h1>
                <CommentList data={this.state.data} />
                <a href="/">link</a>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
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
    handleSubmit: function (e)
    {
        e.preventDefault();
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
    },
    render: function ()
    {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
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

React.render(
    <CommentBox url="comments.json" pollInterval={4000} />,
    document.getElementById('content')
);
