import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import './Breakdown.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import RecentScoreComp from '../Graphs/RecentGraphs';
import SeasonComp from '../Graphs/SeasonGraphs';
import LifetimeComp from '../Graphs/LifetimeGraphs';
import { Button } from '@material-ui/core';


const today = Date();
const todayString = today.split(" ");
const prevYear = Number(todayString[3]) - 1;
const prevYearString = prevYear.toString();
const yearArray = [prevYearString, '12', '31']; // concat requires an array
const lastNewYear = yearArray[0].concat('-', yearArray[1], '-', yearArray[2]);



const Breakdown = (mapStoreToProps) => {
  const [graphInterval, changeGraphInterval] = useState(5);


  const initiate5Rounds = () => {
    changeGraphInterval(5);
  }
  const initiateSeason = () => {          
    changeGraphInterval('season');
  }
  const initiateLifetime = () => {
    changeGraphInterval('lifetime');
  }


  console.log('graphInterval:', graphInterval);


  useEffect(() => {
    console.log('mounted');
    mapStoreToProps.dispatch({ // no need for 5 round dispatch, combo graph fills that up
      type: 'GET_ROUNDS',
    });
    mapStoreToProps.dispatch({ // no need for 5 round dispatch, combo graph fills that up
      type: 'GET_SEASON_ROUNDS',
      payload: lastNewYear,
    });
    mapStoreToProps.dispatch({
      type: 'GET_ALL_ROUNDS'
    });
  }, []); // warning told me to remove --   , []);   -- caused error

  return(
    <div>
      <h1>Breakdown</h1>
      <section>
        {/* {graphInterval === 5 && <h3>Last 5 Breakdown</h3>}
        {graphInterval === 'season' && <h3>Current Season Breakdown</h3>}
        {graphInterval === 'lifetime' && <h3>Lifetime Breakdown</h3>}
        <br/> */}
        

        <h4>Change Interval
          {graphInterval === 5 ?
            <Button variant="contained" id="goldButton">Last 5 Rounds</Button>
            :
            <Button variant="contained" onClick={() => initiate5Rounds()}>Last 5 Rounds</Button>}


          {graphInterval === 'season' ?
            <Button variant="contained" id="goldButton">Current Season</Button>
            :
            <Button variant="contained" onClick={() => initiateSeason()}>Current Season</Button>}


          {graphInterval === 'lifetime' ?
            <Button variant="contained" id="goldButton">Lifetime</Button>
            :
            <Button variant="contained" onClick={() => initiateLifetime()}>Lifetime</Button>}

          {/* <button onClick={() => initiateSeason()}>Current Season</button>
          <button onClick={() => initiateLifetime()}>Lifetime</button> */}
        </h4>
      </section>
      
      {graphInterval === 5 && <RecentScoreComp />}
      {graphInterval === 'season' && <SeasonComp />}
      {graphInterval === 'lifetime' && <LifetimeComp />}
        
    </div>
  )
}


export default connect(mapStoreToProps)(Breakdown);
