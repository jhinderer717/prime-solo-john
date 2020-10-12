import React, {Component} from 'react';
import './Breakdown.css';


class Breakdown extends Component {

  render() {
    return (
      <div>
        <h1>Breakdown</h1>
        <section>
           <h3>Last 5 rounds</h3>
           <h4>Change Interval<p>current season</p><p>lifetime</p></h4>
        </section>
        <span>combo graph</span>
        <span>handicap</span>
        <span>putts</span>
        <span>approach shots</span>
        <span>fairways hit</span>
      </div>
    )
  }
}

export default Breakdown;
