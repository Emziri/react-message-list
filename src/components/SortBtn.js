import React, { Component } from "react";
import { render } from "react-dom";
import {formatTimestamp} from "../util/TimeUtil"

import { messages } from "../data.json";

class SortBtn extends Component {
  getDisplayStr() {
    let btnDisplay = ""
    switch(this.props.sortOrd) {
      case 'asc':
        btnDisplay = "Clear Sorting";
        break;
      case 'desc':
        btnDisplay = "Sort By: Oldest";
        break;
      default:
        btnDisplay = "Sort By: Most Recent";
    }
    return btnDisplay;
  }

  render() {
    const display = this.getDisplayStr();
    return (
      <button className="srt-btn" value={display} onClick={this.props.handleSort}>{display}</button>
    );
  }
}

export default SortBtn;
