import React, { Component } from "react";
export class Command extends Component {
  selectCommand = (value) => {
    this.props.onUpdateParentValue(value);
  };
  render() {
    return (
      <div id="drop">
        <ul id="drop_down">
          {this.props.state.map((command, index) => (
            <li key={index} onClick={() => this.selectCommand(command)}>{command}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Command;
