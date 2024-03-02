import { CloudLightning } from "lucide-react";
import memoize from "memoize";

import { Button } from "@/components/button";

import { respository } from "@/db/respository";
import { ResultState, resultStore, useResultStore } from "../data/resultStore";
import { generateRandomInt } from "@/lib/utils";

const counter = (state: ResultState) => {
  return {
    pendingQuery: state.pendingQuery,
    queryName: state.queryName,
  };
};

// memoise has problem
const memoized = memoize(counter);

const Header = () => {
  const [state, setState] = useResultStore(memoized);
  const { pendingQuery, queryName } = state;

  const handleExecute = async () => {
    const query = resultStore.getState().pendingQuery;

    if (!query) {
      return;
    }

    const delay = generateRandomInt(100, 200);

    try {
      setState({
        isLoading: true,
      });

      const result = await respository.runQuery(query);

      let data = result;

      if (Array.isArray(result)) {
        data = result.map((row, index) => ({ ...row, _id: index }));
      }

      // simulated delay
      setTimeout(() => {
        setState({
          data,
          pendingQuery: "",
          currentQuery: query,
          isLoading: false,
          error: null,
          executionTime: delay,
        });
      }, delay);
    } catch (e: any) {
      console.log(e);

      setState({
        data: [],
        pendingQuery: null,
        currentQuery: query,
        error: e.data,
        isLoading: false,
        executionTime: delay,
      });
    }
  };

  return (
    <header className="h-16 border-b flex justify-between items-center px-5 gap-5">
      <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[250px]">
        {queryName}
      </div>
      <div className="flex gap-4">
        <Button onClick={handleExecute} disabled={!pendingQuery}>
          <CloudLightning size={16} className="mr-2" />
          <span className="hidden md:block">Execute</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
