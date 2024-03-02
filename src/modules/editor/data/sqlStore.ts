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
    {
      id: "4",
      name: "Get All details",
      query: `Select b.title as Title, 
      concat(a.first_name, 
      a.last_name) as Author,
      g.name as Genre
      from books b 
      join authors a 
      on b.author_id = a.author_id
      join genres g on b.genre_id=g.genre_id;`,
    },
    {
      id: "5",
      name: "Gel Book Loans",
      query: `Select b.title as Title,
      br.name as Borrower,
      l.loan_date as LoanDate,
      l.return_date as ReturnDate
      from loans l
      join books b 
      on l.book_id=b.book_id
      join borrowers br
      on l.borrower_id=br.borrower_id order by l.return_date desc;`,
    },
  ],
});

export const useSqlStore = () => {
  return useStore<SqlState>(sqlStore);
};
