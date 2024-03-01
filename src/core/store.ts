import { useCallback, useSyncExternalStore } from "react";

type StateFn<T> = (state: T) => T;

export const createStore = <T>(initialState: T) => {
  let state = initialState;
  let subscribers: Array<() => void> = [];

  return {
    getState: (): T => {
      return state;
    },
    setState: (value: Partial<T> | StateFn<T>) => {
      if (typeof value === "function") {
        state = value(state);
      } else {
        state = { ...state, ...value };
      }

      subscribers.forEach((cb) => cb());
    },
    subscribe: (callback: () => void) => {
      subscribers.push(callback);

      return () => {
        subscribers = subscribers.filter((cb) => cb !== callback);
      };
    },
  };
};

export const useStore = (store: ReturnType<typeof createStore>) => {
  const state = useSyncExternalStore(
    (cb) => {
      return store.subscribe(cb);
    },
    () => store.getState()
  );

  const setState = useCallback(
    (...args: Parameters<typeof store.setState>) => {
      store.setState(...args);
    },
    [store]
  );

  return {
    state,
    setState,
  };
};
