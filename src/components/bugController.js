import bugModel from "./bugModel";

export function retrieveBugs() {
  let data = [];

  data.push(
    new bugModel({
      id: 15616,
      name: "Crash on load",
      details: "crashes on load",
      priority: 1,
      status: 1,
    })
  );

  data.push(
    new bugModel({
      id: 655452,
      name: "Crash on load",
      details: "crashes on load",
      priority: 3,
      status: 1,
    })
  );

  let sorted = data.sort((a, b) => {
    return a.priority - b.priority;
  });

  return sorted;
}
