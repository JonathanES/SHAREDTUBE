import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGroup, getUserGroups } from '../../../socket/chatroomSocket';

const mapStateToProps = state => ({
    id_user: state.user.id_user,
    listOfPlaylist: state.playlist.listOfPlaylist
});

class CreateChatroom extends Component {
    constructor(props) {
        super();
        this.state = {
            groupName: '',
            id_user: props.id_user
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            case "groupName":
                this.setState({ groupName: event.target.value });
                break;
            default:
                break;
        }
    }
    handleSubmit(event) {
        const that = this;
        createGroup(this.state.groupName, this.state.id_user, (err, data) => {
            getUserGroups(that.state.id_user, (err, data) => {
                console.log(data);
                that.props.dispatch({ type: 'GET_GROUPS_USER', listOfGroups: data })
              });
        });
        event.preventDefault();
    }
    render() {
        return (
            <div className="window login">
                <div className="window-header">
                    <h1 > Create group </h1>
                </div>
                <div className="window-contain">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="form-field">
                                <label htmlFor="groupName">Name:</label>
                                <input id="groupName" type="text" value={this.state.groupName} onChange={this.handleChange} />
                            </div>
                            <button className="btn uppercase" type="submit">CREATE GROUP</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CreateChatroom);
