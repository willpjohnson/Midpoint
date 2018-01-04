import React from 'react';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const width = this.props.totalTime / this.props.longestTime * 100;
    console.log(width);
    return(
      <div className="progress-bar">
        <div className="progress-bar-filled" style={{width: `${width}%`}}></div>
      </div>
    )
  }
}

export default ProgressBar
