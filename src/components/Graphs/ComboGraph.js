import './ComboGraph.css';
import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
//import mapStoreToProps from '../../redux/mapStoreToProps';
import { Line } from 'react-chartjs-2';



const ComboGraph = (props) => { // this.props becomes mapStoreToProps. Changed to declare props at bottom, this.props becomes props
   const [chartData, setScoreChartData] = useState({});             // Doesn't solve the problem

   console.log('props:', props);


   const scoreChart = () => {


      const rounds = props.rounds;
      let roundDate =[];
      rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));

      const turnRoundIntoPoints = (round) => {
 
         const avgPutts = (round.putts / round.number_holes);
         const avgApproach = (round.approach_shots / round.number_holes);
         const avgFairway = (round.fairways_hit / round.possible_fairways);
    
         const configPutts = (Math.pow((avgPutts - 1), 2) / 4)       //     ((x-1)^2 )/4
         const configApproach = (avgApproach / 2);                   //     x/2
         const configFairway = ((1.8 / (avgFairway + 1)) - 0.89);    //     1.8/(x+1) - 0.89
   
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
      //console.log('roundPuttsTest:', roundPuttsTest);             // I can only get getturnRoundIntoPoints
      //console.log('roundPuttsTest:', roundApproachTest);          // to work if it is called within .map
      //console.log('roundPuttsTest:', roundFairwayTest);
   
      const roundPutt = roundPuttsTest.reverse();
      const roundApproach = roundApproachTest.reverse();
      const roundFairway = roundFairwayTest.reverse();
      const rightDate = roundDate.reverse();
      //console.log('roundPutt:', roundPutt);
      //console.log('props.rounds', props.rounds);
      // the delayed function makes this ^ log again and mapStoreToProps.store.roundReducer shows empty even though right
      // above that in the console from the logger roundReducer is full of the last 5 rounds data
      // It seems it's the importing of mapStoreToProps that isn't working on the initial render, because the round data is
      // in reduxState as shown by the logger

      setScoreChartData({
         labels: rightDate,
         datasets: [
            {
               label: 'Fairways',
               data: roundFairway,
               backgroundColor: ["rgba(252, 181, 13, 6)"],
               borderWidth: 4
            },
            {
               label: 'Approach',
               data: roundApproach,
               backgroundColor: ["rgba(20, 25, 199, 6)"],
               borderWidth: 4
            },
            {
               label: 'Putts',
               data: roundPutt,
               backgroundColor: ["rgba(200, 80, 0, 6)"],
               borderWidth: 4
            },
         ]
      })
   }

   const timeFunction = () => {
      setTimeout(() => {
         //alert('After 5 seconds!');
         console.log('5 seconds, recalling scoreChart, combograph'); // why does the button Refresh chart work,
         scoreChart();                                               // but this delayed call doesn't? Both do
      }, 5000);                                                      // only 1 thing, call the function yet only
   }                                                                 // the button works. The button has
   useEffect(() => {                                                 // onClick={scoreChart} without parenthesis,
      console.log('mounted');                                        // that's the only difference I can think of
      props.dispatch({                                     // other than the onClick is in the return
         type: 'GET_ROUNDS'
      });
      //    mapStoreToProps.dispatch({
      //    type: 'GET_SEASON_ROUNDS'
      // });
      //    mapStoreToProps.dispatch({
      //    type: 'GET_ALL_ROUNDS'
      // });
      scoreChart();
      //timeFunction();
   }, []); // warning told me to remove --   , []);   -- caused error
   return(
      <div className="comboGraphDiv">
         <button onClick={scoreChart}>Refresh</button>
            <Line id="lineGraph" data={chartData} options={{
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
                     },
                     ticks: {
                       suggestedMin: 0,
                       //stepSize
                     }
                  }]
               }
            }}
            />

      </div>
   )
}


const mapStoreToProps = reduxState => ({
   rounds: reduxState.roundReducer,
});


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(ComboGraph);
