import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertVideoInPlaylist, removeVideoOfPlaylist, getUserPlaylistVideo } from '../../../../socket/playlistSocket';
import Search from '../../../search/search';

const mapStateToProps = state => ({
    selectedVideos: state.video.selectedVideo,
    id_user: state.user.id_user,
    listOfPlaylist: state.playlist.listOfPlaylist,
    thumbnails: state.video.thumbnails,
    selectedPlaylist: state.playlist.selectedPlaylist
});

class ChatroomPlaylistAddVideo extends Component {
    constructor(props) {
        super();
        this.state = {
            //list saying if a video is in the playlist or not
            listOfPlaylist: [],
            thumbnails: [],
            createPlaylist: false,
            id_video: props.selectedVideos.id,
        }
        this.handleClick = this.handleClick.bind(this);
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
        if (!this.checkIfArrayEquals(this.state.thumbnails, this.props.thumbnails))
            this.setState({ thumbnails: this.props.thumbnails })
    }

    checkIfArrayEquals(array1, array2) {
        if (array1.length !== array2.length)
            return false;
        for (let i = 0; i < array1.length; i++) {
            if (array1[i].exists !== array2[i].exists)
                return false
        }
        return true;
    }
    /**
     * check if a user removed or added a video from a playlist
     */
    handleClick(video) {
        const that = this;
        const selectedPlaylist = JSON.parse(this.props.selectedPlaylist);
        if (!video.exists) {
            insertVideoInPlaylist(video, selectedPlaylist.id_playlist, async (err, data) => {
                console.log(data);
                const thumbnail = this.state.thumbnails;
                const index = thumbnail.findIndex(video => video.id == data.id_video);
                thumbnail[index].exists = true;
                this.setState({thumbnails: thumbnail});
                that.props.dispatch({ type: 'VIDEO_THUMBNAILS', thumbnails: thumbnail, searchedValue: '' })
            })
        }
        else {
            removeVideoOfPlaylist(video.id, this.props.selectedPlaylist.id_playlist, async (err, data) => {
                console.log(data);
                const thumbnail = this.state.thumbnails;
                const index = thumbnail.findIndex(video => video.id == data.id_video);
                thumbnail[index].exists = false;
                this.setState({thumbnails: thumbnail});
                that.props.dispatch({ type: 'VIDEO_THUMBNAILS', thumbnails: thumbnail, searchedValue: '' })
            })
        }
    }

    render() {
        return (
            <div>
                <Search />
                <div className="thumbnail-contain">
                    <div className="search-container">
                        {this.state.thumbnails.map(video =>
                            <a key={video.id} className="yt-thumbnail">
                                {!video.exists && <input id="chatroom-playlist-add-video" type="image" src={require("../../../../Images/add-button.svg")} onClick={() => this.handleClick(video)} />
                                }
                                {video.exists && <input id="chatroom-playlist-remove-video" type="image" src={require("../../../../Images/exit.svg")} onClick={() => this.handleClick(video)} />
                                }
                                <img id={video.id} src={video.url} alt={video.id} onClick={() => this.props.dispatch({ type: 'VIDEO_SELECTED', video })} />
                                <p> {video.titles}</p>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}




export default connect(mapStateToProps)(ChatroomPlaylistAddVideo);
