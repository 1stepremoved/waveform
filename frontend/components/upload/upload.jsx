import React from 'react';
import { withRouter } from 'react-router-dom';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {page2: false, title: "", description: "", userId: this.props.currentUser.id,
                  track: null, trackUrl: "",
                  trackImage: null, trackImageUrl: "http://localhost:3000/assets/default_track_image-92d29c99c964858a01301d70bf0aa56293ab8aaf9344fb064075a4324ded0ffe.jpg",
                  titleMissingError: false
                };
    this.update = this.update.bind(this);
    this.page2 = this.page2.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(type) {
    return e => {
      this.setState({[type]: e.target.value});
    };
  }

  updateFile(type) {
    const that = this;
    return (e) => {
      var file = e.currentTarget.files[0];
      var fileReader = new FileReader();
      fileReader.onloadend = () =>{
        that.setState({[type]: file, [`${type}Url`]: fileReader.result, page2: true});
      };

      if (file) {
        fileReader.readAsDataURL(file);
      }
    };
  }

  resetState() {
    this.setState({page2: false, title: "", description: "",
                  track: null, trackUrl: "",
                  trackImage: null, trackImageUrl: "http://localhost:3000/assets/default_track_image-92d29c99c964858a01301d70bf0aa56293ab8aaf9344fb064075a4324ded0ffe.jpg"}
                );
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.title === "") {
      return this.setState({titleMissingError: true});
    }
    let formData = new FormData();
    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description );
    formData.append("track[audio]", this.state.track);
    if (this.state.trackImage) {
      formData.append("track[image]", this.state.trackImage);
    }
    formData.append("track[user_id]", this.state.userId);
    this.props.createTrack(formData);
    this.props.history.push("/stream");
  }

  page2() {
    return (
      <form onSubmit={this.handleSubmit} id="upload-page-2-form">
        <section id="upload-page-2">
          <div id="upload-track-image"
              style={{backgroundImage: `url(${this.state.trackImageUrl})`}}>
            <label htmlFor="change-image-file" id="change-image-file-label">
              <i className="fas fa-camera"></i> Update Image
            </label>
            <input onChange={this.updateFile("trackImage")} type="file"
              id='change-image-file'></input>
          </div>
          <div id="upload-track-info">
            <label>Title <span id="upload-title-missing-error">{
                this.state.titleMissingError ? "*You must title your track" : null
              }</span><br></br>
              <input type="text" value={this.state.title}
                placeholder="Name your track"
                onChange={this.update("title")}></input>
            </label>
            <label>Description<br></br>
              <textarea placeholder="Describe your track"
                value={this.state.description} rows="9"
                onChange={this.update("description")}></textarea>
            </label>
          </div>
        </section>
        <div id="upload-submit-cancel">
          <input type="submit" value="Save"></input>
          <button onClick={this.resetState} id="upload-cancel-button">Cancel</button>
        </div>
      </form>
    );
  }

  render () {
    return (
      <main id="upload-page-container">
        <section id="upload-page1">
          <div id="upload-welcome">
            Upload to WaveForm
          </div>
          <label htmlFor="track-upload-input" id="track-upload-input-label">
            Choose a file to upload
          </label>
          <input type="file" id="track-upload-input" type="file"
            onChange={this.updateFile("track")}></input>
          {this.state.page2 ? this.page2() : null}
        </section>
      </main>
    );
  }
}

export default withRouter(Upload);
