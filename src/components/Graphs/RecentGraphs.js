import React, { useEffect } from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Line } from 'react-chartjs-2';
import { Button } from '@material-ui/core';


const RecentScoreComp = (mapStoreToProps) => {
  const rounds = mapStoreToProps.store.roundReducer;
  let roundDate =[];
  rounds.map(round => roundDate.push(round.date.split('T', 1)[0]));
  const dateSplit = roundDate.map(round => round.split('-', 3)[1].concat('-', round.split('-', 3)[2]));
  const roundDateRight = dateSplit.reverse();

  const turnRoundIntoPoints = (round) => {

      const avgPutts = (round.putts / round.number_holes);
      const avgApproach = (round.approach_shots / round.number_holes);
      const avgFairway = (round.fairways_hit / round.possible_fairways);

      const configPutts = (Math.pow((avgPutts - 1), 2) / 9)
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


  const comboChartData = ({
    labels: roundDateRight,
    datasets: [
      {
          label: 'Fairways',
          data: roundFairwayTest.reverse(),
          backgroundColor: ["rgba(252, 181, 13, 6)"],
          borderWidth: 4
      },
      {
          label: 'Approach',
          data: roundApproachTest.reverse(),
          backgroundColor: ["rgba(20, 25, 199, 6)"],
          borderWidth: 4
      },
      {
          label: 'Putts',
          data: roundPuttsTest.reverse(),
          backgroundColor: ["rgba(200, 80, 0, 6)"],
          borderWidth: 4
      },
    ]
  })


  let roundScore = [];
  rounds.map(round => roundScore.push(round.score_to_par * (18 / round.number_holes)));
  const roundScoreRight = roundScore.reverse(); // the database gives the most recent 5 in descending
                                                // order, must flip to graph in ascending order

  const scoreChartData = ({
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

  let putts = [];
  rounds.map(round => putts.push(round.putts / round.number_holes));
  const roundPutts = putts.reverse();

  const puttChartData = ({
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

  let roundApproach = [];
  rounds.map(round => roundApproach.push(round.approach_shots / round.number_holes));
  const roundApproachRight = roundApproach.reverse();

  const approachChartData = ({
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

  let roundFairway = [];
  rounds.map(round => roundFairway.push(100 * round.fairways_hit / round.possible_fairways));
  const roundFairwayRight = roundFairway.reverse();

  const fairwayChartData = ({
    labels: roundDateRight,
    datasets: [
      {
        label: 'Fairway Accuracy off the Tee by Round',
        data: roundFairwayRight,
        backgroundColor: ["rgba(252, 181, 13, 6)"],
        borderWidth: 4
      }
    ]
  })

  useEffect(() => { // not necessary after taking all the graphing
  }, []);           // functions out to fix rendering on page refresh
   
  return(
    <div>
      <div className="comboRecent">
        <Line data={comboChartData} options={{
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
      <Line data={scoreChartData} options={{
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
              labelString: "Percent",
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
            }
          }]
        }
      }} />
    </div>
  )
}


export default connect(mapStoreToProps)(RecentScoreComp);