import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Line } from 'react-chartjs-2';


const Dashboard = (mapStoreToProps) => { // this.props becomes mapStoreToProps
  const [chartData, setScoreChartData] = useState({});
  const [puttChartData, setPuttChartData] = useState({});
  const [approachChartData, setApproachChartData] = useState({});
  const [fairwayChartData, setfairwayChartData] = useState({});
  const [roundScoreState, setRoundScore] = useState([]); // can't get this to work, line 37
  
  
  
  const scoreChart = () => {

    const rounds = mapStoreToProps.store.roundReducer;
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
          label: 'Score to Par',
          data: roundScore,
          //data: roundScoreState, // I can log this out and see an array of data, but it doesn't want to be graphed
          backgroundColor: ["rgba(200, 80, 0, 6)"],
          borderWidth: 4
        }
      ]
    })
  }

  const puttChart = () => {

    const rounds = mapStoreToProps.store.roundReducer;
    //console.log('rounds:', rounds);
    let putts = [];
    let roundDate =[];
    rounds.map(round => putts.push(round.putts / round.number_holes));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
    console.log('putts', putts);
    //console.log('roundDate', roundDate);
    
    //setRoundScore(roundScore);

    setPuttChartData({
      //labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      labels: roundDate,
      datasets: [
        {
          label: 'Putts per Hole by Round',
          data: putts,
          //data: roundScoreState, // I can log this out and see an array of data, but it doesn't want to be graphed
          backgroundColor: ["rgba(5, 5, 2000, 6)"],
          borderWidth: 4
        }
      ]
    })
  }

  const approachChart = () => {

    const rounds = mapStoreToProps.store.roundReducer;
    //console.log('rounds:', rounds);
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
          backgroundColor: ["rgba(200, 15, 200, 6)"],
          borderWidth: 4
        }
      ]
    })
  }

  const fairwayChart = () => {

    const rounds = mapStoreToProps.store.roundReducer;
    //console.log('rounds:', rounds);
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
          label: 'Score to Par',
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
    mapStoreToProps.dispatch({
      type: 'GET_ROUNDS'
    });
    scoreChart();
    puttChart();
    approachChart();
    fairwayChart();
  }, []); // warning told me to remove --   , []);   -- caused error
  //console.log('mapStoreToProps:', mapStoreToProps);
  //console.log('roundScoreState', roundScoreState);
  return(
    <div>
      <h1>Dashboard</h1>
      <h2 id="welcome">Welcome, {mapStoreToProps.store.user.username}!</h2>
      {/* <p>Your ID is: {mapStoreToProps.store.user.id}</p> */}
      <p>Last 5 Rounds:</p>
      {/* {JSON.stringify(mapStoreToProps.store.roundReducer)} */}
      {/* {mapStoreToProps.store.roundReducer.map((round, i) =>
        <p key={i}>{round}</p>
      )} */}
      <br/>

      {/* {firstRound.id === undefined ?
        <p>firstRound.id is undefined</p>
        :
        <p>{firstRound.id}</p>
      } */}

      {/* {roundScoreState.length === 0 ?
        <h2>No Data</h2>
        :
        <div>
          <Line data={chartData} options={{
            responsive: true
          }} />
        </div>
      } */}

      <div>
        <Line data={chartData} options={{
          responsive: true
        }} />
        <Line data={puttChartData} options={{
          responsive: true
        }} />
        <Line data={approachChartData} options={{
          responsive: true
        }} />
        <Line data={fairwayChartData} options={{
          responsive: true
        }} />
      </div>

      <LogOutButton className="log-in" />
    </div>
  )
}


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(Dashboard);
