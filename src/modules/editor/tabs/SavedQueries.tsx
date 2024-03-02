import { useSetResultStore } from "../data/resultStore";
import { useSqlStore } from "../data/sqlStore";

const SavedQueries = () => {
  const [state] = useSqlStore();
  const setResultState = useSetResultStore();

  return (
    <div>
      {state.saved.map((query) => (
        <div
          key={query.id}
          className=" px-4 py-4 border-b cursor-pointer hover:bg-muted last:border-b-0"
          onClick={() => {
            setResultState({
              pendingQuery: query.query,
              queryName: query.name,
            });

            const event = new CustomEvent("query", {
              detail: {
                pendingQuery: query.query,
                queryName: query.name,
              },
            });

            window.dispatchEvent(event);
          }}
        >
          {query.name}
        </div>
      ))}
    </div>
  );
};

export default SavedQueries;
