import './Edit.css';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import EditItem from '../EditItem/EditItem';
import golfIcon from '../golfIcon.jpg';



class Edit extends Component {


  componentDidMount = () => {

    this.props.dispatch({
      type: 'GET_ROUNDS'
    });
    this.props.dispatch({
      type: 'GET_SEASON_ROUNDS'
    });
    this.props.dispatch({
      type: 'GET_ALL_ROUNDS'
    });
  }

  render() {
    return (
      <div className="editDiv">
        <h1 className="editHeader">Edit <img className="golfIcon" src={golfIcon}/></h1>
          {this.props.rounds.reverse().map(round => // reverse() because we want the most recent at the top
            <EditItem key={round.id}                // selecting edit when already on edit page reverses
              round={round}                         // the order of the rounds, a minor bug to fix later
            />
          )}
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  rounds: reduxState.allRoundReducer,
});

export default connect(mapStoreToProps)(Edit);
