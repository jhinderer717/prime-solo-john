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

   //console.log('roundPutt:', roundPutt);
   //console.log('rounds', rounds);

   const roundScores = [];
   rounds.map(round => roundScores.push(round.score_to_par * (18 / round.number_holes)));
   const correctScores = roundScores.reverse();

   const puttFraction = [];
   const approachFraction = [];
   const fairwayFraction = [];
   correctScores.map((score, i) => puttFraction.push(roundPutt[i] / score));
   correctScores.map((score, i) => approachFraction.push(roundApproach[i] / score));
   correctScores.map((score, i) => fairwayFraction.push(roundFairway[i] / score));

   
   // const puttMin =  Math.min(...puttFraction);
   // const approachMin =  Math.min(...approachFraction);
   // const fairwayMin =  Math.min(...fairwayFraction);
   // console.log('mins:', puttMin, approachMin, fairwayMin);

   const puttFractionAvg = (puttFraction[0] + puttFraction[1] + puttFraction[2] + puttFraction[3]+ puttFraction[4]) / 5;
   const approachFractionAvg = (approachFraction[0] + approachFraction[1] + approachFraction[2] + approachFraction[3]+ approachFraction[4]) / 5;
   const fairwayFractionAvg = (fairwayFraction[0] + fairwayFraction[1] + fairwayFraction[2] + fairwayFraction[3]+ fairwayFraction[4]) / 5;

   var worstStat = '';
   var bestStat = '';

   if(puttFractionAvg > approachFractionAvg && puttFractionAvg > fairwayFractionAvg){
      worstStat = 'putt';
      if(approachFractionAvg > fairwayFractionAvg){
         bestStat = 'fairway';
      }else{
         bestStat = 'approach';
      }
   }else if(approachFractionAvg > puttFractionAvg && approachFractionAvg > fairwayFractionAvg){
      worstStat = 'approach';
      if(puttFractionAvg > fairwayFractionAvg){
         bestStat = 'fairway';
      }else{
         bestStat = 'putt';
      }
   }else{
      worstStat = 'fairway';
      if(puttFractionAvg > approachFractionAvg){
         bestStat = 'approach';
      }else{
         bestStat = 'putt';
      }
   }



   // ----------------- Handicap calculation -----------------
   
   const lastRounds = props.allRounds.reverse();
   const lastScores = [];
   lastRounds.map(round => lastScores.push(round.score_to_par * (18 / round.number_holes)));

   const getTwenty = (list) => {
      let lastTwenty = [];
      for(let i=0; i<20; i++){
         lastTwenty.push(list[i]);
      }
      return lastTwenty;
   }
   const sortBestToWorst = (list) => {
      let temp = 0;
      for(let i=list.length - 1; i>0; i--){
         for(let j=0; j<i; j++){
            if(list[j] > list[j+1]){
               temp = list[j];
               list[j] = list[j+1];
               list[j+1] = temp;
            }
         }
      }
      return list;
   }
   const returnEight = (list) => {
      let newList = [];
      for(let i=0; i<8; i++){
         newList.push(list[i]);
      }
      return newList;
   }
   const eightAverage = (list) => {
      let total = 0;
      for (let i=0; i<list.length; i++){
         total = total + list[i];
      }
      return total / 8;
   }
   const twentyTest = getTwenty(lastScores);
   console.log('twentyTest', twentyTest);
   const sortTest = sortBestToWorst(twentyTest);
   console.log('sortTest', sortTest);
   const eightTest = returnEight(sortTest);
   console.log('eightTest', eightTest);
   const avg8 = eightAverage(eightTest);
   console.log('avg8', avg8);





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
         <p><b>Trends:</b></p>
         {worstStat === 'putt' &&
            <p>Putting has been your weakness in the last 5 rounds</p>}
         {worstStat === 'approach' &&
            <p>Getting to the green has been your weakness in the last 5 rounds</p>}
         {worstStat === 'fairway' &&
            <p>Hitting the fairway off the tee has been your weakness in the last 5 rounds</p>}

         {bestStat === 'putt' &&
            <p>Putting has been your strength recently</p>}
         {bestStat === 'approach' &&
            <p>Getting to the green has been your strength recently</p>}
         {bestStat === 'fairway' &&
            <p>Hitting the fairway off the tee has been your strength recently</p>}

      </div>
   )
}


const mapStoreToProps = reduxState => ({
   rounds: reduxState.roundReducer,
   allRounds: reduxState.allRoundReducer,
});


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(ComboGraph);
