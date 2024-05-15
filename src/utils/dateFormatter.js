import moment from "moment";

export const formatForBackend = (date) => {
  const inputMoment = moment(date);
  const utcMoment = inputMoment.utc();
  return utcMoment.toDate();
};

export const formatForDisplay = (dateString) => {
  const momentDate = moment(dateString);
  return momentDate.format("MMMM DD, YYYY"); // Adjust the format as needed
};

export const formatForForm = (dateString) => {
  const momentDate = moment(dateString);
  return momentDate.format("YYYY-MM-DD");
};
