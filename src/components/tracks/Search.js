import React, { Component } from 'react'
import axios from 'axios';
import { Consumer } from '../../context';

 class Search extends Component {

    state = {
        trackTitle : '',
    };

    findTrack = (dispatch, e) => {
        e.preventDefault();
        let a = process.env.REACT_APP_MM_KEY;
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=5&page=1&s_track_rating=desc&apikey=${a}`)
        .then(res => {
            // this.setState({track_list:res.data.message.body.track_list})
            // console.log(res.data);
            dispatch ({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list
            });

            this.setState({trackTitle: ''});
        })
        .catch(err => console.log(err));
    }
        
    


    onChange(e) {
        this.setState({trackTitle: e.target.value})
    };

  render() {
    return (
      <Consumer>
          {value => {
              const {dispatch} = value;
              return (
                <div className = "card card-body mb-4 p-4">
                    <h1 className="display-4 text-center">
                        <i className="fas fa-music"></i>
                        Search For A Song                            
                    </h1>
                    <p className = "lead text-center"> get the lyrics for any song</p>
                    <form onSubmit = {this.findTrack.bind(this, dispatch)}>
                        <div className="form-group">
                            <input 
                            type ="text"
                            className="form-control form-control-lg"
                            placeholder="Song Title"
                            name="trackTitle"
                            value={this.state.trackTitle}
                            
                            onChange={this.onChange.bind(this)}>
                            </input>
                        </div>
                        <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Get Lyrics</button>
                    </form>
                </div>
              );
          }}
      </Consumer>
    )
  }
}
//IMPORTANT SIDE NOTE: If you have multiple inputs, change name in input field for each and get it on the onChange event by [e.target.name]
export default Search;