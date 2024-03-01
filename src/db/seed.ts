import alasql from "alasql";

import authors from "@/db/authors.json";
import books from "@/db/books.json";
import borrowers from "@/db/borrowers.json";
import genres from "@/db/genres.json";
import loans from "@/db/loans.json";

export const seedData = () => {
  alasql("DROP TABLE IF EXISTS authors");
  alasql(`CREATE TABLE authors (
      author_id int(11) NOT NULL AUTO_INCREMENT,
      first_name varchar(255) NOT NULL,
      last_name varchar(255) NOT NULL,
      PRIMARY KEY (author_id)
    )`);

  alasql("DROP TABLE IF EXISTS `genres`;");
  alasql(`CREATE TABLE genres (
    genre_id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (genre_id)
  )`);

  alasql("DROP TABLE IF EXISTS `books`");
  alasql(`CREATE TABLE books (
      book_id int(11) NOT NULL AUTO_INCREMENT,
      title varchar(255) NOT NULL,
      author_id int(11) NOT NULL,
      genre_id int(11) NOT NULL,
      publication_year int(11) DEFAULT NULL,
      PRIMARY KEY (book_id),
      FOREIGN KEY(author_id) REFERENCES authors(author_id),
      FOREIGN KEY(genre_id) REFERENCES genres(genre_id)
    )`);

  alasql("DROP TABLE IF EXISTS `borrowers`;");
  alasql(`CREATE TABLE borrowers (
      borrower_id int(11) NOT NULL AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      contact_info varchar(255) DEFAULT NULL,
      PRIMARY KEY (borrower_id)
    )`);

  alasql("DROP TABLE IF EXISTS loans;");
  alasql(`CREATE TABLE loans (
    loan_id int(11) NOT NULL AUTO_INCREMENT,
    book_id int(11) NOT NULL,
    borrower_id int(11) NOT NULL,
    loan_date date NOT NULL,
    return_date date DEFAULT NULL,
    FOREIGN KEY(book_id) REFERENCES books(book_id),
    FOREIGN KEY(borrower_id) REFERENCES borrowers(borrower_id)
  )`);

  alasql.tables.authors.data = authors;
  alasql.tables.books.data = books;
  alasql.tables.borrowers.data = borrowers;
  alasql.tables.genres.data = genres;
  alasql.tables.loans.data = loans;
};
