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
      let roundScore = [];
      let roundPutts = [];
      let roundApproach = [];
      let roundDriver = [];
      rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
      rounds.map(round => roundScore.push(round.score_to_par));
      rounds.map(round => roundPutts.push(round.putts));
      rounds.map(round => roundDriver.push(round.fairways_hit / round.possible_fairways + 15));
      rounds.map(round => roundApproach.push(round.approach_shots / round.number_holes + 30));
      console.log('rounds', rounds);
      // console.log('roundScore', roundScore);
      // console.log('roundPutts', roundPutts);
      // console.log('roundApproach', roundApproach);
      // console.log('roundDriver', roundDriver);
      //console.log('roundDate', roundDate);



      // const turnRoundIntoPoints = (round) => {
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
      rounds.map(round => roundPuttsTest.push(turnRoundIntoPoints(round)[0]));
      console.log('roundPuttsTest:', roundPuttsTest);
      let roundApproachTest = [];
      rounds.map(round => roundApproachTest.push(turnRoundIntoPoints(round)[1]));
      console.log('roundPuttsTest:', roundApproachTest);
      let roundFairwayTest = [];
      rounds.map(round => roundFairwayTest.push(turnRoundIntoPoints(round)[2]));
      console.log('roundPuttsTest:', roundFairwayTest);
   
      // const firstRound = mapStoreToProps.store.roundReducer[0]
      // console.log('firstRound:', firstRound);
      //console.log('firstRound.putts:', firstRound.putts);
      // const firstSet = turnRoundIntoPoints(firstRound);
      // console.log('firstSet', firstSet);






      
      //setRoundScore(roundScore);

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
   //console.log('mapStoreToProps:', mapStoreToProps);
   //console.log('roundScoreState', roundScoreState);
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
