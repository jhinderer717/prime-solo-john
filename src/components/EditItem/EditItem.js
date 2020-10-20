import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';


class EditItem extends Component {

  state = {
    edit: '',
    date: '',
    number_holes: '',
    score_to_par: '',
    putts: '',
    approach_shots: '',
    fairways_hit: '',
    possible_fairways: '',
  }

  componentDidMount = () => {
    this.setState({
      edit: false,
      date: this.props.round.date.split('T', 1)[0],
      number_holes: this.props.round.number_holes,
      score_to_par: this.props.round.score_to_par,
      putts: this.props.round.putts,
      approach_shots: this.props.round.approach_shots,
      fairways_hit: this.props.round.fairways_hit,
      possible_fairways: this.props.round.possible_fairways,
    });
  }

  editItem = () => {
    console.log('editing round');
    this.setState({
      edit: true,
    });
  }

  checkDateFormat = () =>{
    console.log('checkDateFormat Hit!');
    const checkDate = this.state.date.split('-');
    if(checkDate.length !== 3){
      alert('Enter date in format YYYY-MM-DD');
      return;
    }
    if(checkDate[1] > 12 || checkDate[1] < 1){
      alert('Invalid Month. Enter valid date YYYY-MM-DD');
      return;
    }
    if(checkDate[2] > 31 || checkDate[2] < 1){
      alert('Invalid Day of Month. Enter valid date YYYY-MM-DD');
      return;
    }
    if(checkDate[0].length < 4){
      alert('Invalid year. Enter valid date YYYY-MM-DD');
      return;
    }
    this.confirmEdit(this.props.round.id);
  }

  confirmEdit = (id) => {
    console.log('confirmEdit with id:', id);
    this.props.dispatch({
      type: 'UPDATE_ROUND',
      url: `/api/golf/${id}`,
      payload: this.state
    });
    this.setState({
      edit: false,
    });
  }

  removeItem = (id) => {
    this.props.dispatch({
      type: "DELETE_ROUND",
      payload: id,
    });
  }

  handleChangeFor = (event, propertyName) => {
    this.setState({
      ...this.state,
      [propertyName]: Number(event.target.value)
    });
  }
  handleDateChange = (event) => {
    this.setState({
      ...this.state,
      date: event.target.value,
    });
  }



  render() {
    return (
      <>
        {this.state.edit ?
          <>
            {/* <h3>editing!</h3> */}
            <form className="editForm">
              <span className="editLabels">Date Played:</span>
              <input placeholder={this.state.date} id="dateInput" onChange={(event) => this.handleDateChange(event)} />

              <div className="editLine">
                <span className="editLabels">Holes Played:</span>
                <button id="minusButton" onClick={() => this.setState({ ...this.state, number_holes: (this.state.number_holes - 1) })}>-</button>
                <span><b>{this.state.number_holes}</b></span>
                <button id="plusButton" onClick={() => this.setState({ ...this.state, number_holes: (this.state.number_holes + 1) })}>+</button>
              </div>


              <div className="editLine">
                <span className="editLabels">Strokes Over Par:</span>
                <button id="minusButton" onClick={() => this.setState({ ...this.state, score_to_par: (this.state.score_to_par - 1) })}>-</button>
                <span><b>{this.state.score_to_par}</b></span>
                <button id="plusButton" onClick={() => this.setState({ ...this.state, score_to_par: (this.state.score_to_par + 1) })}>+</button>
              </div>


              <div className="editLine">
                <span className="editLabels">Putts:</span>
                <button id="minusButton" onClick={() => this.setState({ ...this.state, putts: (this.state.putts - 1) })}>-</button>
                <span><b>{this.state.putts}</b></span>
                <button id="plusButton" onClick={() => this.setState({ ...this.state, putts: (this.state.putts + 1) })}>+</button>
              </div>


              <div className="editLine">
                <span className="editLabels">Approach Shots:</span>
                <button id="minusButton" onClick={() => this.setState({ ...this.state, approach_shots: (this.state.approach_shots - 1) })}>-</button>
                <span><b>{this.state.approach_shots}</b></span>
                <button id="plusButton" onClick={() => this.setState({ ...this.state, approach_shots: (this.state.approach_shots + 1) })}>+</button>
              </div>


              <div className="editLine">
                <span className="editLabels">Fairways Hit:</span>
                <button id="minusButton" onClick={() => this.setState({ ...this.state, fairways_hit: (this.state.fairways_hit - 1) })}>-</button>
                <span><b>{this.state.fairways_hit}</b></span>
                <button id="plusButton" onClick={() => this.setState({ ...this.state, fairways_hit: (this.state.fairways_hit + 1) })}>+</button>
              </div>


              <div className="editLine">
                <span className="editLabels">Possible Fairways:</span>
                <button id="minusButton" onClick={() => this.setState({ ...this.state, possible_fairways: (this.state.possible_fairways - 1) })}>-</button>
                <span><b>{this.state.possible_fairways}</b></span>
                <button id="plusButton" onClick={() => this.setState({ ...this.state, possible_fairways: (this.state.possible_fairways + 1) })}>+</button>
              </div>

              <div className="editActionButtons">
                <Button variant="contained" id="editBtn" onClick={this.checkDateFormat}>Confirm</Button>
                <Button variant="contained" id="deleteBtn" onClick={this.componentDidMount}>Cancel</Button>
              </div>
            </form>
          </>
          :

          <div className="displayRound">
            <span id="dateId">Date: <b>{this.props.round.date.split('T', 1)[0]}</b></span>
            <table>
              <tbody>
                <tr>
                  <td className="holesCell">Holes: <b>{this.props.round.number_holes}</b></td>
                  <td className="handicapCell">Handicap: <b>{this.props.round.score_to_par}</b></td>
                  <td className="puttsCell">Putts: <b>{this.props.round.putts}</b></td>
                </tr>
                <tr>
                  <td className="approachCell">Approach: <b>{this.props.round.approach_shots}</b></td>
                  <td className="fairwaysCell">Fairways: <b>{this.props.round.fairways_hit}</b></td>
                  <td className="possibleCell">Possible Fairways: <b>{this.props.round.possible_fairways}</b></td>
                </tr>
              </tbody>
            </table>
          
            <div className="button">
              <Button variant="contained" id="editBtn" onClick={() => this.editItem(this.props.round.id)}>Edit</Button>
              <Button variant="contained" id="deleteBtn" 
                onClick={() => { if (window.confirm('Are you sure you wish to delete this round?')) 
                this.removeItem(this.props.round.id)}}>Delete</Button>
            </div>
          </div>
        }
      </>
    )
  }
}

const mapStoreToProps = reduxState => ({
  rounds: reduxState.allRoundReducer,
});

export default connect(mapStoreToProps)(EditItem);
