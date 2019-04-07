import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVideosPlaylist } from '../../../socket/playlistSocket';
import { getUserGroups, addUserGroup, sendMessage, getMessage } from '../../../socket/chatroomSocket';
import Video from '../../videos/video';
import Chat from './Chat';


const mapStateToProps = state => ({
    username: state.user.username,
    id_user: state.user.id_user,
    listOfGroups: state.chatroom.listOfGroups,
    listOfFriends: state.user.listOfFriends,
    selectedGroup: state.chatroom.selectedGroup
});

class SelectedChatroom extends Component {
    constructor(props) {
        super();
        this.state = {
            //list saying if a video is in the playlist or not
            listOfGroups: props.listOfGroups,
            createGroup: false,
            id_user: props.id_user,
            username: props.username,
            videosOfPlaylist: [{ id_video: '' }],
            addFriend: false,
            listOfFriends: props.listOfFriends,
            selectedGroup: props.selectedGroup,
            message: '',
            chatHistory: [{ username: '', message: '' }]
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }
    handleSubmit(event) {
        const that = this;
        sendMessage(this.state.selectedGroup.id_group, this.state.id_user, this.state.username, this.state.message, (err, data) => {
            this.setState({ chatHistory: data });
        })
        event.preventDefault();
    }

    /** when arriving on this component, retrieve the list of playlist
 *  and see if the video is part of it or not */
    async componentDidMount() {
        getUserGroups(this.state.id_user, (err, data) => {
            this.setState({ listOfGroups: data });
            this.props.dispatch({ type: 'GET_GROUPS_USER', listOfGroups: data })
        });
    }
    componentDidUpdate() {
        if (this.props.listOfGroups.length != this.state.listOfGroups.length)
            getUserGroups(this.state.id_user, (err, data) => {
                this.setState({ listOfGroups: data });
                this.props.dispatch({ type: 'GET_GROUPS_USER', listOfGroups: data })
            });
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

    handleAddFriend(event) {
        const that = this;
        const id_friend = event.target.id;

        addUserGroup(id_friend, this.state.selectedGroup.id_group, (err, data) => {
            const listOfFriends = that.state.listOfFriends;
            const index = listOfFriends.findIndex(x => x.id_user == id_friend);
            if (index !== -1)
                listOfFriends.splice(index, 1);
            that.setState({ listOfFriends: listOfFriends });
        });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div id="chatroom-video">
                    <Video videosOfPlaylist={this.state.videosOfPlaylist} />
                    <div id="chatroom-playlist">
                        <input id="chatroom-discussion-choice-playlist" type="image" src={require("../../../Images/playlist.svg")} onClick={() => this.state.displayPlaylist ? this.setState({ displayPlaylist: false }) : this.setState({ displayPlaylist: true })} />
                    </div>
                </div>
                <Chat />

            </div>
        );
    }
}

export default connect(mapStateToProps)(SelectedChatroom);