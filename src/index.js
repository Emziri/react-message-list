import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";

import MessageList from "./components/MessageList"

class App extends Component {
  render() {
    return (
      <div className="app-content">
        <MessageList />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
