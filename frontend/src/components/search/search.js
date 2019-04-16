import React, { Component } from 'react';
import '../../main.css';
import { thumbnails } from '../../socket/videoSocket';
import { connect } from 'react-redux';
import { checkVideoPlaylist } from '../../socket/playlistSocket';


const mapStateToProps = state => ({
    registerDemand: state.user.registerDemand,
    connexionDemand: state.user.connexionDemand,
    selectedPlaylist: state.playlist.selectedPlaylist
});

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            search: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        const that = this;
        if (!this.props.registerDemand && !this.props.connexionDemand)
            thumbnails(this.state.value, async (err, data) => {
                console.log(data);
                if (that.props.selectedPlaylist.length > 0) {
                    const selectedPlaylist = JSON.parse(that.props.selectedPlaylist);
                    if (typeof selectedPlaylist.id_playlist !== "undefined")
                        for (let index = 0; index < data.length; index++) {
                            data[index].exists = await checkVideoPlaylist(data[index].id, that.props.selectedPlaylist.id_playlist);
                        }
                }
                that.props.dispatch({ type: 'VIDEO_THUMBNAILS', thumbnails: data, searchedValue: this.state.value })
            });
        event.preventDefault();
    }

    render() {
        return (
            <form className="form-search" onSubmit={this.handleSubmit}>
                <input className="search-bar" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Rechercher une vidéo" />
                <button type="submit" className="search-button"></button>
            </form>
        );
    }
}
export default connect(mapStateToProps)(Search);