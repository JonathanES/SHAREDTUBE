import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/login/login';
import Inscription from '../components/inscription/inscription';
import Menu from './Menu';
import Thumbnails from '../components/thumbnails/thumbnails';
import Video from '../components/videos/videosThumbnails';
import PlaylistPage from '../components/playlist/playlistPage';
import Chatroom from '../components/chatroom/chatroomPage';

const mapStateToProps = state => ({
    username: state.user.username,
    id_user: state.user.id_user,
    registerDemand: state.user.registerDemand,
    connexionDemand: state.user.connexionDemand,
    playlistDemand: state.user.playlistDemand,
    thumbnailsDemand: state.user.thumbnailsDemand,
    friendDemand: state.user.friendDemand,
    videoIsSelected: state.video.videoIsSelected
});

const MainPage = ({ dispatch, connexionDemand, registerDemand, id_user, videoIsSelected, playlistDemand, thumbnailsDemand, friendDemand }) => (
    <div id="wrapper">
        <Menu />
        {registerDemand && !connexionDemand && <Inscription dispatch={dispatch} />}
        {connexionDemand && !registerDemand && <Login dispatch={dispatch} />}
        {!registerDemand && !connexionDemand && !playlistDemand && thumbnailsDemand && !friendDemand &&
             <Thumbnails />
        }
        {!registerDemand && !connexionDemand && videoIsSelected && !playlistDemand && !friendDemand &&
            <Video dispatch={dispatch}/>
        }
        {!registerDemand && !connexionDemand && playlistDemand && !thumbnailsDemand && !friendDemand &&
            <PlaylistPage/>
        }
        {!registerDemand && !connexionDemand && !playlistDemand && !thumbnailsDemand && friendDemand &&
            <Chatroom/>
        }

    </div>
);

export default connect(mapStateToProps)(MainPage);
