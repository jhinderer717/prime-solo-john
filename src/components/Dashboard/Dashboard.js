import './Dashboard.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ComboGraph from '../Graphs/ComboGraph';


const Dashboard = (mapStoreToProps) => { // this.props becomes mapStoreToProps
  
  useEffect(() => {
    console.log('mounted');
    mapStoreToProps.dispatch({
      type: 'GET_ROUNDS'
    });
    // mapStoreToProps.dispatch({
    //   type: 'GET_SEASON_ROUNDS'
    // });
    // mapStoreToProps.dispatch({
    //   type: 'GET_ALL_ROUNDS'
    // });
  }, []);
  return(
    <div className="dashboardDiv">
      <h1>Dashboard</h1>
      <h2 id="welcome">Welcome, {mapStoreToProps.store.user.username}!</h2>
      {/* <p>Your ID is: {mapStoreToProps.store.user.id}</p> */}
      <p>Last 5 Rounds:</p>
      <br/>


      <ComboGraph />
      <LogOutButton className="log-in" />
    </div>
  )
}


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(Dashboard);