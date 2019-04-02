import React, { Component } from 'react';
import '../../main.css';
import { thumbnails } from '../../socket/videoSocket';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    registerDemand: state.user.registerDemand,
    connexionDemand: state.user.connexionDemand
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
        if (!this.props.registerDemand && !this.props.connexionDemand)
            thumbnails(this.state.value, (err, data) => {
                console.log(data);
                this.props.dispatch({ type: 'VIDEO_THUMBNAILS', thumbnails: data, searchedValue: this.state.value })
            });
        event.preventDefault();
    }

    render() {
        return (
            <form className="form-search" onSubmit={this.handleSubmit}>
                <input id="search-bar" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Rechercher une vidéo" />
                <button type="submit" id="search-button"></button>
            </form>
        );
    }
}
export default connect(mapStateToProps)(Search);