import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListOfFriends, addFriend, searchUser } from '../../../../socket/userSocket';
import '../../../../main.css'


const mapStateToProps = state => ({
    id_user: state.user.id_user,
});

class AddFriend extends Component {
    constructor(props) {
        super();
        this.state = {
            id_user: props.id_user,
            id_friend: '',
            listOfUsers: [],
            searchedUser: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({ searchedUser: event.target.value });
    }
    handleSubmit(event) {
        const that = this;
        searchUser(this.state.id_user, this.state.searchedUser, (err, data) => {
            this.setState({ listOfUsers: data });
        })
        event.preventDefault();
    }
    handleClick(event) {
        const that = this;
        const id_friend = event.target.id;
        const listOfUsers = this.state.listOfUsers;
        const index = listOfUsers.findIndex(x => x.id_user == id_friend);
        if (index !== -1)
                listOfUsers.splice(index, 1);
        this.setState({listOfUsers: listOfUsers});
        addFriend(this.state.id_user, id_friend, (err, data) => {
            getListOfFriends(this.state.id_user, (err, data) => {
                this.setState({listOfFriends: data});
                that.props.dispatch({ type: 'USER_LIST_OF_FRIENDS', listOfFriends: data })
            });
        });
        event.preventDefault();
    }
    render() {
        return (
            <div >
                <form className="form-search" onSubmit={this.handleSubmit}>
                    <input className="search-bar" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search for a user" />
                    <button type="submit" className="search-button"></button>
                </form>
                <ul className="list-of-friends">
                    {this.state.listOfUsers.map(user =>
                        <li onClick={(event) => this.handleClick(event, user)}>
                            <a key={user.id_user} id={user.id_user} className="yt-thumbnail" href="#" >
                                {user.username}
                            </a>
                        </li>
                    )}
                </ul>
            </div>

        );
    }
}

export default connect(mapStateToProps)(AddFriend);
