import { useSchema } from "../data/useSchema";

const SchemaTable = () => {
  const statements = useSchema();

  return (
    <div className="p-5">
      {statements.map((statement) => {
        return (
          <div key={statement.table.tableid}>
            <details className="mb-4">
              <summary className="font-medium cursor-pointer">
                {statement.table.tableid}
              </summary>
              <ul className="px-4">
                {statement.columns.map((column) => {
                  return (
                    <li
                      key={column.columnid}
                      className="flex justify-between items-center"
                    >
                      <span className="text-neutral-500">
                        {column.columnid}
                      </span>
                      <span className="text-neutral-500">
                        {column.dbtypeid}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </details>
          </div>
        );
      })}
    </div>
  );
};

export default SchemaTable;
