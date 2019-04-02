import React from 'react';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
   thumbnails: state.video.thumbnails,
   searchedValue: state.video.searchedValue
});

const Thumbnails = ({ dispatch, thumbnails, searchedValue})  => (
    <div className="thumbnail-contain">
            <h3 className="center result-search">Résultat de votre recherche "<span className="red">{searchedValue}</span>"</h3>
                <div className="search-container">
                    {thumbnails.map(video =>
                        <a key={video.id} className="yt-thumbnail">
                            <img id={video.id} src={video.url} alt={video.id} onClick={() =>  dispatch({ type: 'VIDEO_SELECTED', video})} />
                            <p> {video.titles}</p>
                        </a>
                    )}
                </div>
            </div>
);

export default connect(mapStateToProps)(Thumbnails);