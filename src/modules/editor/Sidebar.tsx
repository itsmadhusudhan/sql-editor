import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";

import SavedQueries from "./tabs/SavedQueries";
import SchemaTable from "./tabs/SchemaTable";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  showTitle?: boolean;
};

const Sidebar = (props: Props) => {
  const { showTitle = true } = props;

  const titleOffset = showTitle ? 64 : 0;

  return (
    <div
      className={cn(
        "w-64 min-w-16 h-full",
        "overflow-hidden",
        "select-none",
        "z-10",
        props.className
      )}
    >
      {showTitle && <div className="p-5">SQL Editor</div>}
      <Tabs
        defaultValue="saved"
        className={cn(`h-[calc(100%-${titleOffset}px)]`)}
      >
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
