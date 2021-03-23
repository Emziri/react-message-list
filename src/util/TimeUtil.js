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

module.exports = {
  formatTimestamp: formatTimestamp,
  sortByTime: sortByTime
}