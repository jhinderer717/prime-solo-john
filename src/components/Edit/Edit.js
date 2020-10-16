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
        <p>edit</p>
        {/* {JSON.stringify(this.props.rounds)} */}

        {this.props.rounds.map(round =>
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
