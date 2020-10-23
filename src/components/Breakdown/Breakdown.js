import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import './Breakdown.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import RecentScoreComp from '../Graphs/RecentGraphs';
import SeasonComp from '../Graphs/SeasonGraphs';
import LifetimeComp from '../Graphs/LifetimeGraphs';
import { Button } from '@material-ui/core';
import golfIcon from '../golfIcon.jpg';


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
      <h1 className="breakdownHeader">Breakdown <img className="golfIcon" src={golfIcon}/></h1>
        <div className="buttons">
          {graphInterval === 5 ?
            <Button variant="contained" id="goldButton">Recent 5</Button>
            : <Button variant="contained" id="otherButton" onClick={() => initiate5Rounds()}>Recent 5</Button>}

          {graphInterval === 'season' ?
            <Button variant="contained" id="goldButton">Season</Button>
            :<Button variant="contained" id="otherButton" onClick={() => initiateSeason()}>Season</Button>}

          {graphInterval === 'lifetime' ?
            <Button variant="contained" id="goldButton">Lifetime</Button>
            :<Button variant="contained" id="otherButton" onClick={() => initiateLifetime()}>Lifetime</Button>}
        </div>
        
        <div className="graphsDiv">
          {graphInterval === 5 && <RecentScoreComp />}
          {graphInterval === 'season' && <SeasonComp />}
          {graphInterval === 'lifetime' && <LifetimeComp />}
        </div>
    </div>
  )
}


export default connect(mapStoreToProps)(Breakdown);
