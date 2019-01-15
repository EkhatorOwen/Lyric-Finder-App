import React, { Component } from "react";
import axios from "axios";
import Spinner from "../../components/layout/Spinner";
import moment from "moment";
import { Link } from "react-router-dom";

class Lyrics extends Component {
  state = {
    track: {},
    Lyrics: {}
  };

  async componentDidMount() {
    //track.lyrics.get?track_id=15953433

    try {

      const lyrics = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      );
      const track = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      );
      this.setState({
        lyrics: lyrics.data.message.body.lyrics,
        track: track.data.message.body.track
      });
    }

    catch(e){
      console.log(e.message)
    }

   

   


    //console.log(track.data.message.body.track.track_name)


    //console.log(result.data.message.body.lyrics.lyrics_body)
  }

  render() {
    const { track, lyrics } = this.state;
    let day = moment(track.updated_time, "MM-DD-YYYY");
    console.log(day);
    // console.log(typeof track.updated_time);
    return (
      <React.Fragment>
        {lyrics && track ? (
          <React.Fragment>
            <Link to="/" className="btn btn-dark btn-sm mb-4">
              Go Back
            </Link>
            <div className="card">
              <h5 className="card-header">
                {track.track_name} by{" "}
                <span className="text-secondary">{track.artist_name}</span>
              </h5>
              <div className="card-body">
                <p className="card-text">{lyrics.lyrics_body}</p>
              </div>
            </div>
            <ul className="list-group mt-3">
              <li className="list-group-item">
                <strong>Album ID</strong>: {track.album_id}
              </li>
              <li className="list-group-item">
                <strong>Song Genre</strong>:{" "}
                {
                  track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                }
              </li>
              <li className="list-group-item">
                <strong>Explicit Words</strong>: {track.explicit ? "No" : "Yes"}
              </li>

              <li className="list-group-item">
                <strong>Release Date</strong>:{" "}
                {moment(track.updated_time).format("MM-DD-YYYY")}
              </li>
            </ul>
          </React.Fragment>
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}

export default Lyrics;
