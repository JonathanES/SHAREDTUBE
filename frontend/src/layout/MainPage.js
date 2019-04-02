import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/login/login';
import CreateAccount from '../components/createAccount/createAccount';
import Menu from './Menu';
import Thumbnails from '../components/thumbnails/thumbnails';
import Video from '../components/videos/videos';
import PlaylistPage from '../components/playlist/playlistPage';

const mapStateToProps = state => ({
    username: state.user.username,
    id_user: state.user.id_user,
    registerDemand: state.user.registerDemand,
    connexionDemand: state.user.connexionDemand,
    playlistDemand: state.user.playlistDemand,
    thumbnailsDemand: state.user.thumbnailsDemand,
    videoIsSelected: state.video.videoIsSelected
});

const MainPage = ({ dispatch, connexionDemand, registerDemand, id_user, videoIsSelected, playlistDemand, thumbnailsDemand }) => (
    <div id="wrapper">
        <Menu />
        {registerDemand && !connexionDemand && <CreateAccount dispatch={dispatch} />}
        {connexionDemand && !registerDemand && <Login dispatch={dispatch} />}
        {!registerDemand && !connexionDemand && !playlistDemand && thumbnailsDemand &&
             <Thumbnails />
        }
        {!registerDemand && !connexionDemand && videoIsSelected && !playlistDemand &&
            <Video dispatch={dispatch}/>
        }
        {!registerDemand && !connexionDemand && playlistDemand && !thumbnailsDemand &&
            <PlaylistPage/>
        }

    </div>
);

export default connect(mapStateToProps)(MainPage);
