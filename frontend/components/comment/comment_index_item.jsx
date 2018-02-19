import React from 'react';
import { Link } from 'react-router-dom';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: false, confirmation: false};
    this.loadedUser = this.loadedUser.bind(this);
    this.setActiveValue = this.setActiveValue.bind(this);
    this.setConfirmationValue = this.setConfirmationValue.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.requestUser(this.props.comment.userId);
    }
  }

  loadedUser(key) {
    return this.props.user ? this.props.user[key] : null;
  }

  setActiveValue(bool) {
    if (this.props.belongsToCU) {
      if (bool || (!bool && !this.state.confirmation)) {
        this.setState({active: bool});
      }
    }
  }

  setConfirmationValue(bool) {
    if (this.props.belongsToCU) {
      this.setState({confirmation: bool});
    }
  }

  deleteComment() {
    this.props.deleteComment(); //default values in container
  }

  parseTime(time) {
    return `${parseInt(time/60)}:${parseInt(time % 60) < 10 ? "0" : "" }${parseInt(time % 60)}`;
  }

  timeStamp() {
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
      result = `${1 + date.getMonth()}/${date.getDate()}/${1900 + date.getYear()}`;
    }
    return result;
  }

  render() {
    return (
      <section  className="comment-index-item-container"
        onMouseEnter={() => this.setActiveValue(true)} onMouseLeave={() => this.setActiveValue(false)}>
        <Link to={`/users/${this.loadedUser('id')}`} className="comment-index-item-image"
          style={{backgroundImage: `url(${this.loadedUser("profileImageUrl")})`, display: 'block'}}>
        </Link>
        <div className="comment-index-item-info">
          <div className="comment-index-item-info-upper">
            <div className="comment-index-item-username">
              <Link to={`/users/${this.loadedUser('id')}`}>{this.loadedUser("username")}</Link> at <span>{this.parseTime(this.props.comment.timestamp)}</span>
            </div>
            <div className="comment-index-item-date">
              {this.timeStamp()}
            </div>
          </div>
          <div className="comment-index-item-info-upper">
            <div className="comment-index-item-body">
              {this.props.comment.body}
            </div>
            {!this.state.active ? null :
              <div onClick={() => this.setConfirmationValue(!this.state.confirmation)}
                 className={`comment-index-item-trash ${this.state.confirmation ? "blue" : ""}`}>
                <i className="fas fa-trash"></i>
                  {!this.state.confirmation ? null :
                    <div className="comment-index-item-trash-confirmation">
                      <p>{"Are you sure you want to delete this comment?"}</p>
                      <section>
                        <div onClick={() => this.setConfirmationValue(false)}>
                          Cancel
                        </div>
                        <div onClick={this.deleteComment}>
                          Yes
                        </div>
                      </section>
                    </div>
                  }
              </div>
            }
          </div>
        </div>
      </section>
    );
  }
}

export default CommentIndexItem;
