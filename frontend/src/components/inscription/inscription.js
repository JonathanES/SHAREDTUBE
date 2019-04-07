import React, { Component } from 'react';
import '../../main.css';
import { inscription } from '../../socket/userSocket';
import { getUserPlaylist } from '../../socket/playlistSocket';


class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.dispatch({ type: 'USER_CONNEXION_DEMAND'})
  }
  handleChange(event) {
    switch (event.target.id) {
      case "username":
        this.setState({ username: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      case "password-confirmation":
        this.setState({ passwordConfirmation: event.target.value });
        break;
      default:
        break;
    }
  }

  handlePlaylist(event, id_user){
    getUserPlaylist(id_user, (err, data) => {
      console.log(data);
      this.props.dispatch({ type: 'GET_PLAYLIST_USER', listOfPlaylist: data})
    });
    event.preventDefault();
  }

  handleSubmit(event) {
    inscription(this.state.username, this.state.email, this.state.password, (err, data) => {
      console.log(data);
      this.props.dispatch({ type: 'USER_LOGIN', username: data.username, id_user: data.id_user});
      this.handlePlaylist(event, data.id_user);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="window login">
          <div className="window-header">
            <h1 className="uppercase"> Inscription </h1>
          </div>
          <div className="window-contain">
            <div className="form-group">
              <form onSubmit={this.handleSubmit}>
                <div className="form-field">
                  <label htmlFor="email">Email :</label>
                  <input id="email" type="text" value={this.state.email} onChange={this.handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="username">username :</label>
                  <input id="username" type="text" value={this.state.username} onChange={this.handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="password">Password :</label>
                  <input id="password" type="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="password-confirmation">Confirmation :</label>
                  <input id="password-confirmation" type="password" value={this.state.passwordConfirmation} onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn uppercase">S'inscrire</button>
              </form>
            </div>
            <p className="account-help">Vous avez déjà un compte ? <a onClick={this.handleClick} className="underline red" >Se connecter</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Inscription;