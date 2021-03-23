import React, { Component } from "react";
import { render } from "react-dom";
import {formatTimestamp} from "../util/TimeUtil"

import { messages } from "../data.json";

class MessageList extends Component {
  constructor(props){
    super(props);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  
  handleClickDelete() {
    //when clicked, find index that matches this message, and delete it from obj list
    //onclick for the elemnt, call this.props.handleDelete(this.props.msg)
    console.log("delete");
  }

  render() {
    return (
      <li className="MessageTile">
        <h1>Sender {this.props.msg.senderUuid}</h1>
        <strong>{formatTimestamp(this.props.msg.sentAt)}</strong>
        <p>{this.props.msg.content}</p>
      </li>
    );
  }
}

export default MessageList;
