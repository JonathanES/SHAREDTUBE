import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from '../videos/video';
import { getVideosPlaylist } from '../../socket/playlistSocket';
const mapStateToProps = state => ({
    listOfPlaylist: state.playlist.listOfPlaylist
});

class PlaylistPage extends Component {
    constructor(props) {
        super();
        this.state = {
            //list saying if a video is in the playlist or not
            listOfPlaylist: props.listOfPlaylist,
            displayVideosOfPlaylist: false,
            videosOfPlaylist: []
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event, id_playlist) {
        console.log(id_playlist);
        getVideosPlaylist(id_playlist, (err, data) => {
            this.setState({ videosOfPlaylist: data });
            this.setState({ displayVideosOfPlaylist: true });
            //this.props.dispatch({ type: 'SET_PLAYLIST_VIDEOS', videosOfPlaylist: data });
        })
        event.preventDefault();
    }
    render() {
        return (
            <div>
                {!this.state.displayVideosOfPlaylist &&
                    <div className="thumbnail-contain">
                        <div className="search-container">
                            {this.state.listOfPlaylist.map(playlist =>
                                <a key={playlist.id_playlist} id={playlist.id_playlist} className="yt-thumbnail" href="#" onClick={(event) => this.handleClick(event, playlist.id_playlist)}>
                                    {playlist.name}
                                </a>
                            )}
                        </div>
                    </div>
                }
                {this.state.displayVideosOfPlaylist &&
                    <div>
                        <Video videosOfPlaylist={this.state.videosOfPlaylist} />
                    </div>
                }
            </div>
        );
    }
}
export default connect(mapStateToProps)(PlaylistPage);