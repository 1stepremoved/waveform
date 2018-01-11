import React from 'react';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.loadedUser = this.loadedUser.bind(this);
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.requestUser(this.props.comment.userId);
    }
  }

  loadedUser(key) {
    return this.props.user ? this.props.user[key] : null;
  }

  render() {
    return (
      <section className="comment-index-item-container">
        <div className="comment-index-item-image"
          style={{backgroundImage: `url(${this.loadedUser("profileImageUrl")})`}}>
        </div>
        <div className="comment-index-item-info">
          <div className="comment-index-item-username">
            <span>{this.loadedUser("username")}</span> at <span>{this.props.comment.timestamp}</span>
          </div>
          <div className="comment-index-item-body">
            {this.props.comment.body}
          </div>
        </div>
        <div className="comment-index-item-date">
          {this.props.comment.createdAtDate}
        </div>
      </section>
    );
  }
}

export default CommentIndexItem;
