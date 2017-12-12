import React from 'react';

class LoadingText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {text: ["Loading.", "Loading..", "Loading..."]}
  }

  changeText() {
    const text = this.state.text;
    text.push(text.shift());
    this.setState({text});
  }

  componentDidMount() {
    this.intervalId = setInterval( () => {
      this.changeText()
    }, 200);
  }

  componentWillUnmount () {
    clearInterval(this.intervalId);
  }

  render() {
    return(
      <h3 style={{textAlign: "left", marginLeft: "58px"}}>{this.state.text[0]}</h3>
    )
  }
}

export default LoadingText;
