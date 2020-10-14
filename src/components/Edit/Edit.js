import React, {Component} from 'react';
//import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';

const array = [1,2,3,4,5];

class Edit extends Component {

  componentDidMount = () => {
    console.log('mounted');
    this.props.dispatch({
      type: 'GET_ALL_ROUNDS'
    });
  }

  render() {
    console.log('this.props.store.roundReducer', this.props.rounds);
    console.log('array', array);
    return (
      <div>
        <p>edit</p>
        {JSON.stringify(this.props.rounds)}
        {this.props.rounds.map((round) =>
          round
        )}
        {JSON.stringify(array)}
        {array.map((thing) =>
          thing
        )}
      </div>
    )
  }
}

const mapStoreToProps = reduxState => ({
  rounds: reduxState.roundReducer,
});

export default connect(mapStoreToProps)(Edit);
