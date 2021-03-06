import React from 'react';
import PlayButtonContainer from '../play_button/play_button_container';
import Vibrant from 'node-vibrant';
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
      userId: (this.props.track) ? this.props.track.userId : null,
      commentRequestOffset: 0,
      color1: "#002f84",
      color2: "#3b9efe",
      optsVisible: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleOpts = this.toggleOpts.bind(this);
    this.optsClickout = this.optsClickout.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.trackLoaded = this.trackLoaded.bind(this);
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
        // debugger
        let url = that.props.track.imageUrl.replace(/^http:\/\//i, 'https://');
        //Fetching didn't work for browser specific reasons; chrome and safari cache previous request without proper request headers for CORS... maybe
        //If we don't change the URL to https from http and set img.crossOrigin to anonymous, Vibrant fails due to tainting from CORS.
        //The latter makes sense, the former is confusing...
        let img = document.createElement('img');
        img.src = this.props.track.imageUrl;
        img.crossOrigin = "anonymous";
        img.onload = (res) => {
          let vibrant = new Vibrant(img);
          vibrant.getPalette().then(palette => {
            let count = 1;
            Object.keys(palette).forEach((key) => {
              if (count > 2) {return;}
              if (palette[key]) {
                that.setState({[`color${count}`]: palette[key].getHex(), [`color${count + 1}`]: palette[key].getHex()});
                count ++;
              }
            });
          }).catch(err => console.log(err));
        };
        img.src = url;

        this.props.clearComments();
        this.props.requestComments(this.state.id, 0, 50);
      });
    window.addEventListener('scroll', this.handleScroll);
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

  componentWillUnmount() {
    this.props.clearComments();
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    if (window.innerHeight + window.pageYOffset > this.trackShowPage.scrollHeight) {
      if (!this.props.waitingForComments
        && this.props.comments.length < this.props.totalComments){
          this.props.requestComments(this.state.id, this.state.commentRequestOffset + 50, 50);
          this.setState({commentRequestOffset: this.state.commentRequestOffset + 50});
          this.props.changeWaitingComments(true);
      }
    }
  }

  trackLoaded(key){
    return this.props.track ? this.props.track[key] : null;
  }

  toggleOpts(e){
    if (this.state.optsVisible) {
      this.setState({optsVisible: false});
      const that = this;
      document.removeEventListener('click', this.optsClickout);
    } else {
      this.setState({optsVisible: true});
      document.addEventListener("click", this.optsClickout);
    }
  }

  optsClickout(e) {
    let target = e.target;
    this.setState({optsVisible: false});
    document.removeEventListener('click', this.optsClickout);
  }

  toggleLike() {
    if (this.props.currentUser.likes && this.props.currentUser.likes[this.trackLoaded("id")]) {
      this.props.deleteLike(this.props.currentUser.likes[this.trackLoaded("id")].id);
    } else {
      this.props.createLike({
        user_id: this.props.currentUser.id,
        likeable_id: this.props.track.id,
        likeable_type: "Track"
      });
    }
  }


  render() {
    return (
      <main ref={(trackShow) => {this.trackShowPage = trackShow;}} id="track-show-container">
        <section id="track-show-header" style={{background: `linear-gradient(90deg, ${this.state.color1}, ${this.state.color2}`}}>
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

        <section id="track-show-panel" style={{width: `${this.props.currentUser ? '160px': '85px'}`}}>
          {!this.props.currentUser ? null :
            <div onClick={this.toggleLike} className={`track-show-panel-button ${this.props.isLiked ? "background-blue" : ""}`}>
              <i className="fas fa-heart"></i> Like
            </div>
          }
          <div onClick={this.toggleOpts}
            className={`track-show-panel-button ${this.state.optsVisible ? 'toggled' : ''}`}>
            <i className="fas fa-ellipsis-h"></i> More
          </div>
          {!this.state.optsVisible ? null :
            <div className="track-show-options-menu">
              <div onClick={(e) => this.props.addToQueueEnd(this.trackLoaded("id"))}>Add to queue</div>
              <div onClick={(e) => this.props.addToQueueNext(this.trackLoaded("id"))}>Play next</div>
            </div>
          }
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
                {this.props.comments.map((comment, idx) => {
                    return <CommentIndexItemContainer key={idx} comment={comment} />;
                })}
                {this.props.comments.length < this.props.totalComments ?
                  <div className="track-show-loader"></div> : null
                }
              </section>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default TrackShow;
