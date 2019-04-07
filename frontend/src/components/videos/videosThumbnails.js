import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';
import '../../main.css';
import PlaylistVideo from '../playlist/thumbnailPage/playlistVideo';
//import { getUserPlaylist } from '../../socket/playlistSocket';


const mapStateToProps = state => ({
  selectedVideos: state.video.selectedVideo,
  id_user: state.user.id_user,
  listOfPlaylist: state.playlist.listOfPlaylist
});


class Videos extends Component {
  constructor(props) {
    super();
    this.state = {
      displayPlaylist: false,
    }
    console.log(this.props);
    // this._onStateChange = this._onStateChange.bind(this);
  }

  getVideoId() {
    console.log(this.props);
    return this.props.selectedVideos.id;
  }
  handleClick() {
    alert("hello");
    this.props.dispatch({ type: "VIDEO_EXIT" });
  }
  /*_onStateChange(event) {
    if (event.data === 0) {
      event.target.playVideo();
      event.data = 1;
    }
  }*/
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    };
    return (
      <div id="modal">
        <input class="close-modal" type="image" src={require("../../Images/exit.svg")} onClick={() => this.props.dispatch({ type: "VIDEO_EXIT" })} />
        <div className="yt-player">
          <YouTube
            videoId={this.getVideoId()}
            opts={opts}
            onReady={this._onReady}
          //       onStateChange={this._onStateChange}
          />
          <input id="add-to-playlist" type="image" src={require("../../Images/playlist.svg")} onClick={() =>  this.state.displayPlaylist ? this.setState({displayPlaylist: false}) : this.setState({displayPlaylist: true})} />
          {this.state.displayPlaylist && <PlaylistVideo  listOfPlaylist={this.props.listOfPlaylist} video={this.props.selectedVideos}/>}
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps)(Videos);