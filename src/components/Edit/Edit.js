import React, {Component} from 'react';
//import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';

const normalArray = [1,2,3,4,5]
//const arrayWObjs = [{1:1},{2:2},{3:3},{4:4},{5:5}];

class Edit extends Component {

  componentDidMount = () => {
    console.log('mounted');
    this.props.dispatch({
      type: 'GET_ALL_ROUNDS'
    });
  }

  render() {
    console.log('this.props', this.props.rounds);
    //console.log('array', array);
    return (
      <div>
        <p>edit</p>
        {JSON.stringify(this.props.rounds)}

        {this.props.rounds.map(round =>
          <li key={round.id}>
            {round.score_to_par}
          </li>
        )}
        
        {/* {JSON.stringify(arrayWObjs)} */}
        {/* {arrayWObjs.map(thing =>
          thing
        )} */}
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  rounds: reduxState.allRoundReducer,
  // reduxState,
});

export default connect(mapStoreToProps)(Edit);
