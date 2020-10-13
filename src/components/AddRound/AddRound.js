import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router-dom';

const today = Date();
const todayString = today.split(" ");
const today1 = new Date();
const thisMonth = (today1.getMonth() + 1);
let todayState = todayString[3].concat('-', thisMonth, '-', todayString[2]);
console.log('todayState:', todayState);

class AddRound extends Component {

  state = {
    date: todayState,
    number_holes: 18,
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

  componentDidMount = () => {
    this.setState({
      ...this.state,
      date: todayState,
    });
  }

  checkFields = () => {
    console.log('checkFields hit');

    const checkDate = this.state.date.split("-");
    console.log('checkDate:', checkDate);
    if(checkDate[1] > 12 || checkDate[1] < 1){
      alert('Invalid Month. Enter valid date YYYY-MM-DD');
      return;
    }
    if(checkDate[2] > 31 || checkDate[2] < 1){
      alert('Invalid Day of Month. Enter valid date YYYY-MM-DD');
      return;
    }
    if(this.state.score_to_par === '') {
      alert('Enter score to par.');
      return;
    }
    if(this.state.putts === '') {
      alert('Enter putts.');
      return;
    }
    if(this.state.approach_shots === '') {
      alert('Enter approach shots.');
      return;
    }
    if(this.state.fairways_hit === '') {
      alert('Enter fairways hit.');
      return;
    }
    if(this.state.possible_fairways === ''){
      alert('Enter possible fairways.');
      return;
    }
  }

  submit = () => {
    //event.preventDefault(); needed? idk
    console.log('submit triggered!!');
    this.props.dispatch({
      type: 'ADD_ROUND',
      payload: this.state,
    });
    this.clearFields();
  }

  clearFields = () => {
    this.setState({
      date: todayState,
      number_holes: 18,
      score_to_par: '',
      putts: '',
      approach_shots: '',
      fairways_hit: '',
      possible_fairways: '',
    })
  }

  sendToDashboard = () => {
    this.props.history.push('/');
  }

  render() {
    console.log('state:', this.state);
    return (
      <div>
        <p>Add Round</p>
        <form>
          <label>Date Played:</label>
          <input placeholder="YYYY-MM-DD" 
            onChange={(event) => this.handleChangeFor(event, 'date')} value={this.state.date} />
          <label>Holes Played:</label>
          <input placeholder="Number of Holes Played" type='number' 
            onChange={(event) => this.handleChangeFor(event, 'number_holes')} value={this.state.number_holes} />
          <input placeholder="Score Over or Under Par" type='number' 
            onChange={(event) => this.handleChangeFor(event, 'score_to_par')} value={this.state.score_to_par} />
          <input placeholder="Total Putts" type='number' 
            onChange={(event) => this.handleChangeFor(event, 'putts')} value={this.state.putts} />
          <input placeholder="Total Extra Approach Shots" type='number' 
            onChange={(event) => this.handleChangeFor(event, 'approach_shots')} value={this.state.approach_shots} />
          <input placeholder="Drives in the Fairway" type='number' 
            onChange={(event) => this.handleChangeFor(event, 'fairways_hit')} value={this.state.fairways_hit} />
          <input placeholder="Total Possible Fairways" type='number' 
            onChange={(event) => this.handleChangeFor(event, 'possible_fairways')} value={this.state.possible_fairways} />
          <button onClick={this.checkFields}>Submit</button>
          <button onClick={this.clearFields}>Clear</button>
          <button onClick={this.sendToDashboard}>Cancel</button>
        </form>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(withRouter(AddRound));
