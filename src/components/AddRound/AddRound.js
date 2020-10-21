import './AddRound.css';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router-dom';
import { Button } from '@material-ui/core';

const today = Date();
const todayString = today.split(" ");
const today1 = new Date();
const thisMonth = (today1.getMonth() + 1);
let todayState = todayString[3].concat('-', thisMonth, '-', todayString[2]);
// console.log('todayString:', todayString);
// console.log('todayState:', todayState);


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
    //console.log('checkDate:', checkDate);
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
    this.submit();
  }

  submit = () => {
    //event.preventDefault(); needed? idk
    console.log('submit triggered!!');
    this.props.dispatch({
      type: 'ADD_ROUND',
      payload: this.state,
    });
    this.clearFields();
    //this.sendToDashboard(); new round doesn't always render on the graph right away, so don't right to Dashboard
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
        <h1 className="submitHeader">Submit New Round</h1>
        <form>
          <label>Date Played:</label>
          <input placeholder="YYYY-MM-DD" id="dateInput"
            onChange={(event) => this.handleChangeFor(event, 'date')} value={this.state.date} />
          <br/>

          <label>Holes Played:</label>
          <input placeholder="Number of Holes Played" type='number' id="holesInput"
            onChange={(event) => this.handleChangeFor(event, 'number_holes')} value={this.state.number_holes} />
          <br/>
  
          <input placeholder="Score Over or Under Par" type='number' id="scoreInput"
            onChange={(event) => this.handleChangeFor(event, 'score_to_par')} value={this.state.score_to_par} />
          <br/>
  
          <input placeholder="Total Putts" type='number' id="puttsInput"
            onChange={(event) => this.handleChangeFor(event, 'putts')} value={this.state.putts} />
          <br/>
  
          <input placeholder="Total Extra Approach Shots" type='number' id="approachInput"
            onChange={(event) => this.handleChangeFor(event, 'approach_shots')} value={this.state.approach_shots} />
          <br/>
  
          <input placeholder="Drives in the Fairway" type='number' id="fairwayInput"
            onChange={(event) => this.handleChangeFor(event, 'fairways_hit')} value={this.state.fairways_hit} />
          <br/>
  
          <input placeholder="Total Possible Fairways" type='number' id="possibleInput"
            onChange={(event) => this.handleChangeFor(event, 'possible_fairways')} value={this.state.possible_fairways} />
          <br/>
  
          <Button variant="contained" id="submitBtn" onClick={this.checkFields}>Submit</Button>
          <Button variant="contained" id="clearBtn" onClick={this.clearFields}>Clear</Button>
          <Button variant="contained" color="secondary" id="cancelBtn" onClick={this.sendToDashboard}>Cancel</Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(withRouter(AddRound));
