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
  const [roundScoreState, setRoundScore] = useState([]); // Doesn't work

  const callAllGraphs = () => {
    scoreChart();
    puttChart();
    approachChart();
    fairwayChart();
  }

  const getRoundData = () => {
    mapStoreToProps.dispatch({
      type: 'GET_ROUNDS'
    });
    changeGraphInterval(5);
    console.log('graphInterval', graphInterval);
    callAllGraphs();
  }

  const getSeasonData = () => {
    mapStoreToProps.dispatch({
      type: 'GET_SEASON_ROUNDS'
    });
    changeGraphInterval('season');
    console.log('graphInterval', graphInterval);
    callAllGraphs();
  }

  const getLifetimeData = () => {
    mapStoreToProps.dispatch({
      type: 'GET_ALL_ROUNDS'
    });
    changeGraphInterval('lifetime');
    console.log('graphInterval', graphInterval);
    callAllGraphs();
  }


  const scoreChart = () => {

    console.log('graphInterval', graphInterval);

    let rounds;
    if(graphInterval === 5){
      console.log('interval is 5');
      rounds = mapStoreToProps.store.roundReducer;
    }else if(graphInterval === 'season'){
      console.log('interval is season');
      rounds = mapStoreToProps.store.seasonRoundReducer;
    }else{
      console.log('interval is lifetime');
      rounds = mapStoreToProps.store.allRoundReducer;
    }
    //const rounds = mapStoreToProps.store.roundReducer;
    console.log('rounds:', rounds);
    let roundScore = [];
    let roundDate =[];
    rounds.map(round => roundScore.push(round.score_to_par));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
    console.log('roundScore', roundScore);
    console.log('roundDate', roundDate);
    
    //setRoundScore(roundScore);

    setScoreChartData({
      //labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      labels: roundDate,
      datasets: [
        {
          label: 'Strokes Over Par (adjusted to 18 holes) by Round',
          data: roundScore,
          //data: roundScoreState, // I can log this out and see an array of data, but it doesn't want to be graphed
          backgroundColor: ["rgba(77, 211, 90, 1.0)"],
          borderWidth: 4
        }
      ]
    })
  }

  const puttChart = () => {

    let rounds;
    if(graphInterval === 5){
      console.log('interval is 5');
      rounds = mapStoreToProps.store.roundReducer;
    }else if(graphInterval === 'season'){
      console.log('interval is season');
      rounds = mapStoreToProps.store.seasonRoundReducer;
    }else{
      console.log('interval is lifetime');
      rounds = mapStoreToProps.store.allRoundReducer;
    }
    let putts = [];
    let roundDate =[];
    rounds.map(round => putts.push(round.putts / round.number_holes));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));

    setPuttChartData({
      //labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      labels: roundDate,
      datasets: [
        {
          label: 'Putts per Hole by Round',
          data: putts,
          //data: roundScoreState, // I can log this out and see an array of data, but it doesn't want to be graphed
          backgroundColor: ["rgba(200, 80, 0, 6)"],
          borderWidth: 4
        }
      ]
    })
  }

  const approachChart = () => {

    let rounds;
    if(graphInterval === 5){
      console.log('interval is 5');
      rounds = mapStoreToProps.store.roundReducer;
    }else if(graphInterval === 'season'){
      console.log('interval is season');
      rounds = mapStoreToProps.store.seasonRoundReducer;
    }else{
      console.log('interval is lifetime');
      rounds = mapStoreToProps.store.allRoundReducer;
    }
    let roundApproach = [];
    let roundDate =[];
    rounds.map(round => roundApproach.push(round.approach_shots / round.number_holes));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
    console.log('roundApproach', roundApproach);
    //console.log('roundDate', roundDate);
    
    //setRoundScore(roundScore);

    setApproachChartData({
      //labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      labels: roundDate,
      datasets: [
        {
          label: 'Average Extra Approach Shots per Hole by Round',
          data: roundApproach,
          //data: roundScoreState, // I can log this out and see an array of data, but it doesn't want to be graphed
          backgroundColor: ["rgba(20, 25, 199, 6)"],
          borderWidth: 4
        }
      ]
    })
  }

  const fairwayChart = () => {

    let rounds;
    if(graphInterval === 5){
      console.log('interval is 5');
      rounds = mapStoreToProps.store.roundReducer;
    }else if(graphInterval === 'season'){
      console.log('interval is season');
      rounds = mapStoreToProps.store.seasonRoundReducer;
    }else{
      console.log('interval is lifetime');
      rounds = mapStoreToProps.store.allRoundReducer;
    }
    let roundFairway = [];
    let roundDate =[];
    rounds.map(round => roundFairway.push(round.fairways_hit / round.possible_fairways));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
    console.log('roundApproach', roundFairway);
    //console.log('roundDate', roundDate);
    
    //setRoundScore(roundScore);

    setfairwayChartData({
      //labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      labels: roundDate,
      datasets: [
        {
          label: 'Fairway Hit % off the Tee by Round',
          data: roundFairway,
          //data: roundScoreState, // I can log this out and see an array of data, but it doesn't want to be graphed
          backgroundColor: ["rgba(252, 181, 13, 6)"],
          borderWidth: 4
        }
      ]
    })
  }

  useEffect(() => {
    console.log('mounted');
    // mapStoreToProps.dispatch({
    //   type: 'GET_ROUNDS'
    // });
    getRoundData();
    callAllGraphs();
    // scoreChart();
    // puttChart();
    // approachChart();
    // fairwayChart();
  }, []); // warning told me to remove --   , []);   -- caused error

  return(
    <div>
      <h1>Breakdown</h1>
      <section>
        <h3>Last 5 rounds</h3>
        <h4>Change Interval
          <p><button onClick={getRoundData}>Last 5 Rounds</button></p>
          <p><button onClick={getSeasonData}>Current Season</button></p>
          <p><button onClick={getLifetimeData}>Lifetime</button></p>
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
