import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGroupPlaylist,getGroupPlaylist } from '../../../../socket/playlistSocket';

const mapStateToProps = state => ({
    id_user: state.user.id_user,
    listOfPlaylist: state.playlist.listOfPlaylist,
    selectedGroup: state.chatroom.selectedGroup
});

class CreatePlaylistChatroom extends Component {
    constructor(props) {
        super();
        this.state = {
            playlistName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
          case "playlistName":
            this.setState({ playlistName: event.target.value });
            break;
          default:
            break;
        }
      }
      handleSubmit(event) {
        const prop = this.props;
        const that = this;
        createGroupPlaylist(this.state.playlistName, prop.id_user, prop.selectedGroup.id_group, (err, data) => {
            getGroupPlaylist(prop.selectedGroup.id_group, (err, data) => {
                this.setState({groupPlaylists: data});
                this.props.dispatch({ type: 'GET_PLAYLIST_GROUP', groupPlaylists: data });
            })
        });
        event.preventDefault();
    }
    render() {
        return (
            <div className="create-playlist login">
                <div className="create-playlist-contain">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group-create">
                            <div className="form-field-create">
                                <label htmlFor="playlistName">Name:</label>
                                <input id="playlistName" type="text" value={this.state.name} onChange={this.handleChange} />
                            </div>
                            <button className="btn-create" type="submit">CREATE</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CreatePlaylistChatroom);
