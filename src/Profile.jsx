import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  render() {
    console.log('this.props', this.props);
    let artist = {name: '', followers: {total: ''}, images :[{url: ''}]};
    artist = this.props.artist !== null ? this.props.artist : artist;

    return (
      <div className="profile">
        <img
          alt=""
          className="profile-img"
          src={artist.images[0].url}
        />
        <div className="profile-info">
          <div className="profile-name">{artist.name}</div>
          <div className="profile-followers">
            {artist.followers.total} followers
          </div>
          {/* <div className="profile-genres">
              {artist.genres}
          </div> */}
        </div>
      </div>
    )
  }
}

export default Profile;
