import React, { Component } from "react";
import axios from "axios";

class Lyrics extends Component {
  state = {
    track: {},
    Lyrics: {}
  };

  async componentDidMount() {
    //track.lyrics.get?track_id=15953433

    const lyrics = await axios.get(
      `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
        this.props.match.params.id
      }&apikey=${process.env.REACT_APP_MM_KEY}`
    );

    const track = await axios.get(
      `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
        this.props.match.params.id
      }&apikey=${process.env.REACT_APP_MM_KEY}`
    );

    //console.log(track.data.message.body.track.track_name)

    this.setState({
      lyrics: lyrics.data.message.body.lyrics.lyrics_body,
      track: track.data.message.body.track.track_name
    });

    //console.log(result.data.message.body.lyrics.lyrics_body)
  }

  render() {
    return (
      <div>
        <h1>Lyrics</h1>
      </div>
    );
  }
}

export default Lyrics;
