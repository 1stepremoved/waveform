import React from 'react';
import PlayButtonContainer from '../play_button/play_button_container';
import { Link } from 'react-router-dom';
import CommentFormContainer from '../comment/comment_form_container';
import CommentIndexItemContainer from '../comment/comment_index_item_container';

class TrackShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: (this.props.id) ? this.props.track.id : null,
      username: (this.props.track) ? this.props.track.username : null,
      title: (this.props.track) ? this.props.track.title : null,
      imageUrl: (this.props.track) ? this.props.track.imageUrl : null,
      userImageUrl: (this.props.track) ? this.props.track.userImageUrl : null,
      description: (this.props.track) ? this.props.track.description : null,
      userId: (this.props.track) ? this.props.track.userId : null
    };
  }

  componentDidMount() {
    const that = this;
    this.props.requestTrack(this.props.match.params.trackId)
      .then(()=>{
        that.setState({
          id: this.props.track.id,
          username: this.props.track.username,
          title: this.props.track.title,
          imageUrl: this.props.track.imageUrl,
          userImageUrl: this.props.track.userImageUrl,
          description: this.props.track.description,
          userId: this.props.track.userId
        });
        this.props.clearComments();
        this.props.requestComments(this.state.id, 0, 50);
      });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.track && this.props.track.id !== parseInt(newProps.match.params.trackId)) {
      const that = this;
      this.props.requestTrack(this.props.match.params.trackId)
        .then(()=>{
          that.setState({
            id: this.props.track.id,
            username: this.props.track.username,
            title: this.props.track.title,
            imageUrl: this.props.track.imageUrl,
            userImageUrl: this.props.track.userImageUrl,
            description: this.props.track.description,
            userId: this.props.track.userId
          });
          this.props.clearComments();
          this.props.requestComments(this.state.id, 0, 50);
        });
    }
  }


  render() {
    return (
      <main id="track-show-container">
        <section id="track-show-header">
          <div id="track-show-header-left">
            <div id="track-show-header-info">
              {!this.props.track ? null :
                <PlayButtonContainer visible={true} classname="track-show-header-play-button" track={this.props.track}/>
              }
              <div id="track-show-header-by-info">
                <Link to={`/users/${this.state.userId}`} id="track-show-header-username">
                  {this.state.username}
                </Link>
                <span id="track-show-header-title">
                  {this.state.title}
                </span>
              </div>
            </div>
          </div>
          <div id="track-show-header-image"
            style={{backgroundImage: `url(${this.state.imageUrl})`}}>
          </div>
        </section>



        <section id="track-show-info-container">
          {!this.props.currentUser ? null :
            <CommentFormContainer commentableId={this.state.id} commentableType="Track"
              trackShow={true}/>
          }
          <div id="track-show-info">
            <div id="track-show-info-user">
              <div id="track-show-info-user-image"
                style={{backgroundImage: `url(${this.state.userImageUrl})`}}>
              </div>
              <span id="track-show-info-user-username">
                <Link to={`/users/${this.state.userId}`}> {this.state.username} </Link>
              </span>
            </div>
            <div id="track-show-info-comments-description">
              <div id="track-show-info-description">
                <span>Description:</span><br></br>
                {this.state.description}
              </div>
              <section id="track-show-info-comments">
                <div>
                  <i className="fas fa-comment"></i> {this.props.totalComments} comments
                </div>
                {this.props.comments.map(comment => {
                    return <CommentIndexItemContainer comment={comment} />;
                })}
              </section>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default TrackShow;
