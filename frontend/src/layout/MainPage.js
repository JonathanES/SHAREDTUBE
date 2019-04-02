import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/login/login';
import CreateAccount from '../components/createAccount/createAccount';
import Menu from './Menu';
import Thumbnails from '../components/thumbnails/thumbnails';
import Video from '../components/videos/videos';

const mapStateToProps = state => ({
    username: state.user.username,
    id_user: state.user.id_user,
    registerDemand: state.user.registerDemand,
    connexionDemand: state.user.connexionDemand,
    videoIsSelected: state.video.videoIsSelected
});

const MainPage = ({ dispatch, connexionDemand, registerDemand, id_user, videoIsSelected }) => (
    <div id="wrapper">
        <Menu />
        {registerDemand && !connexionDemand && <CreateAccount dispatch={dispatch} />}
        {connexionDemand && !registerDemand && <Login dispatch={dispatch} />}
        {!registerDemand && !connexionDemand && 
             <Thumbnails />
        }
        {!registerDemand && !connexionDemand && videoIsSelected && 
            <Video dispatch={dispatch}/>
        }
    </div>
);

export default connect(mapStateToProps)(MainPage);
