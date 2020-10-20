import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Line } from 'react-chartjs-2';
//import { Button } from '@material-ui/core';


const SeasonComp = (mapStoreToProps) => {
  const [comboData, setComboChartData] = useState({});
  const [chartData, setScoreChartData] = useState({});
  const [puttChartData, setPuttChartData] = useState({});
  const [approachChartData, setApproachChartData] = useState({});
  const [fairwayChartData, setfairwayChartData] = useState({});
  

  const comboChart = () => {

    const rounds = mapStoreToProps.store.seasonRoundReducer;
    let roundDate =[];
    rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
    const dateSplit = roundDate.map(round => round.split('-', 3)[1].concat('-', round.split('-', 3)[2]));

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
    // I can only get getturnRoundIntoPoints
    // to work if it is called within .map



    setComboChartData({
      labels: dateSplit,
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

  const callAll = () => {
    comboChart();
    scoreChart();
    puttChart();
    approachChart();
    fairwayChart();
  }

  useEffect(() => {
    comboChart();
    scoreChart();
    puttChart();
    approachChart();
    fairwayChart();
  }, []);
   
  return(
    <div>
      {/* <Button variant="contained" id="refresh" onClick={callAll}>Refresh Data</Button> */}
      <div className="comboSeason">
        <Line data={comboData} options={{
          maintainAspectRatio: false,	// Don't maintain w/h ratio
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
              }
            }]
          }
        }}
        />
      </div>
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