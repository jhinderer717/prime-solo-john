import React, {Component} from 'react';


class AddRound extends Component {

  render() {
    return (
      <div>
        <p>Add Round</p>
        <form>
          <input placeholder="Date"></input>
          <input placeholder="Number of Holes Played"></input>
          <input placeholder="Score Over or Under Par"></input>
          <input placeholder="Total Putts"></input>
          <input placeholder="Total Extra Approach Shots"></input>
          <input placeholder="Drives in the Fairway"></input>
          <input placeholder="Total Possible Fairways"></input>
          <button>Submit</button>
          <button>Cancel</button>
        </form>
      </div>
    )
  }
}

export default AddRound;
