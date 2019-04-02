import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkVideoPlaylist, insertVideoInPlaylist, removeVideoOfPlaylist } from '../../socket/playlistSocket';
import CreatePlaylist from './createPlaylistVideo';
import { getUserPlaylistVideo } from '../../socket/playlistSocket';


const mapStateToProps = state => ({
    selectedVideos: state.video.selectedVideo,
    id_user: state.user.id_user,
    listOfPlaylist: state.playlist.listOfPlaylist
});

class Playlist extends Component {
    constructor(props) {
        super();
        this.state = {
            //list saying if a video is in the playlist or not
            listOfPlaylist: [],
            createPlaylist: false,
            id_video: props.selectedVideos.id
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /** when arriving on this component, retrieve the list of playlist
     *  and see if the video is part of it or not */
    async componentDidMount() {
        getUserPlaylistVideo(this.props.id_user, this.state.id_video, (err, data) => {
            console.log(data);
            this.setState({ listOfPlaylist: data });
            this.props.dispatch({ type: 'GET_PLAYLIST_USER', listOfPlaylist: data })
        });
    }
    componentDidUpdate() {
        if (this.props.listOfPlaylist.length != this.state.listOfPlaylist.length)
            getUserPlaylistVideo(this.props.id_user, this.state.id_video, (err, data) => {
                console.log(data);
                this.setState({ listOfPlaylist: data });
                this.props.dispatch({ type: 'GET_PLAYLIST_USER', listOfPlaylist: data });
            });
    }
    /**
     * check if a user removed or added a video from a playlist
     */
    handleInputChange = (event) => {
        const target = event.target;
        const id_playlist = target.id;
        const index = this.state.listOfPlaylist.findIndex((playlist) => {
            return (playlist.id_playlist == id_playlist);
        });
        const listOfPlaylist = this.state.listOfPlaylist;
        listOfPlaylist[index].checked = target.checked;
        if (target.checked) {
            insertVideoInPlaylist(this.props.video, id_playlist, (err, data) => {
                console.log(data);
            })
        }
        else {
            removeVideoOfPlaylist(this.props.video.id, id_playlist, (err, data) => {
                console.log(data);
            })
        }
        this.setState({
            listOfPlaylist: listOfPlaylist
        });
    }

    render() {
        return (
            <div>
                {this.state.listOfPlaylist.map(playlist =>
                    <div>
                        <input
                            id={playlist.id_playlist}
                            name={playlist.name}
                            type="checkbox"
                            checked={playlist.checked}
                            onChange={this.handleInputChange} />
                        <label htmlFor="playlist-video-name">{playlist.name}</label>
                    </div>
                )}
                <input id="create-playlist-image" type="image" src={require("../../Images/add-button.svg")} onClick={() => this.state.createPlaylist ? this.setState({ createPlaylist: false }) : this.setState({ createPlaylist: true })} />
                {this.state.createPlaylist && <CreatePlaylist listOfPlaylist={this.props.listOfPlaylist} video={this.props.selectedVideos} />}
            </div>
        );
    }
}




export default connect(mapStateToProps)(Playlist);
