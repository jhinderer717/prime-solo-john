import './ComboGraph.css';
import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';



const ComboGraph = (props) => {
   const rounds = props.rounds;
   let roundDate =[];
   rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
   const dateSplit = roundDate.map(round => round.split('-', 3)[1].concat('-', round.split('-', 3)[2]));

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
   // I can only get getturnRoundIntoPoints
   // to work if it is called within .map

   const roundPutt = roundPuttsTest.reverse();
   const roundApproach = roundApproachTest.reverse();
   const roundFairway = roundFairwayTest.reverse();
   const rightDate = dateSplit.reverse();

   const scoreChartData = ({
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

   // useEffect(() => {                   This is the hook equivalent of componentDidMount. Not needed after
   //    console.log('mounted');          taking the graph functions themselves out
   // }, []); // warning told me to remove --   , []);   -- caused error
   return(
      <div className="comboGraphDiv">
         <Line id="lineGraph" data={scoreChartData} options={{
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
