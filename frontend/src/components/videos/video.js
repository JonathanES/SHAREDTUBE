import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';
import '../../main.css';

const mapStateToProps = state => ({
  videosOfPlaylist: state.playlist.videosOfPlaylist
});

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1
  }
};
class Videos extends Component {
  constructor(props) {
    super();
    this.state = {
      //list saying if a video is in the playlist or not
      videosOfPlaylist: props.videosOfPlaylist,
      currentId: typeof props.videosOfPlaylist[0] !== 'undefined' ? props.videosOfPlaylist[0].id_video : '',
      index: 0
    }
  }
  componentDidUpdate(prevState) {
    if (prevState.videosOfPlaylist.length != this.props.videosOfPlaylist.length) {
      if (this.props.videosOfPlaylist.length == 0)
        this.setState({ videosOfPlaylist: this.props.videosOfPlaylist, currentId: '' });
      else
        this.setState({ videosOfPlaylist: this.props.videosOfPlaylist, currentId: this.props.videosOfPlaylist[0].id_video });
    }
  }
  _onStateChange = (event) => {
    if (event.data === 0) {
      let currentIndex = this.state.index;
      if (this.state.index < this.state.videosOfPlaylist.length - 1)
        currentIndex++;
      else
        currentIndex = 0;
      const currentId = this.state.videosOfPlaylist[currentIndex].id_video;
      this.setState({ index: currentIndex, currentId: currentId })
      event.target.playVideo();
      event.data = 1;
    }
  }
  render() {
    return (
      <div className="yt-player">
        {this.state.currentId.length > 0 && 
        <YouTube
          videoId={this.state.currentId}
          opts={opts}
          onReady={this._onReady}
          onStateChange={this._onStateChange}
        />
        }
      </div>
    );
  }
}

export default Videos;