import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div className="container">
    <div className="about">
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
        HandicApp requires seven inputs per round logged:
      </p>
      <ul className="about">
        <li className="about">Date</li>
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
        Disclaimer: USGA give you a handicap index calculated by averaging the best 8 scores of
        the most recent 20 rounds with exception to a couple safeguards in unusual scoring circumstances.
        HandicApp averages your strokes over par over a specified interval.
      </p>
    </div>
  </div>
);

export default AboutPage;
