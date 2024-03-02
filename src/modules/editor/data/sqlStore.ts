import { createStore, useStore } from "@/core/store";

export type SqlState = {
  saved: {
    id: string;
    name: string;
    query: string;
  }[];
};

export const sqlStore = createStore<SqlState>({
  saved: [
    {
      id: "1",
      name: "Select Books",
      query: "SELECT * FROM books;",
    },
    {
      id: "2",
      name: "Select Authors",
      query: "SELECT * FROM authors;",
    },
    {
      id: "3",
      name: "Insert Authors",
      query: "Insert into authors (first_name,last_name) values ('Madhu','R');",
    },
  ],
});

export const useSqlStore = () => {
  return useStore<SqlState>(sqlStore);
};
