import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";

import SavedQueries from "./tabs/SavedQueries";
import SchemaTable from "./tabs/SchemaTable";

const Sidebar = () => {
  return (
    <div className="w-64 min-w-16 border-r overflow-hidden h-full select-none hidden md:block">
      <div className="p-5">SQL Editor</div>
      <Tabs defaultValue="saved" className="h-[calc(100%-64px)]">
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
          <SavedQueries />
        </TabsContent>
        <TabsContent
          value="tables"
          className="h-[calc(100%-85px)] overflow-y-auto"
        >
          <SchemaTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sidebar;
