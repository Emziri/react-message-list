import React, { Component } from "react";
import { render } from "react-dom";
import {sortByTime} from "../util/TimeUtil"

import { messages } from "../data.json";

import MessageTile from "./MessageTile";
import SortBtn from "./SortBtn";
import PageSelector from "./PageSelector";

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

  //an API call to get message data would happen here. Simulated waiting for a call with a timeout.
  componentDidMount() {
    setTimeout(() => this.getMessages(), 1500);
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

  //message to recieve a de-duped list of messages and assign it to state
  getMessages() {
    let mList = this.removeDuplicates(messages);
    this.setState({ loading: false, messages: mList });
  }

  //method to delete message (would need to call backend in case of APIs)
  deleteMessage(message) {
    this.setState(state => ({
      messages: state.messages.filter(msg => msg !== message)
    }));
  }

  //method to change the displayed page
  handlePageChange(targetPage) {
    this.setState({pageIdx: targetPage-1});
  }

  //method to change displayed sort order
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

  //method to generate tile component for each message
  generateListItems(data) {
    return data.map(msg => (
      <MessageTile key={msg.uuid + msg.sentAt}  msg={msg} handleDelete={this.deleteMessage}/>
    ));
  }

  render() {
    //max page number for pagination
    const lastPage = Math.ceil(this.state.messages.length/5);

    //sort and slice a copy of messages in state appropriate for page
    let msgList = sortByTime([...this.state.messages], this.state.sortDirection)
    msgList = msgList.slice(this.state.pageIdx * 5, (this.state.pageIdx * 5) + 5);

    //generate message tiles
    const messageList = this.generateListItems(msgList);
    const loading = this.state.loading;

    //TODO: styling - loader, buttons, general display
    return (
      <div className='list-container'>
      {loading && 
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      }
      {!loading &&
        <div className="MessageList">
          <h1>Messages</h1>
          <div className="list-btns">
            <SortBtn sortOrd={this.state.sortDirection} handleSort={this.handleSortChange}/>
            <PageSelector pageChange={this.handlePageChange} cur={this.state.pageIdx + 1} last={lastPage}/>
          </div>
          <ul className="message-tiles">
            {messageList}
          </ul>
        </div>
      }
      </div>
    );
  }
}

export default MessageList;
