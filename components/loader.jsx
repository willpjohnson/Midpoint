import React from 'react';

class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {iterations: [
      <div className="loader">
        <div id="square-1" className="loader-square"></div>
        <div id="square-2" className="loader-square"></div>
        <div id="square-3" className="loader-square"></div>
      </div>,
      <div className="loader">
        <div id="square-1" className="loader-square loader-full"></div>
        <div id="square-2" className="loader-square"></div>
        <div id="square-3" className="loader-square"></div>
      </div>,
      <div className="loader">
        <div id="square-1" className="loader-square loader-full"></div>
        <div id="square-2" className="loader-square loader-full"></div>
        <div id="square-3" className="loader-square"></div>
      </div>,
      <div className="loader">
        <div id="square-1" className="loader-square loader-full"></div>
        <div id="square-2" className="loader-square loader-full"></div>
        <div id="square-3" className="loader-square loader-full"></div>
      </div>,
      <div className="loader">
        <div id="square-1" className="loader-square"></div>
        <div id="square-2" className="loader-square loader-full"></div>
        <div id="square-3" className="loader-square loader-full"></div>
      </div>,
      <div className="loader">
        <div id="square-1" className="loader-square"></div>
        <div id="square-2" className="loader-square"></div>
        <div id="square-3" className="loader-square loader-full"></div>
      </div>,
    ]}
  }

  changeIteration() {
    const iterations = this.state.iterations;
    iterations.push(iterations.shift());
    this.setState({iterations})
  }

  componentDidMount() {
    this.intervalId = setInterval( () => {
      this.changeIteration()
    }, 100);
  }

  componentWillUnmount () {
    clearInterval(this.intervalId);
  }

  render() {
    const iteration = this.state.iterations[0];
    return(
      <div>{iteration}</div>
    )
  }
}

export default Loader;
