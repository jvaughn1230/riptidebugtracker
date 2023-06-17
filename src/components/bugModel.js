function bugModel(bug) {
  if (bug !== undefined) {
    this.id = bug.id;
    this.name = bug.name;
    this.details = bug.details;
    this.priority = bug.priority;
    this.status = bug.status;
    this.creator = bug.creator;
    this.assigned = bug.assigned;
    this.updated = bug.updated;
    this.notes = bug.notes;
    this.deadline = bug.deadline;
    this.created = bug.created;
  }
}

export default bugModel;
