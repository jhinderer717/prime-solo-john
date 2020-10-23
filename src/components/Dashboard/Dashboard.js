import './Dashboard.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ComboGraph from '../Graphs/ComboGraph';
import golfIcon from '../golfIcon.jpg';


const Dashboard = (mapStoreToProps) => { // this.props becomes mapStoreToProps


  useEffect(() => {
    console.log('mounted');
    mapStoreToProps.dispatch({
      type: 'GET_ROUNDS'
    });
    mapStoreToProps.dispatch({
      type: 'GET_SEASON_ROUNDS'
    });
    mapStoreToProps.dispatch({
      type: 'GET_ALL_ROUNDS'
    });
    timeFunction();
  }, []);
  return(
    <div className="dashboardDiv">
      <h1 className="dashboardHeader">Dashboard <img className="golfIcon" src={golfIcon}/></h1>
      <h2 className="dashboard" id="welcome">Welcome, {mapStoreToProps.store.user.username}!</h2>
      {/* <p>Your ID is: {mapStoreToProps.store.user.id}</p> */}

      <ComboGraph />
    </div>
  )
}


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(Dashboard);