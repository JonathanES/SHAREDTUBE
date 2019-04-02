import React from 'react';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
    listOfPlaylist: state.playlist.listOfPlaylist
});

const PlaylistPage = ({ dispatch, listOfPlaylist, searchedValue})  => (
    <div className="thumbnail-contain">
                <div className="search-container">
                    {listOfPlaylist.map(playlist =>
                        <a key={playlist.id} className="yt-thumbnail">
                            <p> {playlist.name}</p>
                        </a>
                    )}
                </div>
            </div>
);

export default connect(mapStateToProps)(PlaylistPage);