import React, { Component } from 'react';
import { createPlaylist } from '../../socket/playlistSocket';
import { getUserPlaylist } from '../../socket/playlistSocket';


class CreatePlaylist extends Component {
    constructor(props) {
        super();
        this.state = {
            //list saying if a video is in the playlist or not
            listOfPlaylist: props.listOfPlaylist,
        }
        this.handleCreatePlaylist = this.handleCreatePlaylist.bind(this);
    }

    handleCreatePlaylist(event) {
        createPlaylist(event.name)
        /* getUserPlaylist(id_user, (err, data) => {
             console.log(data);
             this.props.dispatch({ type: 'GET_PLAYLIST_USER', listOfPlaylist: data})
           });*/
    }
    render() {
        return (
            <div>
                <div className="create-playlist login">
                    <div className="create-playlist-header">
                        <h1 > Connexion </h1>
                    </div>
                    <div className="create-playlist-contain">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-field">
                                    <label htmlFor="playlistName">Name:</label>
                                    <input id="playlistName" type="text" value={this.state.name} onChange={this.handleChange} />
                                </div>
                                <button className="btn uppercase" type="submit">Se connecter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}





export default CreatePlaylist;