import React from 'react';
import AddLocation from './add_location';

class Leftbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id="leftbar">
        <AddLocation map={this.props.map} markers={this.props.markers} deletedMarkers={this.props.deletedMarkers} />
      </div>
    )
  }
}

export default Leftbar;
