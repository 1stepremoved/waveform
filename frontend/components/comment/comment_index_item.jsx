import React from 'react';
import { Link } from 'react-router-dom';

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

  parseTime(time) {
    return `${parseInt(time/60)}:${parseInt(time % 60) < 10 ? "0" : "" }${parseInt(time % 60)}`;
  }

  timeStamp() {
    debugger;
    let date = new Date(this.props.comment.createdAtInt);
    let timeSince = Date.now() - date.getTime();
    let result, num;
    if (timeSince < 60000) {
      num = Math.floor(timeSince / 1000);
      result = `${num} second${num === 1 ? '' : 's'} ago`;
    } else if (timeSince < 3600000) {
      num = Math.floor(timeSince / 60000);
      result = `${num} minute${num === 1 ? '' : 's'} ago`;
    } else if (timeSince < 86400000) {
      num = Math.floor(timeSince / 3600000);
      result = `${num} hour${num === 1 ? '' : 's'} ago`;
    } else if (timeSince < 604800000) {
      num = Math.floor(timeSince / 86400000);
      result = `${num} day${num === 1 ? '' : 's'} ago`;
    } else {
      result = `${1 + date.getMonth()}/${date.getDate()}/${1900 + date.getYear()}`
    }
    return result;
  }

  render() {
    return (
      <section className="comment-index-item-container">
        <Link to={`/users/${this.loadedUser('id')}`} className="comment-index-item-image"
          style={{backgroundImage: `url(${this.loadedUser("profileImageUrl")})`, display: 'block'}}>
        </Link>
        <div className="comment-index-item-info">
          <div className="comment-index-item-username">
            <Link to={`/users/${this.loadedUser('id')}`}>{this.loadedUser("username")}</Link> at <span>{this.parseTime(this.props.comment.timestamp)}</span>
          </div>
          <div className="comment-index-item-body">
            {this.props.comment.body}
          </div>
        </div>
        <div className="comment-index-item-date">
          {this.timeStamp()}
        </div>
      </section>
    );
  }
}

export default CommentIndexItem;
