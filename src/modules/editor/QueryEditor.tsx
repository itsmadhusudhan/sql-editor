import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { sql } from "@codemirror/lang-sql";

import { resultStore } from "./data/store";

const QueryEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editor = useRef<EditorView | null>(null);

  const updateQuery = (
    e: CustomEvent<{
      pendingQuery: string;
      queryName: string;
    }>
  ) => {
    const query = e.detail.pendingQuery;

    editor.current?.dispatch({
      changes: {
        from: 0,
        to: editor.current?.state.doc.length || 0,
        insert: query,
      },
    });
  };

  useEffect(() => {
    editor.current = new EditorView({
      extensions: [
        basicSetup,
        sql(),
        EditorView.updateListener.of(({ state, docChanged }) => {
          if (docChanged) {
            const query = state.doc.toString();

            if (query === resultStore.getState().pendingQuery) {
              return;
            }

            resultStore.setState({ pendingQuery: query });
          }
        }),
      ],
      parent: editorRef.current!,
    });

    window.addEventListener("query", updateQuery);

    return () => {
      editor.current?.destroy();
      window.removeEventListener("query", updateQuery);
    };
  }, []);

  return (
    <div ref={editorRef} className="overflow-y-auto h-[calc(100%-64px)]"></div>
  );
};

export default QueryEditor;
