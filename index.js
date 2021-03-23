import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";

// This is the list of messages.
import { messages } from "./data.json";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
];
const MONTHS = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec."
];

//method to format timestamp to readable string
const formatTimestamp = timeStr => {
  const sentDate = new Date(timeStr);
  const weekday = sentDate.getDay();
  const day = sentDate.getDate();
  const month = sentDate.getMonth();
  const year = sentDate.getFullYear();
  let hr = sentDate.getHours();
  hr = hr % 12 || 12;
  const min = sentDate.getMinutes();
  const ampm = hr >= 12 ? "pm" : "am";

  timeStr =
    DAYS_OF_WEEK[weekday] +
    " " +
    MONTHS[month] +
    " " +
    day +
    ", " +
    year +
    " at " +
    hr +
    ":" +
    min +
    ampm;
  return timeStr;
};

//method to sort messages list either ascending or descending
const sortByTime = (mList, ascending) => {
  //dates are in ISO string, so can be sorted lexicographically
  if (ascending) {
    mList.sort((a, b) => {
      return a.sentAt < b.sentAt ? -1 : a.sentAt > b.sentAt ? 1 : 0;
    });
  } else {
    mList.sort((a, b) => {
      return a.sentAt > b.sentAt ? -1 : a.sentAt < b.sentAt ? 1 : 0;
    });
  }
  return mList;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loading: true
    };
  }

  //method to generate li tags for each message
  generateListItems(data) {
    return data.map(msg => (
      <li key={msg.uuid + msg.sentAt}>
        <h1>Sender {msg.senderUuid}</h1>
        <strong>{formatTimestamp(msg.sentAt)}</strong>
        <p>{msg.content}</p>
      </li>
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
    //time out to represent loading
    setTimeout(() => this.getMessages(), 0);
  }

  getMessages() {
    let mList = this.removeDuplicates(messages);
    mList = sortByTime(mList, false);
    console.log(mList);
    console.log(mList.length);
    this.setState({ loading: false, messages: mList });
  }

  handleClickDelete() {
    //when clicked, find index that matches this message, and delete it from obj list
  }

  render() {
    const messageList = this.generateListItems(this.state.messages);
    return <ul>{messageList}</ul>;
  }
}

render(<App />, document.getElementById("root"));
