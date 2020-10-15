import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Line } from 'react-chartjs-2';


const Dashboard = (mapStoreToProps) => { // this.props becomes mapStoreToProps
  const [chartData, setChartData] = useState({});
  
  
  const chart = () => {

    const rounds = mapStoreToProps.store.roundReducer;
    console.log('rounds:', rounds);
    let roundScore = [];
    let roundDate =[];
    rounds.map(round => roundScore.push(round.score_to_par));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
    console.log('roundScore', roundScore);
    console.log('roundDate', roundDate);

    setChartData({
      labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      datasets: [
        {
          label: 'Contributions to Score',
          //data: [32, 45, 12, 76, 69],
          //data: [5, 4, 3, 1, 6],
          data: roundScore,
          backgroundColor: ["rgba(75, 192, 190, 6)"],
          borderWidth: 4
        }
      ]
    })
  }

  useEffect(() => {
    //console.log('mounted');
    mapStoreToProps.dispatch({
      type: 'GET_ROUNDS'
    });
    chart();
  }, []); // warning told me to remove --   , []);   -- caused error
  console.log('mapStoreToProps:', mapStoreToProps);
  return(
    <div>
      <h1>Dashboard</h1>
      <h2 id="welcome">Welcome, {mapStoreToProps.store.user.username}!</h2>
      <p>Your ID is: {mapStoreToProps.store.user.id}</p>
      <p>Last 5 Rounds waiting to be graphed:</p>
      {JSON.stringify(mapStoreToProps.store.roundReducer)}
      {/* {mapStoreToProps.store.roundReducer.map((round, i) =>
        <p key={i}>{round}</p>
      )} */}
      <br/>

      {/* {firstRound.id === undefined ?
        <p>firstRound.id is undefined</p>
        :
        <p>{firstRound.id}</p>
      } */}

      <div>
        <Line data={chartData} options={{
          responsive: true
        }} />
      </div>
      <LogOutButton className="log-in" />
    </div>
  )
}


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(Dashboard);
