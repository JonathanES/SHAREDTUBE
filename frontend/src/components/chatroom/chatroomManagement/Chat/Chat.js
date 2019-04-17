import React from "react";
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addUserGroup, sendMessage, getMessage } from '../../../../socket/chatroomSocket';
import {getListOfFriendsNotInGroup} from '../../../../socket/userSocket';

const mapStateToProps = state => ({
    username: state.user.username,
    id_user: state.user.id_user,
    listOfGroups: state.chatroom.listOfGroups,
    selectedGroup: state.chatroom.selectedGroup
});

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id_user: props.id_user,
            username: props.username,
            listOfFriends: [],
            selectedGroup: props.selectedGroup,
            message: '',
            chatHistory: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.socket = io('http://localhost:8080');

        this.socket.on('SEND_MESSAGE', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({ chatHistory: data });
        }
    }

    componentWillMount() {
        getMessage(this.state.selectedGroup.id_group, (err, data) => {
            this.setState({ chatHistory: data });
        })
        getListOfFriendsNotInGroup(this.state.selectedGroup.id_group, this.state.id_user, (err, data) => {
            this.setState({listOfFriends: data});
        })
    }


    handleChange(event) {
        this.setState({ message: event.target.value });
    }
    handleSubmit(event) {
        const that = this;
        sendMessage(this.state.selectedGroup.id_group, this.state.username, this.state.message, (err, data) => {
            this.setState({ chatHistory: data });
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
            <div id="chatroom-discussion">
                <input id="chatroom-discussion-add-user" type="image" src={require("../../../../Images/add-button.svg")} onClick={() => this.state.addFriend ? this.setState({ addFriend: false }) : this.setState({ addFriend: true })} />
                {this.state.chatHistory.map(chat =>
                    <li>
                        {chat.username}: {chat.message}
                    </li>
                )}
                {this.state.addFriend &&
                    <ul className="list-of-friends">
                        <input id="exit-button" type="image" src={require("../../../../Images/exit.svg")} onClick={() => this.setState({ addFriend: false })} />
                        {this.state.listOfFriends.map(friend =>
                            <li>
                                <a key={friend.id_user} id={friend.id_user} className="yt-thumbnail" href="#" onClick={(event) => this.handleAddFriend(event)}>
                                    {friend.username}
                                </a>
                            </li>
                        )}
                    </ul>
                }
                <form onSubmit={this.handleSubmit}>
                    <input id="chatroom-discussion-input" type="text" value={this.state.message} onChange={this.handleChange} />
                    <button id="chatroom-discussion-button" type="submit">SEND</button>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Chat);