import React, { Component } from "react";
import {formatTimestamp} from "../util/TimeUtil";

//component for a singular message tile
class MessageTile extends Component {
  render() {
    return (
      <li className="MessageTile">
        <h1>Sender {this.props.msg.senderUuid}</h1>
        <strong>{formatTimestamp(this.props.msg.sentAt)}</strong>
        <p>{this.props.msg.content}</p>
        <button onClick={() => this.props.handleDelete(this.props.msg)}>Delete</button>
      </li>
    );
  }
}

export default MessageTile;
