import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Line } from 'react-chartjs-2';


const Dashboard = (mapStoreToProps) => { // this.props becomes mapStoreToProps
  const [chartData, setScoreChartData] = useState({});
  const [roundScoreState, setRoundScore] = useState([]); // can't get this to work, line 37
  
  
  
  const scoreChart = () => {

    const rounds = mapStoreToProps.store.roundReducer;
    console.log('rounds:', rounds);
    let roundDate =[];
    let roundScore = [];
    let roundPutts = [];
    let roundApproach = [];
    let roundDriver = [];
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
    rounds.map(round => roundScore.push(round.score_to_par));
    rounds.map(round => roundPutts.push(round.putts));
    rounds.map(round => roundDriver.push(round.fairways_hit / round.possible_fairways + 15));
    rounds.map(round => roundApproach.push(round.approach_shots / round.number_holes + 30));
    console.log('roundScore', roundScore);
    console.log('roundPutts', roundPutts);
    console.log('roundApproach', roundApproach);
    console.log('roundDriver', roundDriver);
    //console.log('roundDate', roundDate);
    
    //setRoundScore(roundScore);

    setScoreChartData({
      //labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      labels: roundDate,
      datasets: [
        {
          label: 'Driver',
          data: roundDriver,
          //data: [2,3,4,0,6],
          //data: roundScoreState, // I can log this out and see an array of data, but it doesn't want to be graphed
          backgroundColor: ["rgba(252, 181, 13, 6)"],
          borderWidth: 4
        },
        {
          label: 'Approach',
          data: roundApproach,
          //data: [2,3,4,0,6],
          //data: roundScoreState, // I can log this out and see an array of data, but it doesn't want to be graphed
          backgroundColor: ["rgba(20, 25, 199, 6)"],
          borderWidth: 4
        },
        {
          label: 'Putts',
          data: roundPutts,
          //data: [2,3,4,0,6],
          //data: roundScoreState, // I can log this out and see an array of data, but it doesn't want to be graphed
          backgroundColor: ["rgba(200, 80, 0, 6)"],
          borderWidth: 4
        },
      ]
    })
  }


  useEffect(() => {
    console.log('mounted');
    mapStoreToProps.dispatch({
      type: 'GET_ROUNDS'
    });
    scoreChart();
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
          responsive: true,
          title: {
            display: true,
            text: "Combo Graph"
          },
          tooltips: {
            mode: 'index',
          },
          hover: {
            mode: 'index'
          },
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Date'
              }
            }],
            yAxes: [{
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: 'Handicap'
              }
            }]
          }
        }} />
      </div>

      <LogOutButton className="log-in" />
    </div>
  )
}


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(Dashboard);
