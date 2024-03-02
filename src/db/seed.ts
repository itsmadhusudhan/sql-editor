import alasql from "alasql";

import authors from "@/db/authors.json";
import books from "@/db/books.json";
import borrowers from "@/db/borrowers.json";
import genres from "@/db/genres.json";
import loans from "@/db/loans.json";

export const tableSchemas = {
  drop: [
    "DROP TABLE IF EXISTS authors",
    "DROP TABLE IF EXISTS genres",
    "DROP TABLE IF EXISTS books",
    "DROP TABLE IF EXISTS borrowers",
    "DROP TABLE IF EXISTS loans",
  ],
  create: [
    `CREATE TABLE authors (
    author_id int(11) NOT NULL AUTO_INCREMENT,
    first_name text NOT NULL,
    last_name text NOT NULL,
    PRIMARY KEY (author_id)
  )`,
    `CREATE TABLE genres (
    genre_id int(11) NOT NULL AUTO_INCREMENT,
    name text NOT NULL,
    PRIMARY KEY (genre_id)
  )`,
    `CREATE TABLE books (
    book_id int(11) NOT NULL AUTO_INCREMENT,
    title text NOT NULL,
    author_id int(11) NOT NULL,
    genre_id int(11) NOT NULL,
    publication_year int(11) DEFAULT NULL,
    PRIMARY KEY (book_id),
    FOREIGN KEY(author_id) REFERENCES authors(author_id),
    FOREIGN KEY(genre_id) REFERENCES genres(genre_id)
  )`,
    `CREATE TABLE borrowers (
    borrower_id int(11) NOT NULL AUTO_INCREMENT,
    name text NOT NULL,
    contact_info text DEFAULT NULL,
    PRIMARY KEY (borrower_id)
  )`,
    `CREATE TABLE loans (
    loan_id int(11) NOT NULL AUTO_INCREMENT,
    book_id int(11) NOT NULL,
    borrower_id int(11) NOT NULL,
    loan_date date NOT NULL,
    return_date date DEFAULT NULL,
    FOREIGN KEY(book_id) REFERENCES books(book_id),
    FOREIGN KEY(borrower_id) REFERENCES borrowers(borrower_id)
  )`,
  ],
};

export const seedData = () => {
  tableSchemas.drop.forEach((query) => {
    alasql(query);
  });
  tableSchemas.create.forEach((query) => {
    alasql(query);
  });

  alasql.tables.authors.data = authors;
  alasql.tables.books.data = books;
  alasql.tables.borrowers.data = borrowers;
  alasql.tables.genres.data = genres;
  alasql.tables.loans.data = loans;
};
