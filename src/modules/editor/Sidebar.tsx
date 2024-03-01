import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";

import { useSetResultStore, useSqlStore } from "./data/store";

const Sidebar = () => {
  const { state } = useSqlStore();
  const setResultState = useSetResultStore();

  return (
    <div className="w-64 min-w-16 border-r overflow-hidden h-full select-none hidden md:block">
      <div className="p-5">SQL Editor</div>
      <Tabs defaultValue="saved" className="h-calc(100%-64px)">
        <div className="p-5 flex justify-center border-b">
          <TabsList className="w-full">
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="saved"
          className="h-[calc(100%-85px)] overflow-y-auto"
        >
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
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Sidebar;
