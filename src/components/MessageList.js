import React, { Component } from "react";
import { render } from "react-dom";
import {sortByTime} from "../util/TimeUtil"

import { messages } from "../data.json";
import MessageTile from "./MessageTile";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loading: true,
      sortDirection: ""
    };
  }

  //method to generate li tags for each message
  generateListItems(data) {
    return data.map(msg => (
      <MessageTile key={msg.uuid + msg.sentAt}  msg={msg} handleDelete={deleteMessage}/>
    ));
  }

  //method to deduplicate messages with same uuid and content
  removeDuplicates(data) {
    return data.filter(
      (message, idx, mList) =>
        mList.findIndex(
          msg => msg.content === message.content && msg.uuid === message.uuid
        ) === idx
    );
  }

  componentDidMount() {
    //time out to represent loading if time to do it
    setTimeout(() => this.getMessages(), 0);
  }

  getMessages() {
    let mList = this.removeDuplicates(messages);
    mList = sortByTime(mList, false);
    console.log(mList);
    console.log(mList.length);
    this.setState({ loading: false, messages: mList });
  }

  deleteMessage(message) {
    //find object in the array and remove it, update state.
    //TODO make this work on the array, update existing state
    console.log("delete");
  }

  render() {
    //TODO: message list is the spread of the state messages sorted accordingly
    //Generate list items from sorted list copy
    const messageList = this.generateListItems(this.state.messages);
    return <ul className="MessageList">{messageList}</ul>;
  }
}

export default MessageList;
