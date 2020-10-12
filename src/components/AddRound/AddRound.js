import React, {Component} from 'react';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

// const addRound = () => (
//   <div>
//     <p>Add Round</p>
//   </div>
// );

// If you needed to add local state or other things,
// you can make it a class component like:


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
