import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Line } from 'react-chartjs-2';


const RecentScoreComp = (mapStoreToProps) => {
  const [chartData, setScoreChartData] = useState({});
  const [puttChartData, setPuttChartData] = useState({});
  const [approachChartData, setApproachChartData] = useState({});
  const [fairwayChartData, setfairwayChartData] = useState({});
   
  const scoreChart = () => {
    let rounds = mapStoreToProps.store.roundReducer;
    let roundScore = [];
    let roundDate =[];
    rounds.map(round => roundScore.push(round.score_to_par));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
    const roundScoreRight = roundScore.reverse(); // the database gives the most recent 5 in descending
    const roundDateRight = roundDate.reverse();   // order, must flip to graph in ascending order

    setScoreChartData({
      labels: roundDateRight,
      datasets: [
        {
          label: 'Strokes Over Par (adjusted to 18 holes) by Round',
          data: roundScoreRight,
          backgroundColor: ["rgba(77, 211, 90, 1.0)"],
          borderWidth: 4
        }
      ]
    })
  }

  const puttChart = () => {
    let rounds = mapStoreToProps.store.roundReducer;
    let putts = [];
    let roundDate =[];
    rounds.map(round => putts.push(round.putts / round.number_holes));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
    const roundPutts = putts.reverse();
    const roundDateRight = roundDate.reverse();

    setPuttChartData({
      labels: roundDateRight,
      datasets: [
        {
          label: 'Putts per Hole by Round',
          data: roundPutts,
          backgroundColor: ["rgba(200, 80, 0, 6)"],
          borderWidth: 4
        }
      ]
    })
  }

  const approachChart = () => {
    let rounds = mapStoreToProps.store.roundReducer;
    let roundApproach = [];
    let roundDate =[];
    rounds.map(round => roundApproach.push(round.approach_shots / round.number_holes));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
    const roundApproachRight = roundApproach.reverse();
    const roundDateRight = roundDate.reverse();

    setApproachChartData({
      labels: roundDateRight,
      datasets: [
        {
          label: 'Average Extra Approach Shots per Hole by Round',
          data: roundApproachRight,
          backgroundColor: ["rgba(20, 25, 199, 6)"],
          borderWidth: 4
        }
      ]
    })
  }

  const fairwayChart = () => {
    let rounds = mapStoreToProps.store.roundReducer;
    let roundFairway = [];
    let roundDate =[];
    rounds.map(round => roundFairway.push(round.fairways_hit / round.possible_fairways));
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
    const roundFairwayRight = roundFairway.reverse();
    const roundDateRight = roundDate.reverse();

    setfairwayChartData({
      labels: roundDateRight,
      datasets: [
        {
          label: 'Fairway Hit Ratio off the Tee by Round',
          data: roundFairwayRight,
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
            }
          }]
        }
      }} />
    </div>
  )
}


export default connect(mapStoreToProps)(RecentScoreComp);