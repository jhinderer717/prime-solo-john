import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class AddRound extends Component {

  state = {
    date: '',
    number_holes: '',
    score_to_par: '',
    putts: '',
    approach_shots: '',
    fairways_hit: '',
    possible_fairways: '',
  }

  handleChangeFor = (event, propertyName) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
  }

  submit = () => {
    //event.preventDefault(); needed? idk
    console.log('submit triggered!!');
    this.props.dispatch({
      type: 'ADD_ROUND',
      payload: this.state,
    });
  }

  render() {
    console.log('state:', this.state);
    return (
      <div>
        <p>Add Round</p>
        {/* <form onSubmit={() => this.submit(this.props)}> */}
        <form onSubmit={this.submit}>
          <input placeholder="Date YYYY-MM-DD" onChange={(event) => this.handleChangeFor(event, 'date')} />
          <input placeholder="Number of Holes Played" type='number' onChange={(event) => this.handleChangeFor(event, 'number_holes')} />
          <input placeholder="Score Over or Under Par" type='number' onChange={(event) => this.handleChangeFor(event, 'score_to_par')} />
          <input placeholder="Total Putts" type='number' onChange={(event) => this.handleChangeFor(event, 'putts')} />
          <input placeholder="Total Extra Approach Shots" type='number' onChange={(event) => this.handleChangeFor(event, 'approach_shots')} />
          <input placeholder="Drives in the Fairway" type='number' onChange={(event) => this.handleChangeFor(event, 'fairways_hit')} />
          <input placeholder="Total Possible Fairways" type='number' onChange={(event) => this.handleChangeFor(event, 'possible_fairways')} />
          <button>Submit</button>
          <button>Cancel</button>
        </form>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(AddRound);
