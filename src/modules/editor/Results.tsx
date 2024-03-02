import { Loader2, Share2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Button } from "@/components/button";

import { useResultStore } from "./data/resultStore";

import { exportToJson } from "@/lib/utils";

const Results = () => {
  const [state] = useResultStore();

  const disableExport =
    state.isLoading || !!state.error || !state.data || !state.data.length;

  const handleExport = () => {
    exportToJson(state.data as Record<string, unknown>[], "results");
  };

  const renderTable = () => {
    if (state.isLoading) {
      return (
        <div className="flex items-center justify-center h-[calc(100%-3rem)]">
          <Loader2 className="animate-spin" />
        </div>
      );
    }

    if (state.error) {
      return (
        <div className="flex items-center justify-center h-[calc(100%-3rem)] text-red-600">
          {state.error}
        </div>
      );
    }

    if (!state.data || !state.data.length) {
      return (
        <div className="flex items-center justify-center h-[calc(100%-3rem)]">
          No results
        </div>
      );
    }

    if (typeof state.data === "string") {
      <div className="flex items-center justify-center h-[calc(100%-3rem)]">
        {state.data}
      </div>;
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(state.data[0]).map((key) => {
              if (key.startsWith("_")) return null;

              return <TableHead key={key}>{key}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(state.data as Record<string, unknown>[]).map((result) => (
            <TableRow key={result._id as string}>
              {(Object.keys(result) as Array<keyof typeof result>).map(
                (key) => {
                  if (key.startsWith("_")) return null;

                  return (
                    <TableCell key={key}>{result[key] as string}</TableCell>
                  );
                }
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="border-t h-[300px] overflow-auto">
      <div className="h-12 border-b flex items-center justify-between px-5 sticky top-0 bg-background z-10">
        <span>Results</span>
        <div className="flex items-center gap-4">
          {!state.error &&
            Array.isArray(state.data) &&
            (state.executionTime || 0) > 0 && (
              <span>{`${state.data.length} rows in ${state.executionTime} ms`}</span>
            )}

          <Button
            variant="outline"
            disabled={disableExport}
            onClick={handleExport}
          >
            <Share2 size={16} className="mr-2" />
            <span className="hidden md:block">Export</span>
          </Button>
        </div>
      </div>
      {renderTable()}
    </div>
  );
};

export default Results;
