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
    })
  }

  editItem = () => {
    console.log('editing round');
    this.setState({
      edit: true,
    });
  }

  confirmEdit = () => {
    console.log('confirmEdit'); // this is where PUT dispatch will go
    this.setState({
      edit: false,
    });
  }

  removeItem = (id) => {
    //console.log('removeItem hit with id', id);
    this.props.dispatch({
      type: "DELETE_ROUND",
      payload: id,
    });
  }

  handleChangeFor = (event, propertyName) => {
    console.log('handChangeFor hit');
    this.setState({
      ...this.state,
      [propertyName]: Number(event.target.value)
    });
  }





  render() {
    //console.log('this.props', this.props.rounds);
    console.log('this.state', this.state);
    return (
      <div>

        {this.state.edit ?
          <>
            editing!
            <form>
              <span>Date Played:</span>
              <input placeholder={this.state.date} onChange={(event) => this.handleChangeFor(event, 'date')} />

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


              <button onClick={() => this.confirmEdit()}>Confirm</button>
            </form>
          </>
          :
          <> 
            <span>
              {this.props.round.date.split('T', 1)[0]}
              {this.props.round.number_holes}
              {this.props.round.score_to_par}
              {this.props.round.putts}
              {this.props.round.approach_shots}
              {this.props.round.fairways_hit}
              {this.props.round.possible_fairways}
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
