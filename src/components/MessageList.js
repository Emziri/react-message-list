import React, { Component } from "react";
import { render } from "react-dom";
import {sortByTime} from "../util/TimeUtil"

import { messages } from "../data.json";
import MessageTile from "./MessageTile";
import SortBtn from "./SortBtn";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loading: true,
      sortDirection: "",
      pageIdx: 0
    };

    this.deleteMessage = this.deleteMessage.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  //simulated loading time for a fetch
  componentDidMount() {
    //time out to represent loading if time to do it
    setTimeout(() => this.getMessages(), 0);
  }

  //message to recieve a de-duped list of messages and assign it to state
  getMessages() {
    let mList = this.removeDuplicates(messages);
    this.setState({ loading: false, messages: mList });
  }

  //method to delete message
  //this removes it from list in state, would need to be an api call in an application 
  deleteMessage(message) {
    this.setState(state => ({
      messages: state.messages.filter(msg => msg !== message)
    }));
  }

  handlePageChange(event) {
    console.log(event.target.value);
    //this.setState()
  }

  handleSortChange(){
    this.setState(state => {
      let nextDirection = ""
      switch(state.sortDirection){
        case "asc":
          nextDirection = "";
          break;
        case "desc":
          nextDirection = "asc";
          break;
        default:
          nextDirection = "desc";
      }

      return { sortDirection: nextDirection }
    });
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

  //method to generate li tags for each message
  generateListItems(data) {
    return data.map(msg => (
      <MessageTile key={msg.uuid + msg.sentAt}  msg={msg} handleDelete={this.deleteMessage}/>
    ));
  }

  render() {
    //li's generated from copy of message list sorted in current sort order
    let msgList = sortByTime([...this.state.messages], this.state.sortDirection)
    msgList = msgList.slice(this.state.pageIdx * 5, (this.state.pageIdx * 5) + 5);

    const messageList = this.generateListItems(msgList);

    //TODO: do the loading bit
    //TODO: styling
    //TODO: pagination
    return (
      <div className="MessageList">
        <h1>Messages</h1>
        <SortBtn sortOrd={this.state.sortDirection} handleSort={this.handleSortChange}/>
        <ul>
          {messageList}
        </ul>
        <button onClick={this.handlePageChange}>pageNav</button>
      </div>
      );
  }
}

export default MessageList;
