import React, { Component } from "react";

class SortBtn extends Component {
  getDisplayStr() {
    let btnDisplay = ""
    switch(this.props.sortOrd) {
      case 'asc':
        btnDisplay = "Clear Sorting";
        break;
      case 'desc':
        btnDisplay = "Sort By: Oldest First";
        break;
      default:
        btnDisplay = "Sort By: Most Recent";
    }
    return btnDisplay;
  }

  render() {
    const display = this.getDisplayStr();
    return (
      <button className="srt-btn" onClick={this.props.handleSort}>{display}</button>
    );
  }
}

export default SortBtn;
