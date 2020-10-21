import './Edit.css';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import EditItem from '../EditItem/EditItem';



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
        <h1 className="editHeader">Edit</h1>
          {this.props.rounds.reverse().map(round => // reverse() because we want the most recent at the top
            <EditItem key={round.id}
              round={round}
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
