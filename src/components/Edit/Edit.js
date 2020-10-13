import React, {Component} from 'react';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';


class Edit extends Component {

  componentDidMount = () => {
    console.log('mounted');
    this.props.dispatch({
      type: 'GET_ALL_ROUNDS'
    });
  }

  render() {
    return (
      <div>
        <p>edit</p>
        {JSON.stringify(this.props.store.roundReducer)}
      </div>
    )
  }
}

export default connect(mapStoreToProps)(Edit);
