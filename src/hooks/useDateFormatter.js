const useDateFormatter = (date) => {
  const formatForBackend = (date) => {
    const inputTime = new Date(date);
    const timeZoneOffsetMninutes = inputTime.getTimezoneOffset();
    return new Date(inputTime.getTime() + timeZoneOffsetMninutes * 60000);

    // return Date.toString();
  };

  const formatForDisplay = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US").format(date);
  };

  const formatForForm = (dateString) => {
    const date = new Date(dateString).toISOString().split("T")[0];
    return date;
  };

  return { formatForBackend, formatForDisplay, formatForForm };
};

export default useDateFormatter;
