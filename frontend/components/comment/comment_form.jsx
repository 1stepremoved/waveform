import React from 'react';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {body: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault(e);
    if (this.state.body === "") {
      return;
    }
    let comment = {
      body: this.state.body,
      user_id: this.props.currentUser.id,
      commentable_id: this.props.commentableId,
      commentable_type: this.props.commentableType,
      timestamp: (this.props.currentlyPlayingId === this.props.commentableId
                  && this.props.commentableType === "Track")
                  ? this.props.position : 0
    };

    this.props.createComment(comment, this.props.currentUser.id)
      .then(() => this.setState({body: ""}));
  }

  render() {
    return (
      <main className="comment-form-container">
        {!this.props.trackShow ? null :
          <div className="comment-form-user-image"
            style={{backgroundImage: `url(${this.props.currentUser.profileImageUrl})`}}>
          </div>
        }
        <form className="comment-form-container" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.body} className="comment-form-container-input"
            ref={(input) => {this.input = input;}}
            onChange={(e)=>this.setState({body: e.target.value})}
            placeholder="Write a comment"></input>
        </form>
      </main>);

  }
}

export default CommentForm;
