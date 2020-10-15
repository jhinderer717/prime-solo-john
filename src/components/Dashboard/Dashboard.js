import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Line } from 'react-chartjs-2';


const Dashboard = (mapStoreToProps) => { // this.props becomes mapStoreToProps
  const [chartData, setChartData] = useState({});
  
  const rounds = mapStoreToProps.store.roundReducer; // rounds is now an array of object with the round data [ {...}, {...},... ]
  console.log('rounds:', rounds);
  const roundData = [];
  rounds.map(round => roundData.push(round.id))
  console.log('roundData', roundData);
  // const secondRound = rounds[1]; // firstRound is the first object of rounds {id: 5, user_id: 1, date: ... }
  // console.log('secondRound', secondRound);
  
  const chart = () => {
    setChartData({
      labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      datasets: [
        {
          label: 'level of thiccness',
          //data: [32, 45, 12, 76, 69],
          data: [5, 4, 3, 1, 6],
          //data: roundData,
          //data: mapStoreToProps.store.roundReducer.map((round) => round.score_to_par),
          backgroundColor: [
            'rgba(75, 192, 190, 6'
          ],
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
