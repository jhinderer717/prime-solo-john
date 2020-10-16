import React, {Component} from 'react';
//import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';


class EditItem extends Component {


  removeItem = (id) => {
    console.log('removeItem hit with id', id);
    this.props.dispatch({
      type: "DELETE_ROUND",
      payload: id,
    });
  }

  render() {
    //console.log('this.props', this.props.rounds);
    return (
      <div>
        {/* <p>thing</p> */}

        <span>
          {this.props.round.date.split('T', 1)[0]}
          {this.props.round.number_holes}
          {this.props.round.score_to_par}
          {this.props.round.putts}
          {this.props.round.approach_shots}
          {this.props.round.fairways_hit}
          {this.props.round.possible_fairways}
        </span>
        <button>Edit</button>
        <button onClick={() => this.removeItem(this.props.round.id)}>Delete</button>
        
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  rounds: reduxState.allRoundReducer,
});

export default connect(mapStoreToProps)(EditItem);
