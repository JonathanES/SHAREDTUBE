import React from 'react';

import Search from '../components/search/search';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    registerDemand: state.user.registerDemand,
    connexionDemand: state.user.connexionDemand,
    username: state.user.username
});

const Menu = ({ dispatch, connexionDemand, registerDemand, username})  => (
    <div>
        <div className="header">
            <nav>
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        {connexionDemand && !registerDemand && <a onClick={(e) =>  dispatch({ type: 'USER_CONNEXION_DEMAND'})} id="connect" >Se connecter</a>}
                        {!registerDemand &&  !connexionDemand && <a onClick={(e) => dispatch({ type: 'USER_PLAYLIST_DEMAND'})} id="account">Playlists </a>}
                        {!registerDemand &&  !connexionDemand && <a onClick={(e) => dispatch({ type: 'USER_FRIEND_DEMAND'})} id="account">Friends </a>}
                        {!registerDemand &&  !connexionDemand && <a className="red" onClick={(e) => dispatch({ type: 'USER_LOGOUT'})} id="disconnect">{username} Se déconnecter</a>}
                        {registerDemand &&  !connexionDemand && <a className="red" onClick={(e) =>  dispatch({ type: 'USER_REGISTER_DEMAND'})} id="register">S'inscrire</a>}
                    </ul>
                </div>
            </nav>
            <img id="logo" src={require("../Images/looptube_logo.svg")} alt="logo" onClick={(e) => this.handleClick("logo", e)} />
            <div className="links">
                {registerDemand &&  !connexionDemand && <a onClick={(e) =>  dispatch({ type: 'USER_CONNEXION_DEMAND'})} id="connect" >Se connecter</a>}
                {!registerDemand &&  !connexionDemand && <a onClick={(e) => dispatch({ type: 'USER_PLAYLIST_DEMAND'})} id="account">Playlists </a>}
                {!registerDemand &&  !connexionDemand && <a onClick={(e) => dispatch({ type: 'USER_THUMBNAILS_DEMAND'})} id="account">Thumbnails </a>}
                {!registerDemand &&  !connexionDemand && <a onClick={(e) => dispatch({ type: 'USER_FRIEND_DEMAND'})} id="account">Friends </a>}
                {!registerDemand &&  !connexionDemand && <a className="red" onClick={(e) => dispatch({ type: 'USER_LOGOUT'})} id="disconnect"> Se déconnecter</a>}
                {!registerDemand &&  connexionDemand && <a className="red" onClick={(e) =>  dispatch({ type: 'USER_REGISTER_DEMAND'})} id="register">S'inscrire</a>}
            </div>
            {<Search id="search" />}
        </div>
    </div>
);

export default connect(mapStateToProps)(Menu);