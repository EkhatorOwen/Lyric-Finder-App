import React, { Component } from 'react'
import axios from 'axios'

class Lyrics extends Component {
  state={
    track: {},
    Lyrics: {}
  }

 async componentDidMount(){
   //track.lyrics.get?track_id=15953433
  const result = await axios.get(
    `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params}&apikey=${
      process.env.REACT_APP_MM_KEY
    }`
  );

  console.log(result.data)
  }

  render() {
    return (
      <div>
        <h1>Lyrics</h1>
      </div>
    )
  }
}


export default Lyrics