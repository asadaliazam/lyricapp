import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const Context = React.createContext();

export class Provider extends Component {

    state = {
        track_list : [],
        heading: 'Top 10 Tracks'
    };

    componentDidMount() {

       let a = process.env.REACT_APP_MM_KEY;

        axios.get(`http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${a}`)
        .then(res => {
            this.setState({track_list:res.data.message.body.track_list})
            // console.log(this.state.track_list);
        })
        .catch(err => console.log(err));
    }

  render() {
    return (
      <Context.Provider value= {this.state}>
          {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;