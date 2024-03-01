import { useSyncExternalStore } from "react";

import { createStore, useStore } from "@/core/store";

export const sqlStore = createStore({
  saved: [
    {
      id: "1",
      name: "Select Books",
      query: "SELECT * FROM books;",
    },
    {
      id: "2",
      name: "Select Authors",
      query: "SELECT * FROM authors;",
    },
    {
      id: "3",
      name: "Insert Authors",
      query: "Insert into authors (first_name,last_name) values ('Madhu','R');",
    },
  ],
});

export const useSqlStore = () => {
  const state = useSyncExternalStore(
    (cb) => {
      return sqlStore.subscribe(cb);
    },
    () => sqlStore.getState()
  );

  return {
    state,
    setState: sqlStore.setState,
  };
};

export type ResultState = {
  data: Record<string, unknown>[] | string;
  isLoading: boolean;
  pendingQuery: string | null;
  currentQuery: string | null;
  error: string | null;
  queryName: string;
};

export const resultStore = createStore<ResultState>({
  data: [],
  isLoading: false,
  pendingQuery: null,
  currentQuery: null,
  error: null,
  queryName: "Untitled Query",
});

export const useResultStore = <T = ResultState>(
  callback: (state: ResultState) => T = (state) => state as unknown as T
) => {
  return useStore(resultStore, callback);
};

export const useSetResultStore = () => {
  return (...args: Parameters<typeof resultStore.setState>) => {
    return resultStore.setState(...args);
  };
};
