import React, {Component} from 'react';
//import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';


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
    const checkDate = this.state.date.toString().split('-');
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
    }else{
      this.confirmEdit(this.props.round.id);
    }
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
    console.log('this.state', this.state);
    return (
      <div>

        {this.state.edit ?
          <>
            editing!
            <form>
              <span>Date Played:</span>
              <input placeholder={this.state.date} onChange={(event) => this.handleDateChange(event)} />

              <div>
                <button onClick={() => this.setState({ ...this.state, number_holes: (this.state.number_holes + 1) })}>+</button>
                <span>Holes Played: {this.state.number_holes}</span>
                <button onClick={() => this.setState({ ...this.state, number_holes: (this.state.number_holes - 1) })}>-</button>
              </div>


              <div>
                <button onClick={() => this.setState({ ...this.state, score_to_par: (this.state.score_to_par + 1) })}>+</button>
                <span>Strokes Over Par: {this.state.score_to_par}</span>
                <button onClick={() => this.setState({ ...this.state, score_to_par: (this.state.score_to_par - 1) })}>-</button>
              </div>


              <div>
                <button onClick={() => this.setState({ ...this.state, putts: (this.state.putts + 1) })}>+</button>
                <span>Putts: {this.state.putts}</span>
                <button onClick={() => this.setState({ ...this.state, putts: (this.state.putts - 1) })}>-</button>
              </div>


              <div>
                <button onClick={() => this.setState({ ...this.state, approach_shots: (this.state.approach_shots + 1) })}>+</button>
                <span>Approach Shots: {this.state.approach_shots}</span>
                <button onClick={() => this.setState({ ...this.state, approach_shots: (this.state.approach_shots - 1) })}>-</button>
              </div>


              <div>
                <button onClick={() => this.setState({ ...this.state, fairways_hit: (this.state.fairways_hit + 1) })}>+</button>
                <span>Fairways Hit: {this.state.fairways_hit}</span>
                <button onClick={() => this.setState({ ...this.state, fairways_hit: (this.state.fairways_hit - 1) })}>-</button>
              </div>


              <div>
                <button onClick={() => this.setState({ ...this.state, possible_fairways: (this.state.possible_fairways + 1) })}>+</button>
                <span>Possible Fairways: {this.state.possible_fairways}</span>
                <button onClick={() => this.setState({ ...this.state, possible_fairways: (this.state.possible_fairways - 1) })}>-</button>
              </div>


              <button onClick={this.checkDateFormat}>Confirm</button>
              <button onClick={() => this.setState({...this.state, edit: false})}>Cancel</button>
            </form>
          </>
          :
          <> 
            <span>
              date {this.props.round.date.split('T', 1)[0]},
              holes {this.props.round.number_holes},
              score {this.props.round.score_to_par},
              putts {this.props.round.putts},
              approach {this.props.round.approach_shots},
              fairways {this.props.round.fairways_hit},
              possible fairways {this.props.round.possible_fairways},
            </span>
            <button onClick={() => this.editItem(this.props.round.id)}>Edit</button>
            <button onClick={() => { if (window.confirm('Are you sure you wish to delete this round?')) 
              this.removeItem(this.props.round.id)}}>Delete</button>
          </>
        }

      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  rounds: reduxState.allRoundReducer,
});

export default connect(mapStoreToProps)(EditItem);
