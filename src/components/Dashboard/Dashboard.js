import React, { Component, useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Line} from 'react-chartjs-2';

// class Dashboard extends Component {

  
//   componentDidMount = () => {
//     console.log('mounted');
    // this.props.dispatch({
    //   type: 'GET_ROUNDS'
    // });
//   }

//   render() {
    // const [chartData, setChartData] = useState({});
    // const chart = () => {
    //   setChartData({
    //     labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    //     datasets: [
    //       {
    //         label: 'level of thiccness',
    //         data: [32, 45, 12, 76, 69],
    //         backgroundColor: [
    //           'rgba(75, 192, 190, 6'
    //         ],
    //         borderWidth: 4
    //       }
    //     ]
    //   })
//     }

//     useEffect(() => {
//       chart()
//     }, [])
//     return (
//       <div>
//         <h1>Dashboard</h1>
//         <h2 id="welcome">Welcome, {this.props.store.user.username}!</h2>
//         <p>Your ID is: {this.props.store.user.id}</p>
//         <p>Last 5 Rounds waiting to be graphed:</p>
//         {JSON.stringify(this.props.store.roundReducer)}
//         <br/>
//         <div>
//           <Line data={chartData} />
//         </div>
//         <LogOutButton className="log-in" />
//       </div>
//     );
//   }
// }

const Dashboard = (mapStoreToProps) => { // this.props becomes mapStoreToProps
  const [chartData, setChartData] = useState({});
  const chart = () => {
    setChartData({
      labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      datasets: [
        {
          label: 'level of thiccness',
          data: [32, 45, 12, 76, 69],
          backgroundColor: [
            'rgba(75, 192, 190, 6'
          ],
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
    chart();
  }, [])
  console.log('mapStoreToProps:', mapStoreToProps);
  return(
    <div>
      <h1>Dashboard</h1>
      <h2 id="welcome">Welcome, {mapStoreToProps.store.user.username}!</h2>
      <p>Your ID is: {mapStoreToProps.store.user.id}</p>
      <p>Last 5 Rounds waiting to be graphed:</p>
      {JSON.stringify(mapStoreToProps.store.roundReducer)}
      <br/>
      <div>
        <Line data={chartData} />
      </div>
      <LogOutButton className="log-in" />
    </div>
  )
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(Dashboard);
