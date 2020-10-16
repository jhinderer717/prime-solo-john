import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Line } from 'react-chartjs-2';


const ComboGraph = (mapStoreToProps) => { // this.props becomes mapStoreToProps
   const [chartData, setScoreChartData] = useState({});
   
  
   const scoreChart = () => {


      const rounds = mapStoreToProps.store.roundReducer;
      let roundDate =[];
      rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));

      const turnRoundIntoPoints = (round) => {
 
         const avgPutts = (round.putts / round.number_holes);
         const avgApproach = (round.approach_shots / round.number_holes);
         const avgFairway = (round.fairways_hit / round.possible_fairways);
    
         const configPutts = (Math.pow((avgPutts - 1), 2) / 4)
         const configApproach = (avgApproach / 2);
         const configFairway = ((1.8 / (avgFairway + 1)) - 0.89);
   
         const totalConfigs = (configPutts + configApproach + configFairway);
      
         const puttFrac = (configPutts / totalConfigs);
         const approachFrac = (configApproach / totalConfigs);
         const fairwayFrac = (configFairway / totalConfigs);
   
         const adjustment = (18 / round.number_holes);
   
         const points = [   //   [  putt point,  approach point,  fairway point  ]
            (puttFrac * (adjustment * round.score_to_par)),
            (approachFrac * (adjustment * round.score_to_par)),
            (fairwayFrac * (adjustment * round.score_to_par)),
         ]
         return points;
      }

      let roundPuttsTest = [];
      let roundApproachTest = [];
      let roundFairwayTest = [];
      rounds.map(round => roundPuttsTest.push(turnRoundIntoPoints(round)[0]));
      rounds.map(round => roundApproachTest.push(turnRoundIntoPoints(round)[1]));
      rounds.map(round => roundFairwayTest.push(turnRoundIntoPoints(round)[2]));
      console.log('roundPuttsTest:', roundPuttsTest);             // I can only get getturnRoundIntoPoints
      console.log('roundPuttsTest:', roundApproachTest);          // to work if it is called within .map
      console.log('roundPuttsTest:', roundFairwayTest);
   

      setScoreChartData({
         labels: roundDate,
         datasets: [
            {
               label: 'Fairways',
               data: roundFairwayTest,
               backgroundColor: ["rgba(252, 181, 13, 6)"],
               borderWidth: 4
            },
            {
               label: 'Approach',
               data: roundApproachTest,
               backgroundColor: ["rgba(20, 25, 199, 6)"],
               borderWidth: 4
            },
            {
               label: 'Putts',
               data: roundPuttsTest,
               backgroundColor: ["rgba(200, 80, 0, 6)"],
               borderWidth: 4
            },
         ]
      })
   }


   useEffect(() => {
      console.log('mounted');
      // mapStoreToProps.dispatch({
      //    type: 'GET_ROUNDS'
      // });
      //    mapStoreToProps.dispatch({
      //    type: 'GET_SEASON_ROUNDS'
      // });
      //    mapStoreToProps.dispatch({
      //    type: 'GET_ALL_ROUNDS'
      // });
      scoreChart();
   }, []); // warning told me to remove --   , []);   -- caused error
   return(
      <div>
         {/* {mapStoreToProps.store.roundReducer.length === 0 &&
            <p>no data for combo graph!!!!</p>
         } */}

         {/* {mapStoreToProps.store.roundReducer.length === 0 || */}
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
                        //display: true,
                        // labelString: 'Date'
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
         {/* } */}

      </div>
   )
}


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(ComboGraph);
