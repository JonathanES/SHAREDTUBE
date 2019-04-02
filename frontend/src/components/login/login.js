import React, { Component } from 'react';
import '../../main.css';
import { login } from '../../socket/userSocket';
import { getUserPlaylist } from '../../socket/playlistSocket';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: '',
      email: '',
      password: '',
      id_user: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    this.props.dispatch({ type: 'USER_REGISTER_DEMAND'})
  }

  handleChange(event) {
    switch (event.target.id) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  }

  /*handlePlaylist(event, id_user){
    getUserPlaylist(id_user, (err, data) => {
      console.log(data);
      this.props.dispatch({ type: 'GET_PLAYLIST_USER', listOfPlaylist: data})
    });
    event.preventDefault();
  }*/

  async handleSubmit(event) {
    login(this.state.email, this.state.password, (err, data) => {
      console.log(data);
      this.props.dispatch({ type: 'USER_LOGIN', username: data.username, id_user: data.id_user});
     // this.handlePlaylist(event, data.id_user);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="window login">
          <div className="window-header">
            <h1 > Connexion </h1>
          </div>
          <div className="window-contain">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="form-field">
                <label htmlFor="email">Email :</label>
                  <input id="email" type="text" value={this.state.email} onChange={this.handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="password">Password :</label>
                  <input id="password" type="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <button className="btn uppercase" type="submit">Se connecter</button>
              </div>
              <p className="account-help">Vous n'avez pas encore de compte ? <a onClick={this.handleClick} className="underline red" >S'inscrire</a></p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;