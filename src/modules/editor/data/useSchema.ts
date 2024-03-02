import alasql from "alasql";

import { tableSchemas } from "@/db/seed";

type SchemaState = {
  columns: {
    columnid: string;
    dbtypeid: string;
  }[];
  table: {
    tableid: string;
  };
};

type Result = ReturnType<typeof alasql.parse> & {
  statements: SchemaState[];
};

export const useSchema = () => {
  const result = alasql.parse(tableSchemas.create.join(";")) as Result;

  const state = result.statements as SchemaState[];

  return state;
};
