import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Line } from 'react-chartjs-2';


const ComboGraph = (mapStoreToProps) => { // this.props becomes mapStoreToProps
   const [chartData, setScoreChartData] = useState({});
   const [roundScoreState, setRoundScore] = useState([]); // can't get this to work, line 37, 
   

   // const turnRoundIntoPoints = (round) => {
   //    let avgs = {
   //       putts: (round.putts / round.number_holes),
   //       approach: (round.approach_shots / round.number_holes),
   //       fairway: (round.fairways_hit / round.possible_fairways),
   //    }
   //    const configureAvgs = {
   //       putts: (Math.pow((avgs.putts - 1), 2) / 4),			// 0 - 2.25			(realistically 4 putts/hole, but no actual upper bound)
   //       approach: (avgs.approach / 2),							// 0 - 2				(realistically 4 per hole, but no actual upper bound)
   //       fairway: ((1.8 / (avgs.fairway + 1)) - 0.89),		// 0.01 - .91
   //    }
   //    const totalConfigs = (configureAvgs.putts + configureAvgs.approach + configureAvgs.fairway);
   //    const ofOne = {
   //       putts: (configureAvgs.putts / totalConfigs),
   //       approach: (configureAvgs.approach / totalConfigs),
   //       fairway: (configureAvgs.fairway / totalConfigs),
   //    }
   //    const adjustment = (18 / round.number_holes);
   //    const points = {
   //       putts: (ofOne.putts * (adjustment * round.score_to_par)),
   //       approach: (ofOne.approach * (adjustment * round.score_to_par)),
   //       fairway: (ofOne.fairway * (adjustment * round.score_to_par)),
   //    }
   //    return points;
   // }
   // const firstSet = turnRoundIntoPoints(mapStoreToProps.store.roundReducer[0]);
   // console.log('firstSet', firstSet);

  
  
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
               label: 'Fairways',
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
      </div>
   )
}


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(ComboGraph);
