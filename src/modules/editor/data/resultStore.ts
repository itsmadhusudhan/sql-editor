import { createStore, useStore } from "@/core/store";

export type ResultState = {
  data: Record<string, unknown>[] | string;
  isLoading: boolean;
  pendingQuery: string | null;
  currentQuery: string | null;
  error: string | null;
  queryName: string;
  executionTime: number | null;
};

export const resultStore = createStore<ResultState>({
  data: [],
  isLoading: false,
  pendingQuery: null,
  currentQuery: null,
  error: null,
  queryName: "Untitled Query",
  executionTime: null,
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
