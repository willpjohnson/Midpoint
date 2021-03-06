import React from 'react';

import BestSubway from './best_subway';
import MostConvenient from './most_convenient/most_convenient';
import Midpoint from './midpoint';

class Rightbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {features: [
      "most_convenient",
      "midpoint",
    ]}

    this.cycleLeft = this.cycleLeft.bind(this);
    this.cycleRight = this.cycleRight.bind(this);
  }

  cycleLeft() {
    let features = this.state.features;
    let cycledFeatures = features.slice(1).concat(features[0]);
    this.setState({features: cycledFeatures});
  }

  cycleRight() {
    let features = this.state.features;
    let cycledFeatures = [features[features.length-1]].concat(features.slice(0, features.length-1));
    this.setState({features: cycledFeatures});
  }

  render() {
    const feature = this.state.features[0];
    let featureElement;
    let featureHeader;
    if (feature === 'midpoint') {
      featureElement = <Midpoint map={this.props.map} markers={this.props.markers} displayedDirections={this.props.displayedDirections}/>;
      featureHeader = "Midpoint";
    } else if (feature === 'most_convenient') {
      featureElement = <MostConvenient map={this.props.map} markers={this.props.markers} displayedDirections={this.props.displayedDirections}/>;
      featureHeader = "Most Convenient";
    } else if (feature === 'best_subway') {
      featureElement = <BestSubway map={this.props.map} markers={this.props.markers} displayedDirections={this.props.displayedDirections}/>;
      featureHeader = "Best Subway"
    }

    return(
      <div id="rightbar">
        <div id="rightbar-header">
          <img onClick={this.cycleLeft} className="rightbar-arrows" src="images/arrow-left.png"></img>
          <h2>{featureHeader}</h2>
          <img onClick={this.cycleRight} className="rightbar-arrows" src="images/arrow-right.png"></img>
        </div>
        {featureElement}
      </div>
    )
  }
}

export default Rightbar;
