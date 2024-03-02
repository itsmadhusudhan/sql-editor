import { useSetResultStore } from "../data/resultStore";
import { useSqlStore } from "../data/sqlStore";

const SavedQueries = () => {
  const [state] = useSqlStore();
  const setResultState = useSetResultStore();

  const handleClick = (query: string, queryName: string) => {
    setResultState({
      pendingQuery: query,
      queryName,
    });

    const event = new CustomEvent("query", {
      detail: {
        pendingQuery: query,
        queryName,
      },
    });

    window.dispatchEvent(event);
  };

  return (
    <div>
      {state.saved.map((query) => (
        <div
          key={query.id}
          className=" px-4 py-4 border-b cursor-pointer hover:bg-muted last:border-b-0"
          onClick={handleClick.bind(null, query.query, query.name)}
        >
          {query.name}
        </div>
      ))}
    </div>
  );
};

export default SavedQueries;
