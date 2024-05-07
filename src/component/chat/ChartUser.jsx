import React, { Component } from "react";

export class ChartUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chart !== this.props.chart) {
      this.setState({ chart: this.props.chart });
    }
  }

  render() {
    return <div>{this.state.chart}</div>;
  }
}

export default ChartUser;
