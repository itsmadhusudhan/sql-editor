import { CloudLightning, Save } from "lucide-react";
import memoize from "memoize";

import { Button } from "@/components/button";

import { respository } from "@/db/respository";
import { ResultState, resultStore, useResultStore } from "../data/store";

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

    try {
      setState({
        isLoading: true,
      });

      const result = await respository.runQuery(query);

      let data = result;

      if (Array.isArray(result)) {
        data = result.map((row, index) => ({ ...row, _id: index }));
      }

      setState({
        data,
        pendingQuery: "",
        currentQuery: query,
        isLoading: false,
        error: null,
      });
    } catch (e: any) {
      console.log(e);

      setState({
        data: [],
        pendingQuery: null,
        currentQuery: query,
        error: e.data,
        isLoading: false,
      });
    }
  };

  return (
    <header className="h-16 border-b flex justify-between items-center px-5 gap-5">
      <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[250px]">
        {queryName}
      </div>
      <div className="flex gap-4">
        <Button variant="outline">
          <Save size={16} className="mr-2" />
          <span className="hidden md:block">Save</span>
        </Button>
        <Button onClick={handleExecute} disabled={!pendingQuery}>
          <CloudLightning size={16} className="mr-2" />
          <span className="hidden md:block">Execute</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
