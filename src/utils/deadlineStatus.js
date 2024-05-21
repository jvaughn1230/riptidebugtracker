import moment from "moment";

export function deadlineStatus(created, due) {
  const createDate = moment(created);
  const dueDate = moment(due, "YYYY-MM-DD");
  // console.log(createDate);
  // console.log(dueDate);
}
