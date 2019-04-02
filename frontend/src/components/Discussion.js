import React from 'react';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
   thumbnails: state.video.thumbnails,
   searchedValue: state.video.searchedValue
});

const Discussion = ({ dispatch, thumbnails, searchedValue})  => (
    <div className="discussion-contain">
            <h3 className="center result-search">Résultat de votre recherche "<span className="red">{searchedValue}</span>"</h3>
                <div className="search-container">
                    {thumbnails.map(thumbnail =>
                        <a key={thumbnail.id} className="yt-thumbnail">
                            <img id={thumbnail.id} src={thumbnail.url} alt={thumbnail.id} onClick={() => this.handleClick(thumbnail)} />
                            <p> {thumbnail.titles}</p>
                        </a>
                    )}

                </div>
            </div>
);

export default connect(mapStateToProps)(Discussion);