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

// const today = new Date();
// const thisYear = today.getFullYear();
// //console.log('today from Breakdown:', today);
// //console.log('current year:', thisYear);
// const prevYear = (thisYear - 1);
// const dayBefore = prevYear.concat('-', '1', '-', '1');
// //console.log('dayBefore', dayBefore);


const today = Date();
const todayString = today.split(" ");
const prevYear = todayString[3] - 1;
const yearArray = [prevYear, '1']; // concat requires an array
//const todayState = yearArray[0].concat('-', yearArray[1], '-', '1');



const Breakdown = (mapStoreToProps) => {
  const [graphInterval, changeGraphInterval] = useState(5);
  console.log('yearArray:', yearArray);


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
      type: 'GET_SEASON_ROUNDS',
      //payload: thisYear,
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

      {graphInterval === 5 && <ComboGraph />}
      {graphInterval === 'season' && <ComboSeasonGraph />}
      {graphInterval === 'lifetime' && <ComboLifetimeGraph />}
      
      {graphInterval === 5 && <RecentScoreComp />}
      {graphInterval === 'season' && <SeasonComp />}
      {graphInterval === 'lifetime' && <LifetimeComp />}
        
    </div>
  )
}


export default connect(mapStoreToProps)(Breakdown);
