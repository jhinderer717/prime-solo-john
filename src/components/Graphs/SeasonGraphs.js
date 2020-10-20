import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Line } from 'react-chartjs-2';


const SeasonComp = (mapStoreToProps) => {
   const [chartData, setScoreChartData] = useState({});
   const [puttChartData, setPuttChartData] = useState({});
   const [approachChartData, setApproachChartData] = useState({});
   const [fairwayChartData, setfairwayChartData] = useState({});
   
   const scoreChart = () => {
      let rounds = mapStoreToProps.store.seasonRoundReducer;
      let roundScore = [];
      let roundDate =[];
      rounds.map(round => roundScore.push(round.score_to_par));
      rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
      const dateSplit = roundDate.map(round => round.split('-', 3)[1].concat('-', round.split('-', 3)[2]));

      setScoreChartData({
      labels: dateSplit,
      datasets: [
         {
            label: 'Strokes Over Par (adjusted to 18 holes) by Round',
            data: roundScore,
            backgroundColor: ["rgba(77, 211, 90, 1.0)"],
            borderWidth: 4
         }
      ]
      })
   }

   const puttChart = () => {
      let rounds = mapStoreToProps.store.seasonRoundReducer;
      let putts = [];
      let roundDate =[];
      rounds.map(round => putts.push(round.putts / round.number_holes));
      rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
      const dateSplit = roundDate.map(round => round.split('-', 3)[1].concat('-', round.split('-', 3)[2]));

      setPuttChartData({
      labels: dateSplit,
      datasets: [
         {
            label: 'Putts per Hole by Round',
            data: putts,
            backgroundColor: ["rgba(200, 80, 0, 6)"],
            borderWidth: 4
         }
      ]
      })
   }

   const approachChart = () => {
      let rounds = mapStoreToProps.store.seasonRoundReducer;
      let roundApproach = [];
      let roundDate =[];
      rounds.map(round => roundApproach.push(round.approach_shots / round.number_holes));
      rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
      const dateSplit = roundDate.map(round => round.split('-', 3)[1].concat('-', round.split('-', 3)[2]));

      setApproachChartData({
      labels: dateSplit,
      datasets: [
         {
            label: 'Average Extra Approach Shots per Hole by Round',
            data: roundApproach,
            backgroundColor: ["rgba(20, 25, 199, 6)"],
            borderWidth: 4
         }
      ]
      })
   }

   const fairwayChart = () => {
      let rounds = mapStoreToProps.store.seasonRoundReducer;
      let roundFairway = [];
      let roundDate =[];
      rounds.map(round => roundFairway.push(round.fairways_hit / round.possible_fairways));
      rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
      const dateSplit = roundDate.map(round => round.split('-', 3)[1].concat('-', round.split('-', 3)[2]));

      setfairwayChartData({
      labels: dateSplit,
      datasets: [
         {
            label: 'Fairway Hit Ratio off the Tee by Round',
            data: roundFairway,
            backgroundColor: ["rgba(252, 181, 13, 6)"],
            borderWidth: 4
         }
      ]
      })
   }

   useEffect(() => {
      scoreChart();
      puttChart();
      approachChart();
      fairwayChart();
   }, []);
   
  return(
    <div>
      <Line data={chartData} options={{
        responsive: true,
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Strokes",
            },
            ticks: {
              suggestedMin: 0,
            }
          }]
        }
      }} />
      <Line data={puttChartData} options={{
        responsive: true,
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Putts",
            },
            ticks: {
              suggestedMin: 0,
            }
          }]
        }
      }} />
      <Line data={approachChartData} options={{
        responsive: true,
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Strokes",
            },
            ticks: {
              suggestedMin: 0,
            }
          }]
        }
      }} />
      <Line data={fairwayChartData} options={{
        responsive: true,
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Ratio",
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 1,
            }
          }]
        }
      }} />
    </div>
  )
}


export default connect(mapStoreToProps)(SeasonComp);