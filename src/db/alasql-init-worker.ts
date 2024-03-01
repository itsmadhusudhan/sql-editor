import alasql from "alasql";

import { seedData } from "./seed";

alasql.options.sqlite = true;

seedData();

const runQuery = (query: string) => {
  try {
    const res = alasql(query);

    postMessage({
      type: "RESULT",
      data: res,
    });
  } catch (e: any) {
    postMessage({
      type: "ERROR",
      data: e.message,
    });
  }
};

self.addEventListener("message", (event) => {
  if (event.data.type === "QUERY") {
    runQuery(event.data.data);
  }
});
