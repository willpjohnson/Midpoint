import React from 'react';
import BestSubway from './best_subway';
import MostConvenient from './most_convenient';

class Rightbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id="rightbar">
        <BestSubway map={this.props.map} markers={this.props.markers}/>
        <MostConvenient map={this.props.map} markers={this.props.markers}/>
      </div>
    )
  }
}

export default Rightbar;
