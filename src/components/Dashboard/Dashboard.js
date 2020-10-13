import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Dashboard extends Component {
  
  componentDidMount = () => {
    console.log('mounted');
    this.props.dispatch({
      type: 'GET_ROUNDS'
    });
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <h2 id="welcome">Welcome, {this.props.store.user.username}!</h2>
        <p>Your ID is: {this.props.store.user.id}</p>
        <p>Last 5 Rounds waiting to be graphed:</p>
        {JSON.stringify(this.props.store.roundReducer)}
        <br/>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(Dashboard);
