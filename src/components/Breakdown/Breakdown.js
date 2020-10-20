import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import './Breakdown.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ComboGraph from '../Graphs/ComboGraph';
import ComboSeasonGraph from '../Graphs/ComboSeason';
import ComboLifetimeGraph from '../Graphs/ComboLifetime';
import RecentScoreComp from '../Graphs/RecentGraphs';
import SeasonComp from '../Graphs/SeasonGraphs';
import LifetimeComp from '../Graphs/LifetimeGraphs';


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
        <h3>Last 5 rounds</h3>
        <h4>Change Interval
          <p><button onClick={() => initiate5Rounds()}>Last 5 Rounds</button></p>
          <p><button onClick={() => initiateSeason()}>Current Season</button></p>
          <p><button onClick={() => initiateLifetime()}>Lifetime</button></p>
        </h4>
      </section>

      {/* {graphInterval === 5 && <ComboGraph />} */}
      {/* {graphInterval === 'season' && <ComboSeasonGraph />} */}
      {/* {graphInterval === 'lifetime' && <ComboLifetimeGraph />} */}
      
      {graphInterval === 5 && <RecentScoreComp />}
      {graphInterval === 'season' && <SeasonComp />}
      {graphInterval === 'lifetime' && <LifetimeComp />}
        
    </div>
  )
}


export default connect(mapStoreToProps)(Breakdown);
