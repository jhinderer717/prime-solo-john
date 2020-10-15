import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ComboGraph from '../ComboGraph/ComboGraph';


const Dashboard = (mapStoreToProps) => { // this.props becomes mapStoreToProps
  
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

      {/* {roundScoreState.length === 0 ?
        <h2>No Data</h2>
        :
        <div>
          <Line data={chartData} options={{
            responsive: true
          }} />
        </div>
      } */}

      <ComboGraph />
      <LogOutButton className="log-in" />
    </div>
  )
}


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(Dashboard);
