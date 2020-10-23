import React from 'react';
import './AboutPage.css';
import golfIcon from '../golfIcon.jpg';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div className="about">
      {/* <h1 className="aboutHeader">About <img className="golfIcon" src={golfIcon}/></h1> */}
      <h1 className="aboutHeader">About</h1>
      <p>
        HandicApp is a cutting edge golf handicap tracker. With this application a golfer 
        is able to visualize what aspects of their golf game they should focus on to improve 
        their scores.
      </p>
      <p>
        On a par four, a golfer is expected to hit the fairway on the drive, hit the green 
        with the next shot, and two putt for par. Missing the fairway, extra strokes to the 
        green, or more than two putts typically contribute to a score worse than par. On a 
        par five a golfer is expected to be on the green in three shots. A par three expects
        a player to green it with the first shot and two putt for par.
      </p>
      <p>
        HandicApp requires seven stats per round:
      </p>
      <ul className="about">
        <li className="about">Date round was played</li>
        <li>Number of holes played</li>
        <li>Strokes over (or under) par</li>
        <li>Total putts</li>
        <li>Total extra approach shots</li>
        <li>Fairways hit off the Tee</li>
        <li>Possible Fairways to hit</li>
      </ul>
      <p>
        It is easiest to keep track of these stats for every hole. On your scorecard for the 
        first hole, put a dot in the top left corner if you hit the fairway. For every extra 
        approach shot needed to get onto the green, put dots in the top right corner going down. 
        Starting in the bottom left corner going right, mark dots for how many putts you had. 
        At the end of the round, total the putts, extra approach shots, fairways hit, and 
        fairways to hit (all holes excluding par threes).
      </p>
      <p>
        For the purpose of this app, driving the green should be counted as a fairway hit. 
        Putting from off the green should not be counted as a putt. If the ball is on the fringe
        of the green, it's the user's discretion whether to count it as a green hit. If it's not
        a green hit, the next shot should be counted as another approach shot and not a putt. If
        it is counted as a green hit, the next shot counts as a putt.
      </p>
      {/* <p>
        Disclaimer: USGA give you a handicap index calculated by averaging the best 8 scores of
        the most recent 20 rounds with exception to a couple safeguards in unusual scoring circumstances.
        HandicApp averages your strokes over par over a specified interval.
      </p> */}
      <p>
        Handicap is calculated by taking your last 20 rounds and averaging the best 8. This app
        will give you a handicap with 8 or less rounds logged which will be the average of those
        rounds. With 9 - 20 rounds logged, the handicap is the average of the best 8 rounds.
      </p>
      <p>
        This app adjusts any round entered to the 18 hole equivalent and uses that to contribute
        to the handicap. If a round is logged with 1 hole played at 1 under par, that has the same
        contribution to handicap as an 18 hole round at 18 under par.
      </p>
      <p id="bottomParagraph">
        Selecting the Edit page from the navigation bar when already on the Edit page will reverse
        the order of the rounds from descending date to ascending date.
      </p>
    </div>
  </div>
);

export default AboutPage;
