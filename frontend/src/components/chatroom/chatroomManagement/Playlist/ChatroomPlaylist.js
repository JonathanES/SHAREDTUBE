import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from '../../../videos/video';
import CreatePlaylistChatroom from './CreatePlaylistInChatroom';
import ChatroomPlaylistAddVideo from './ChatroomPlaylistAddVideo';
import { getVideosPlaylist, getGroupPlaylist} from '../../../../socket/playlistSocket';

const mapStateToProps = state => ({
    groupPlaylists: state.playlist.groupPlaylists,
    id_user: state.user.id_user,
    selectedGroup: state.chatroom.selectedGroup,
    selectedPlaylist: state.playlist.selectedPlaylist
});


class ChatroomPlaylist extends Component {
    constructor(props) {
        super();
        this.state = {
            //list saying if a video is in the playlist or not
            groupPlaylists: props.groupPlaylists,
            videosOfPlaylist: [],
            indexOfPlaylist: 0,
            id_user: props.id_user,
            selectedGroup: props.selectedGroup,
            createPlaylistGroup: false,
            selectedPlaylist: props.groupPlaylists[0] !== null ? '' : props.groupPlaylists[0],
            addVideo: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (typeof this.state.selectedPlaylist !== typeof this.props.groupPlaylists[0] && this.props.groupPlaylists.length > 0) {
            this.setState({ selectedPlaylist: this.props.groupPlaylists[0] })
            this.props.dispatch({ type: 'SET_SELECTED_PLAYLIST', selectedPlaylist: this.props.groupPlaylists[0] });
            getVideosPlaylist(this.props.groupPlaylists[0].id_playlist, (err, data) => {
                this.setState({ videosOfPlaylist: data });
                this.setState({ displayVideosOfPlaylist: true });
            })
        }
        if (prevProps.groupPlaylists.length !== this.props.groupPlaylists.length) {
            getGroupPlaylist(this.state.selectedGroup.id_group, (err, data) => {
                this.setState({ groupPlaylists: data });
                this.props.dispatch({ type: 'GET_PLAYLIST_GROUP', groupPlaylists: data });
            })
        }
    }
    componentDidMount() {
        getGroupPlaylist(this.state.selectedGroup.id_group, (err, data) => {
            this.setState({ groupPlaylists: data });
            this.props.dispatch({ type: 'GET_PLAYLIST_GROUP', groupPlaylists: data });
        })
    }

    handleChange(event) {
        const that = this;
        this.setState({ selectedPlaylist: event.target.value });
        this.props.dispatch({ type: 'SET_SELECTED_PLAYLIST', selectedPlaylist: event.target.value });
        getVideosPlaylist(this.state.selectedPlaylist.id_playlist, (err, data) => {
            that.setState({ videosOfPlaylist: data });
            that.setState({ displayVideosOfPlaylist: true });
        })
    }

    handleClick(event, id_playlist) {
        console.log(id_playlist);
        getVideosPlaylist(id_playlist, (err, data) => {
            this.setState({ videosOfPlaylist: data });
            this.props.dispatch({ type: 'SET_VIDEOS_OF_PLAYLIST', videosOfPlaylist: data });
        })
        event.preventDefault();
    }
    render() {
        return (
            <div id="chatroom-video">
                <input id="chatroom-discussion-add-user" type="image" src={require("../../../../Images/add-button.svg")} onClick={() => this.state.addVideo ? this.setState({ addVideo: false }) : this.setState({ addVideo: true })} />
                {!this.state.addVideo && <Video videosOfPlaylist={this.state.videosOfPlaylist} />}
                {this.state.addVideo && <ChatroomPlaylistAddVideo />}
                <div id="chatroom-playlist">
                    <select value={this.state.selectedPlaylist} onChange={this.handleChange}>
                    <option>Select playlist</option>
                        {this.state.groupPlaylists.map(playlist =>
                            <option id={playlist.id_playlist} value={playlist.name}>{playlist.name}
                            </option>
                        )}
                    </select>
                    {
                        (this.state.groupPlaylists[0] !== null) ? '' : this.state.groupPlaylists[0].name
                    }
                    <input id="chatroom-discussion-choice-playlist" type="image" src={require("../../../../Images/playlist.svg")} onClick={() => this.state.createPlaylistGroup ? this.setState({ createPlaylistGroup: false }) : this.setState({ createPlaylistGroup: true })} />
                </div>
                {this.state.createPlaylistGroup &&
                    <CreatePlaylistChatroom />
                }
            </div>
        );
    }
}
export default connect(mapStateToProps)(ChatroomPlaylist);
