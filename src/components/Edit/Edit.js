import './Edit.css';
import React, {Component} from 'react';
//import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';
import EditItem from '../EditItem/EditItem';


class Edit extends Component {

  componentDidMount = () => {
    console.log('mounted');
    
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
    console.log('this.props', this.props.rounds);
    return (
      <div>
        <h1>Edit</h1>

        {/* <table> */}
          {/* <thead>
            <tr>
              <th>Date</th>
              <th>Holes</th>
              <th>Score</th>
              <th>Putts</th>
              <th>Approach</th>
              <th>Fairways</th>
              <th>Possible Fairways</th>
              <th>Action</th>
            </tr>
          </thead> */}

          {this.props.rounds.map(round =>
            <EditItem key={round.id}
              round={round}
            />
          )}
        {/* </table> */}
        
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  rounds: reduxState.allRoundReducer,
});

export default connect(mapStoreToProps)(Edit);
