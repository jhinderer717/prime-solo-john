import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import './Breakdown.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Line } from 'react-chartjs-2';
import ComboGraph from '../ComboGraph/ComboGraph';


const Breakdown = (mapStoreToProps) => {
  const [chartData, setScoreChartData] = useState({});
  const [puttChartData, setPuttChartData] = useState({});
  const [approachChartData, setApproachChartData] = useState({});
  const [fairwayChartData, setfairwayChartData] = useState({});
  const [graphInterval, changeGraphInterval] = useState(5);
  const [dateState, setDateState] = useState({}); // not in use

  

  const initiate5Rounds = () => {
    console.log('initiate5Rounds called');
    changeGraphInterval(5);
    //callAllGraphs();                                        // uncommenting this to update the graphs after changing the state
  }                                                           // graphInterval causes the graphInterval to be behind by 1 click.
  const initiateSeason = () => {                              // Maybe try extracting the condition where the data is set outside the graphs
    console.log('initiateSeason called');
    changeGraphInterval('season');
    //callAllGraphs();
  }
  const initiateLifetime = () => {
    console.log('initiateLifetime called');
    changeGraphInterval('lifetime');
    //callAllGraphs();
  }


  const callAllGraphs = () => {
    console.log('calling all graphs');
    scoreChart();
    puttChart();
    approachChart();
    fairwayChart();
  }

  console.log('graphInterval:', graphInterval);





  const scoreChart = () => {

    console.log('in Score graph, graphInterval', graphInterval);

    let rounds;
    if(graphInterval === 5){
      rounds = mapStoreToProps.store.roundReducer;
    }else if(graphInterval === 'season'){
      rounds = mapStoreToProps.store.seasonRoundReducer;
    }else{
      rounds = mapStoreToProps.store.allRoundReducer;
    }
    let roundScore = [];
    let roundDate =[];
    rounds.map(round => roundScore.push(round.score_to_par));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));

    setScoreChartData({
      labels: roundDate,
      datasets: [
        {
          label: 'Strokes Over Par (adjusted to 18 holes) by Round',
          data: roundScore,
          backgroundColor: ["rgba(77, 211, 90, 1.0)"],
          borderWidth: 4
        }
      ]
    })
  }

  const puttChart = () => {

    let rounds;
    if(graphInterval === 5){
      rounds = mapStoreToProps.store.roundReducer;
    }else if(graphInterval === 'season'){
      rounds = mapStoreToProps.store.seasonRoundReducer;
    }else{
      rounds = mapStoreToProps.store.allRoundReducer;
    }
    let putts = [];
    let roundDate =[];
    rounds.map(round => putts.push(round.putts / round.number_holes));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));

    setPuttChartData({
      labels: roundDate,
      datasets: [
        {
          label: 'Putts per Hole by Round',
          data: putts,
          backgroundColor: ["rgba(200, 80, 0, 6)"],
          borderWidth: 4
        }
      ]
    })
  }

  const approachChart = () => {

    let rounds;
    if(graphInterval === 5){
      rounds = mapStoreToProps.store.roundReducer;
    }else if(graphInterval === 'season'){
      rounds = mapStoreToProps.store.seasonRoundReducer;
    }else{
      rounds = mapStoreToProps.store.allRoundReducer;
    }
    let roundApproach = [];
    let roundDate =[];
    rounds.map(round => roundApproach.push(round.approach_shots / round.number_holes));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));

    setApproachChartData({
      labels: roundDate,
      datasets: [
        {
          label: 'Average Extra Approach Shots per Hole by Round',
          data: roundApproach,
          backgroundColor: ["rgba(20, 25, 199, 6)"],
          borderWidth: 4
        }
      ]
    })
  }

  const fairwayChart = () => {

    let rounds;
    if(graphInterval === 5){
      rounds = mapStoreToProps.store.roundReducer;
    }else if(graphInterval === 'season'){
      rounds = mapStoreToProps.store.seasonRoundReducer;
    }else{
      rounds = mapStoreToProps.store.allRoundReducer;
    }
    let roundFairway = [];
    let roundDate =[];
    rounds.map(round => roundFairway.push(round.fairways_hit / round.possible_fairways));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));

    setfairwayChartData({
      labels: roundDate,
      datasets: [
        {
          label: 'Fairway Hit % off the Tee by Round',
          data: roundFairway,
          backgroundColor: ["rgba(252, 181, 13, 6)"],
          borderWidth: 4
        }
      ]
    })
  }

  useEffect(() => {
    console.log('mounted');
    mapStoreToProps.dispatch({ // no need for 5 round dispatch, combo graph fills that up
      type: 'GET_SEASON_ROUNDS'
    });
    mapStoreToProps.dispatch({
      type: 'GET_ALL_ROUNDS'
    });
    initiate5Rounds();
    callAllGraphs();
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
      {/* <span>combo graph</span> */}
      {/* {JSON.stringify(this.props.store.roundReducer)} */}

      <div>
        <ComboGraph />
        <Line data={chartData} options={{
          responsive: true,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Strokes",
              }
            }]
          }
        }} />
        <Line data={puttChartData} options={{
          responsive: true,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Putts",
              }
            }]
          }
        }} />
        <Line data={approachChartData} options={{
          responsive: true,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Strokes",
              }
            }]
          }
        }} />
        <Line data={fairwayChartData} options={{
          responsive: true,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Fairway Hit Ratio",
              }
            }]
          }
        }} />
      </div>
    </div>
  )
}


export default connect(mapStoreToProps)(Breakdown);
