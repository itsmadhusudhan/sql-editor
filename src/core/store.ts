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
      const prevState = state;
      if (typeof value === "function") {
        state = value(state);
      } else {
        state = { ...state, ...value };
      }

      if (JSON.stringify(prevState) !== JSON.stringify(state)) {
        subscribers.forEach((cb) => cb());
      }
    },
    subscribe: (callback: () => void) => {
      subscribers.push(callback);

      return () => {
        subscribers = subscribers.filter((cb) => cb !== callback);
      };
    },
  };
};

type StoreType<T> = ReturnType<typeof createStore<T>>;
type Callback<T, P> = (state: T) => P;

export const useStore = <T, P>(
  store: StoreType<T>,
  selector: Callback<T, P> = (state) => state as unknown as P
): [P, (...args: Parameters<typeof store.setState>) => void] => {
  const state = useSyncExternalStore(
    (cb) => {
      return store.subscribe(cb);
    },
    () => selector(store.getState())
  );

  const setState = useCallback(
    (...args: Parameters<typeof store.setState>) => {
      store.setState(...args);
    },
    [store]
  );

  return [state, setState];
};
