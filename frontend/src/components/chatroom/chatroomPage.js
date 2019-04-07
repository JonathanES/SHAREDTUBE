import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateGroup from './chatroomManagement/CreateChatroom';
import { getUserGroups } from '../../socket/chatroomSocket';
import { getListOfFriends, removeFriend } from '../../socket/userSocket';
import SelectedChatroom from './chatroomManagement/SelectedChatroom';
import AddFriend from './friends/AddFriend';

const mapStateToProps = state => ({
    id_user: state.user.id_user,
    listOfGroups: state.chatroom.listOfGroups,
    listOfFriends: state.user.listOfFriends
});

class ChatroomPage extends Component {
    constructor(props) {
        super();
        this.state = {
            //list saying if a video is in the playlist or not
            listOfGroups: props.listOfGroups,
            createGroup: false,
            id_user: props.id_user,
            chatroomIsSelected: false,
            listOfFriends: props.listOfFriends,
            addFriend: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    }

    /** when arriving on this component, retrieve the list of playlist
 *  and see if the video is part of it or not */
    async componentDidMount() {
        getUserGroups(this.state.id_user, (err, data) => {
            this.setState({ listOfGroups: data });
            this.props.dispatch({ type: 'GET_GROUPS_USER', listOfGroups: data })
        });

        getListOfFriends(this.state.id_user, (err, data) => {
            this.setState({ listOfFriends: data });
            this.props.dispatch({ type: 'USER_LIST_OF_FRIENDS', listOfFriends: data })
        });

    }
    componentDidUpdate() {
        const that = this;
        if (this.props.listOfGroups.length != this.state.listOfGroups.length)
            getUserGroups(this.state.id_user, (err, data) => {
                that.setState({ listOfGroups: data });
                that.props.dispatch({ type: 'GET_GROUPS_USER', listOfGroups: data })
            });
        if (this.props.listOfFriends.length != this.state.listOfFriends.length)
            getListOfFriends(this.state.id_user, (err, data) => {
                that.setState({ listOfFriends: data });
                that.props.dispatch({ type: 'USER_LIST_OF_FRIENDS', listOfFriends: data })
            });
    }

    handleRemoveFriend(id_friend){
        const that = this;
        removeFriend(this.state.id_user, id_friend, (err, data) => {
            getListOfFriends(this.state.id_user, (err, data) => {
                that.setState({listOfFriends: data});
                that.props.dispatch({ type: 'USER_LIST_OF_FRIENDS', listOfFriends: data })
            });
        });
    }
    /**
     * get the history of the chatroom
     * get the playlist of the chatroom
     * @param {} event 
     * @param {*} group 
     */
    handleClick(event, group) {
        this.setState({ chatroomIsSelected: true });
        this.props.dispatch({type: 'USER_SELECTED_GROUP', selectedGroup: group});
        /*getVideosPlaylist(id_playlist, (err, data) => {
            this.setState({ videosOfPlaylist: data });
            this.setState({ displayVideosOfPlaylist: true });
            //this.props.dispatch({ type: 'SET_PLAYLIST_VIDEOS', videosOfPlaylist: data });
        })*/
        event.preventDefault();
    }
    render() {
        return (
            <div>
                {!this.state.createGroup && !this.state.chatroomIsSelected && !this.state.addFriend &&
                    <div>
                        <div id="group-column">
                            <input id="create-group-image" type="image" src={require("../../Images/add-button.svg")} onClick={() => this.state.createGroup ? this.setState({ createGroup: false }) : this.setState({ createGroup: true })} />
                            <ul className="list-of-groups">
                                {this.state.listOfGroups.map(group =>
                                    <li onClick={(event) => this.handleClick(event, group)}>
                                        <a key={group.id_group} id={group.id_group} className="yt-thumbnail" href="#" >
                                            {group.name}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div id="friend-column">
                            <h1>List of friends</h1>
                            <input id="add-friend-image" type="image" src={require("../../Images/add-button.svg")} onClick={() => this.state.addFriend ? this.setState({ addFriend: false }) : this.setState({ addFriend: true })} />
                            <ul className="list-of-friends">
                                {this.state.listOfFriends.map(friend =>
                                    <li>
                                        <a key={friend.id_user} id={friend.id_user} className="yt-thumbnail" href="#" >
                                            {friend.username}
                                        </a>
                                        <input id="remove-friend-image" type="image" src={require("../../Images/exit.svg")} onClick={() => this.handleRemoveFriend(friend.id_user)} />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                }
                {this.state.createGroup && !this.state.chatroomIsSelected && !this.state.addFriend &&
                    <div>
                        <input id="exit-button" type="image" src={require("../../Images/exit.svg")} onClick={() => this.setState({ createGroup: false })} />
                        <CreateGroup />
                    </div>
                }
                {!this.state.createGroup && this.state.chatroomIsSelected && !this.state.addFriend &&
                    <div>
                        <input id="exit-button" type="image" src={require("../../Images/exit.svg")} onClick={() => this.setState({ chatroomIsSelected: false })} />
                        <SelectedChatroom />
                    </div>
                }
                {!this.state.createGroup && !this.state.chatroomIsSelected && this.state.addFriend &&
                    <div>
                        <input id="exit-button" type="image" src={require("../../Images/exit.svg")} onClick={() => this.setState({ addFriend: false })} />
                        <AddFriend />
                    </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(ChatroomPage);