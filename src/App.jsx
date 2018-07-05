import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }


  search (){

    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    var access_token = 'BQBYI9IIUxcfzuj7dBEwYDosEgF1fRFZM1sttX9kaCBJhnPCXm91Ez3L8n4MFyWFsEoEf08Od2Dd7kIzWLQm-BqamTNiYdPYX34To7g5yxMv-kDKt7DKMzBMTc3kVbTSugoMNrL7r1nzV2tiSGFaWNxKNvJVkoGSE3Iiz6c&refresh_token=AQCzk3HdH4TLz3DmeZYT2IK_BnaC5uMU3I4--dRmwDrXnTsBr89PfT5a3iB3npCBkp5qWqj5S3tllHUpVTKvScq9fu_X6PdqEbwyVhPQpxDj_pJHuBldTIAr3RlzYfzA5s8';
    //var myHeaders = new Headers();

    var myOptions = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + access_token
     },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        console.log('artist', artist);
        this.setState({artist});

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=AU&`;
        fetch(FETCH_URL, {
          method: 'GET',
          headers:  {
            'Authorization': 'Bearer ' + access_token
         },
          mode: 'cors',
          cache: 'default'
        })
        .then(response => response.json())
        .then(json => {
          console.log('artist\'s top tracks', json);
          const { tracks } = json;
          this.setState({tracks});
        })
      });
    }


    // fetch(FETCH_URL, myOptions )
    //     .then(response => response.json())
    //     .then(json => {
    //       console.log('artist\'s top tracks', json);
    //     })
    //   });



  render(){
    return (
      <div className="App">
        <div className="App-title">Stephen's React Spotify App</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter' ){
                  this.search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
          <div>
            <Profile
              artist={this.state.artist}
            />
            <Gallery
              tracks = {this.state.tracks}
            />
          </div>
        : <div></div>
        }
      </div>
    )
  }
}

export default App;
