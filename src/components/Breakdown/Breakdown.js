import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Breakdown.css';
import mapStoreToProps from '../../redux/mapStoreToProps';


class Breakdown extends Component {

  componentDidMount = () => {
    console.log('mounted');
    this.props.dispatch({
      type: 'GET_ROUNDS'
    });
  }

  render() {
    return (
      <div>
        <h1>Breakdown</h1>
        <section>
           <h3>Last 5 rounds</h3>
           <h4>Change Interval<p>current season</p><p>lifetime</p></h4>
        </section>
        <span>combo graph</span>
        {JSON.stringify(this.props.store.roundReducer)}
        <br/>
        <span>handicap</span> <span>putts</span> <span>approach shots</span> <span>fairways hit</span>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(Breakdown);
